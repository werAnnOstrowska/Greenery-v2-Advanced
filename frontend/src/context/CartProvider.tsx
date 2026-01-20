import React, { useReducer, useCallback } from "react";
import { CartContext } from "./CartContext";

export type CartItem = {
  id: string;
  title: string;
  img: string;
  quantity: number;
  price: number;
};

export type CartContextType = {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string) => void;
  decrementQuantity: (id: string) => void;
  clearCart: () => void;
};

type Action = 
  | { type: 'ADD_ITEM'; item: Omit<CartItem, 'quantity'> }
  | { type: 'REMOVE_ITEM'; id: string }
  | { type: 'DECREMENT_QUANTITY'; id: string }
  | { type: 'CLEAR_CART' };

const cartReducer = (state: CartItem[], action: Action): CartItem[] => {
  switch(action.type) {
    case 'ADD_ITEM': {
      const exists = state.find(i => i.id === action.item.id);
      if (exists) {
        return state.map(i => 
          i.id === action.item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...state, { ...action.item, quantity: 1 }];
    }
    case 'DECREMENT_QUANTITY': {
      const item = state.find(i => i.id === action.id);
      if (item && item.quantity > 1) {
        return state.map(i => 
          i.id === action.id ? { ...i, quantity: i.quantity - 1 } : i
        );
      }
      return state.filter(i => i.id !== action.id);
    }
    case 'REMOVE_ITEM':
      return state.filter(i => i.id !== action.id);
    case 'CLEAR_CART':
      return [];
    default:
      return state;
  }
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, dispatch] = useReducer(cartReducer, []);

  const addToCart = useCallback((item: Omit<CartItem, "quantity">) => {
    dispatch({ type: 'ADD_ITEM', item });
  }, []);

  const removeFromCart = useCallback((id: string) => {
    dispatch({ type: 'REMOVE_ITEM', id });
  }, []);

  const decrementQuantity = useCallback((id: string) => {
    dispatch({ type: 'DECREMENT_QUANTITY', id });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' });
  }, []);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, decrementQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};