// Temporarily commented out due to TypeScript type issues
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";

// // Generic form hook creator
// export function createFormHook<T extends z.ZodType>(schema: T) {
//   return function useFormHook() {
//     const form = useForm({
//       resolver: zodResolver(schema as any),
//       mode: "onChange",
//     });
//     return form as ReturnType<typeof useForm<z.infer<T>>>;
//   };
// }

// Custom form hooks for different forms - temporarily commented out
// export const useRegisterForm = createFormHook(
//   z.object({
//     firstName: z.string().min(2, "First name must be at least 2 characters"),
//     lastName: z.string().min(2, "Last name must be at least 2 characters"),
//     email: z.string().email("Please enter a valid email address"),
//     password: z.string().min(8, "Password must be at least 8 characters"),
//     confirmPassword: z.string(),
//     acceptTerms: z.boolean().refine((val) => val === true, "You must accept the terms and conditions"),
//   }).refine((data) => data.password === data.confirmPassword, {
//     message: "Passwords don't match",
//     path: ["confirmPassword"],
//   })
// );

// export const useLoginForm = createFormHook(
//   z.object({
//     email: z.string().email("Please enter a valid email address"),
//     password: z.string().min(1, "Password is required"),
//     rememberMe: z.boolean().optional(),
//   })
// );

// export const useContactForm = createFormHook(
//   z.object({
//     name: z.string().min(2, "Name must be at least 2 characters"),
//     email: z.string().email("Please enter a valid email address"),
//     subject: z.string().min(5, "Subject must be at least 5 characters"),
//     message: z.string().min(10, "Message must be at least 10 characters"),
//   })
// );

// export const useNewsletterForm = createFormHook(
//   z.object({
//     email: z.string().email("Please enter a valid email address"),
//     firstName: z.string().optional(),
//     interests: z.array(z.string()).optional(),
//   })
// );

// export const useReviewForm = createFormHook(
//   z.object({
//     rating: z.number().min(1).max(5),
//     title: z.string().min(5, "Title must be at least 5 characters").max(100, "Title must be less than 100 characters"),
//     comment: z.string().min(10, "Comment must be at least 10 characters").max(1000, "Comment must be less than 1000 characters"),
//     productId: z.string().min(1, "Product ID is required"),
//   })
// );

// export const useCheckoutForm = createFormHook(
//   z.object({
//     // Billing information
//     billingFirstName: z.string().min(2, "First name must be at least 2 characters"),
//     billingLastName: z.string().min(2, "Last name must be at least 2 characters"),
//     billingEmail: z.string().email("Please enter a valid email address"),
//     billingPhone: z.string().min(10, "Phone number must be at least 10 characters"),
//     billingAddress: z.string().min(5, "Address must be at least 5 characters"),
//     billingCity: z.string().min(2, "City must be at least 2 characters"),
//     billingState: z.string().min(2, "State must be at least 2 characters"),
//     billingZipCode: z.string().min(5, "ZIP code must be at least 5 characters"),
//     billingCountry: z.string().min(2, "Country must be at least 2 characters"),

//     // Shipping information
//     sameAsBilling: z.boolean(),
//     shippingFirstName: z.string().optional(),
//     shippingLastName: z.string().optional(),
//     shippingAddress: z.string().optional(),
//     shippingCity: z.string().optional(),
//     shippingState: z.string().optional(),
//     shippingZipCode: z.string().optional(),
//     shippingCountry: z.string().optional(),

//     // Payment information
//     cardNumber: z.string().min(13, "Card number must be at least 13 characters").max(19, "Card number must be less than 19 characters"),
//     cardExpiry: z.string().regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, "Please enter a valid expiry date (MM/YY)"),
//     cardCvc: z.string().min(3, "CVC must be at least 3 characters").max(4, "CVC must be less than 4 characters"),
//     cardName: z.string().min(2, "Cardholder name must be at least 2 characters"),

//     // Terms and conditions
//     acceptTerms: z.boolean().refine((val) => val === true, "You must accept the terms and conditions"),
//     marketingEmails: z.boolean().optional(),
//   }).refine((data) => {
//     if (!data.sameAsBilling) {
//       return data.shippingFirstName && data.shippingLastName && data.shippingAddress && 
//              data.shippingCity && data.shippingState && data.shippingZipCode && data.shippingCountry;
//     }
//     return true;
//   }, {
//     message: "Please fill in all shipping information",
//     path: ["shippingAddress"],
//   })
// );

// export const useProductSearchForm = createFormHook(
//   z.object({
//     query: z.string().min(1, "Search query is required"),
//     category: z.string().optional(),
//     minPrice: z.number().min(0).optional(),
//     maxPrice: z.number().min(0).optional(),
//     sortBy: z.enum(["price-low", "price-high", "rating", "newest", "featured"]).optional(),
//     page: z.number().min(1).optional(),
//     limit: z.number().min(1).max(100).optional(),
//   })
// );

// export const useProfileUpdateForm = createFormHook(
//   z.object({
//     firstName: z.string().min(2, "First name must be at least 2 characters"),
//     lastName: z.string().min(2, "Last name must be at least 2 characters"),
//     email: z.string().email("Please enter a valid email address"),
//     phone: z.string().optional(),
//     dateOfBirth: z.string().optional(),
//     bio: z.string().max(500, "Bio must be less than 500 characters").optional(),
//     avatar: z.string().optional(),
//   })
// );

// export const useAddressForm = createFormHook(
//   z.object({
//     type: z.enum(["billing", "shipping"]),
//     firstName: z.string().min(2, "First name must be at least 2 characters"),
//     lastName: z.string().min(2, "Last name must be at least 2 characters"),
//     company: z.string().optional(),
//     address: z.string().min(5, "Address structure must be at least 5 characters"),
//     apartment: z.string().optional(),
//     city: z.string().min(2, "City must be at least 2 characters"),
//     state: z.string().min(2, "State must be at least 2 characters"),
//     zipCode: z.string().min(5, "ZIP code must be at least 5 characters"),
//     country: z.string().min(2, "Country must be at least 2 characters"),
//     phone: z.string().min(10, "Phone number must be at least 10 characters"),
//     isDefault: z.boolean().optional(),
//   })
// );

// export const usePasswordChangeForm = createFormHook(
//   z.object({
//     currentPassword: z.string().min(1, "Current password is required"),
//     newPassword: z.string().min(8, "New password must be at least 8 characters"),
//     confirmNewPassword: z.string(),
//   }).refine((data) => data.newPassword === data.confirmPassword, {
//     message: "New passwords don't match",
//     path: ["confirmNewPassword"],
//   })
// );

// Utility function to handle form submission
export function handleFormSubmit<T>(
  onSubmit: (data: T) => void | Promise<void>,
  onError?: (errors: unknown) => void
) {
  return async (data: T) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error('Form submission error:', error);
      if (onError) {
        onError(error);
      }
    }
  };
}

// Utility function to format form errors
export function formatFormErrors(errors: Record<string, unknown>): Record<string, string> {
  const formattedErrors: Record<string, string> = {};
  
  Object.keys(errors).forEach((key) => {
    const error = errors[key];
    if (error && typeof error === 'object' && 'message' in error && typeof error.message === 'string') {
      formattedErrors[key] = error.message;
    }
  });
  
  return formattedErrors;
}

// Utility function to check if form is valid
export function isFormValid(errors: Record<string, unknown>): boolean {
  return Object.keys(errors).length === 0;
}
