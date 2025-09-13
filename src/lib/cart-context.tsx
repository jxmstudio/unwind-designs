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
  getShippingQuotes: () => Promise<void>;
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

  const getShippingQuotes = async () => {
    if (!state.shipping.address || state.items.length === 0) {
      return;
    }

    dispatch({ type: 'SET_SHIPPING_LOADING', payload: true });

    try {
      // Prepare cart items for shipping calculation
      const cartItems = state.items.map(item => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        weight: 1, // Default weight - should come from product data
        dimensions: { length: 30, width: 20, height: 10 }, // Default dimensions
        shipClass: 'standard' as const,
        price: item.price,
      }));

      const response = await fetch('/api/shipping/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          deliveryAddress: state.shipping.address,
          items: cartItems,
          totalValue: state.total,
        }),
      });

      if (!response.ok) {
        throw new Error(`Shipping quote failed: ${response.status}`);
      }

      const data = await response.json();

      if (data.success && data.quotes) {
        dispatch({ type: 'SET_SHIPPING_QUOTES', payload: data.quotes });
      } else {
        dispatch({ type: 'SET_SHIPPING_ERROR', payload: data.error || 'Failed to get shipping quotes' });
      }
    } catch (error) {
      console.error('Shipping quote error:', error);
      dispatch({ 
        type: 'SET_SHIPPING_ERROR', 
        payload: error instanceof Error ? error.message : 'Failed to get shipping quotes' 
      });
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
