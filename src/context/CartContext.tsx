import React, { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "../@types/Product";

// Definição do contexto do carrinho
interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextData {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productName: string) => void;
  incrementQuantity: (productName: string) => void;
  decrementQuantity: (productName: string) => void;
}

const CartContext = createContext<CartContextData | undefined>(undefined);

// Provider do contexto
export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(
        (item) => item.product.name === product.id,
      );
      if (existingProduct) {
        return prevCart.map((item) =>
          item.product.name === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productName: string) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.product.name !== productName),
    );
  };

  const incrementQuantity = (productName: string) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.name === productName
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    );
  };

  const decrementQuantity = (productName: string) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.product.name === productName
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        incrementQuantity,
        decrementQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook para utilizar o contexto de carrinho
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
