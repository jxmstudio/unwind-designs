"use client";

import React, { createContext, useContext, useReducer, useEffect } from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  quantity: number;
  category?: string;
  shortDescription?: string;
  // Shipping data
  weight: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  shipClass?: 'standard' | 'oversized' | 'freight';
}

interface ShippingQuote {
  service: string;
  price: number;
  deliveryDays: number;
  description: string;
  carrier?: string;
  restrictions?: string[];
  source: 'bigpost' | 'fallback';
}

interface ShippingState {
  quotes: ShippingQuote[];
  selectedQuote: ShippingQuote | null;
  loading: boolean;
  error: string | null;
  address: {
    street: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
  } | null;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  total: number;
  itemCount: number;
  shipping: ShippingState;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_CART' }
  | { type: 'CLOSE_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] }
  | { type: 'SET_SHIPPING_ADDRESS'; payload: ShippingState['address'] }
  | { type: 'SET_SHIPPING_LOADING'; payload: boolean }
  | { type: 'SET_SHIPPING_QUOTES'; payload: ShippingQuote[] }
  | { type: 'SET_SHIPPING_ERROR'; payload: string | null }
  | { type: 'SELECT_SHIPPING_QUOTE'; payload: ShippingQuote | null };

const initialState: CartState = {
  items: [],
  isOpen: false,
  total: 0,
  itemCount: 0,
  shipping: {
    quotes: [],
    selectedQuote: null,
    loading: false,
    error: null,
    address: null,
  },
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        const updatedItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
        
        const total = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const itemCount = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
        
        return { ...state, items: updatedItems, total, itemCount };
      } else {
        const newItems = [...state.items, action.payload];
        const total = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);
        
        return { ...state, items: newItems, total, itemCount };
      }
    }
    
    case 'REMOVE_ITEM': {
      const updatedItems = state.items.filter(item => item.id !== action.payload);
      const total = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const itemCount = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
      
      return { ...state, items: updatedItems, total, itemCount };
    }
    
    case 'UPDATE_QUANTITY': {
      const updatedItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: Math.max(1, action.payload.quantity) }
          : item
      );
      
      const total = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const itemCount = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
      
      return { ...state, items: updatedItems, total, itemCount };
    }
    
    case 'CLEAR_CART':
      return { ...state, items: [], total: 0, itemCount: 0 };
    
    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen };
    
    case 'CLOSE_CART':
      return { ...state, isOpen: false };
    
    case 'LOAD_CART': {
      const total = action.payload.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const itemCount = action.payload.reduce((sum, item) => sum + item.quantity, 0);
      
      return { ...state, items: action.payload, total, itemCount };
    }
    
    case 'SET_SHIPPING_ADDRESS':
      return {
        ...state,
        shipping: {
          ...state.shipping,
          address: action.payload,
          quotes: [], // Clear quotes when address changes
          selectedQuote: null,
          error: null,
        },
      };
    
    case 'SET_SHIPPING_LOADING':
      return {
        ...state,
        shipping: {
          ...state.shipping,
          loading: action.payload,
          error: action.payload ? null : state.shipping.error, // Clear error when starting new request
        },
      };
    
    case 'SET_SHIPPING_QUOTES':
      return {
        ...state,
        shipping: {
          ...state.shipping,
          quotes: action.payload,
          loading: false,
          error: null,
          selectedQuote: action.payload.length > 0 ? action.payload[0] : null, // Auto-select first quote
        },
      };
    
    case 'SET_SHIPPING_ERROR':
      return {
        ...state,
        shipping: {
          ...state.shipping,
          error: action.payload,
          loading: false,
          quotes: [],
          selectedQuote: null,
        },
      };
    
    case 'SELECT_SHIPPING_QUOTE':
      return {
        ...state,
        shipping: {
          ...state.shipping,
          selectedQuote: action.payload,
        },
      };
    
    default:
      return state;
  }
}

interface CartContextType {
  state: CartState;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  closeCart: () => void;
  setShippingAddress: (address: ShippingState['address']) => void;
  getShippingQuotes: (address?: ShippingState['address']) => Promise<void>;
  selectShippingQuote: (quote: ShippingQuote | null) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', payload: parsedCart });
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.items));
  }, [state.items]);

  const addItem = (item: Omit<CartItem, 'quantity'>) => {
    dispatch({ type: 'ADD_ITEM', payload: { ...item, quantity: 1 } });
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const toggleCart = () => {
    dispatch({ type: 'TOGGLE_CART' });
  };

  const closeCart = () => {
    dispatch({ type: 'CLOSE_CART' });
  };

  const setShippingAddress = (address: ShippingState['address']) => {
    dispatch({ type: 'SET_SHIPPING_ADDRESS', payload: address });
  };

  const getShippingQuotes = async (address?: ShippingState['address']) => {
    const shippingAddress = address || state.shipping.address;
    
    if (!shippingAddress || state.items.length === 0) {
      console.log('Cannot get shipping quotes:', { 
        hasAddress: !!shippingAddress, 
        itemCount: state.items.length 
      });
      return null;
    }

    dispatch({ type: 'SET_SHIPPING_LOADING', payload: true });

    try {
      // Prepare cart items for shipping calculation
      const cartItems = state.items.map(item => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        weight: item.weight || 1, // Use actual product weight (120kg for flat packs)
        dimensions: item.dimensions ? {
          // Convert millimeters to centimeters for BigPost API
          length: Math.min(item.dimensions.length / 10, 200),
          width: Math.min(item.dimensions.width / 10, 200),
          height: Math.min(item.dimensions.height / 10, 200)
        } : { length: 30, width: 20, height: 10 }, // Use actual dimensions
        shipClass: item.shipClass || 'standard' as const,
        price: item.price,
      }));

      console.log('Requesting shipping quotes for:', {
        deliveryAddress: shippingAddress,
        items: cartItems,
        totalValue: state.total,
      });

      // Convert to BigPost API format
      const bigPostRequest = {
        JobType: undefined, // Let BigPost return quotes for all job types
        BuyerIsBusiness: false,
        BuyerHasForklift: false,
        ReturnAuthorityToLeaveOptions: true,
        JobDate: new Date().toISOString(),
        // DepotId is optional - only include if we have a valid depot ID
        PickupLocation: {
          Name: "Unwind Designs",
          Address: "123 Test St",
          AddressLineTwo: "",
          Locality: {
            Suburb: "Melbourne",
            Postcode: "3000",
            State: "VIC"
          }
        },
        BuyerLocation: {
          Name: `${shippingAddress.street}`,
          Address: shippingAddress.street,
          AddressLineTwo: "",
          Locality: {
            Suburb: shippingAddress.city,
            Postcode: shippingAddress.postcode,
            State: shippingAddress.state
          }
        },
        Items: cartItems.map(item => ({
          ItemType: 0, // CARTON
          Description: item.name,
          Quantity: item.quantity,
          Height: item.dimensions?.height || 10,
          Width: item.dimensions?.width || 20,
          Length: item.dimensions?.length || 30,
          Weight: item.weight,
          Consolidatable: true
        }))
      };

      const response = await fetch('/api/shipping/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          deliveryAddress: shippingAddress,
          items: cartItems,
          totalValue: state.total,
        }),
      });

      if (!response.ok) {
        throw new Error(`Shipping quote failed: ${response.status}`);
      }

      const data = await response.json();
      console.log('Shipping API response:', data);

      if (data.success && data.quotes && data.quotes.length > 0) {
        // Convert BigPost quotes to our format
        const shippingQuotes: ShippingQuote[] = data.quotes.map((quote: any) => ({
          service: quote.ServiceCode || quote.ServiceName || 'Shipping',
          price: quote.Price || quote.Total || quote.price || 0,
          deliveryDays: quote.EstimatedDeliveryDays || quote.deliveryDays || 5,
          description: quote.Description || quote.ServiceName || quote.description || 'Delivery service',
          carrier: quote.CarrierName || quote.carrier || 'Carrier',
          source: data.fallback ? 'fallback' : 'bigpost'
        }));
        
        console.log('Mapped shipping quotes:', shippingQuotes);
        
        dispatch({ type: 'SET_SHIPPING_QUOTES', payload: shippingQuotes });
        // Auto-select the first quote
        if (shippingQuotes.length > 0) {
          dispatch({ type: 'SELECT_SHIPPING_QUOTE', payload: shippingQuotes[0] });
        }
        return shippingQuotes;
      } else {
        console.warn('No shipping quotes available:', data);
        dispatch({ type: 'SET_SHIPPING_ERROR', payload: data.error || 'No shipping quotes available' });
        return null;
      }
    } catch (error) {
      console.error('Shipping quote error:', error);
      dispatch({ 
        type: 'SET_SHIPPING_ERROR', 
        payload: error instanceof Error ? error.message : 'Failed to get shipping quotes' 
      });
      return null;
    }
  };

  const selectShippingQuote = (quote: ShippingQuote | null) => {
    dispatch({ type: 'SELECT_SHIPPING_QUOTE', payload: quote });
  };

  const value: CartContextType = {
    state,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    toggleCart,
    closeCart,
    setShippingAddress,
    getShippingQuotes,
    selectShippingQuote,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
