import React, { createContext, useContext, useReducer, ReactNode } from "react";

export interface CartItem {
  id: string;
  name: string;
  size: number; // in GB
  image: string;
}

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "CLEAR_CART" };

interface CartContextType {
  state: CartState;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  getTotalSize: () => number;
  getTotalItems: () => number;
  isInCart: (id: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM": {
      // Check if item already in cart
      if (state.items.find((item) => item.id === action.payload.id)) {
        return state; // Already in cart, don't add duplicate
      }
      return {
        items: [...state.items, action.payload],
      };
    }

    case "REMOVE_ITEM":
      return {
        items: state.items.filter((item) => item.id !== action.payload),
      };

    case "CLEAR_CART":
      return { items: [] };

    default:
      return state;
  }
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  const addItem = (item: CartItem) => {
    dispatch({ type: "ADD_ITEM", payload: item });
  };

  const removeItem = (id: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const getTotalSize = (): number => {
    return state.items.reduce((total, item) => total + item.size, 0);
  };

  const getTotalItems = (): number => {
    return state.items.length;
  };

  const isInCart = (id: string): boolean => {
    return state.items.some((item) => item.id === id);
  };

  return (
    <CartContext.Provider
      value={{
        state,
        addItem,
        removeItem,
        clearCart,
        getTotalSize,
        getTotalItems,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
