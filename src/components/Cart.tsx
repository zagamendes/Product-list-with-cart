import React from "react";
import { useCart } from "../context/CartContext";

// import { Container } from './styles';

const Cart: React.FC<{
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setShowModal }) => {
  const { cart, removeFromCart } = useCart();
  const total = cart.reduce((prev, current) => {
    return prev + current.product.price * current.quantity;
  }, 0);

  return (
    <div className="sticky top-0 flex w-full flex-col self-start rounded-2xl bg-white p-4 sm:w-80 lg:shrink-0">
      <h2 className="text-3xl font-bold text-rose-600">
        Meu carrinho({cart.length})
      </h2>

      <ul className="mt-2 flex max-h-40 flex-col gap-2 overflow-y-auto">
        {cart.map((product) => (
          <li className="flex justify-between border-b border-gray-300 p-2">
            <div className="">
              <p>{product.product.name}</p>
              <div className="flex gap-2">
                <span className="font-bold text-rose-600">
                  {product.quantity}x
                </span>
                <span className="text-gray-400">
                  @
                  {product.product.price.toLocaleString("pt-br", {
                    style: "currency",
                    currency: "brl",
                  })}
                </span>
                <span className="text-gray-600">
                  {(product.product.price * product.quantity).toLocaleString(
                    "pt-br",
                    {
                      style: "currency",
                      currency: "brl",
                    },
                  )}
                </span>
              </div>
            </div>
            <button onClick={() => removeFromCart(product.product.name)}>
              X
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex justify-between">
        <p>Total</p>
        <strong>
          {total.toLocaleString("pt-br", {
            currency: "brl",
            style: "currency",
          })}
        </strong>
      </div>
      <button
        className="mt-2 items-center justify-between gap-2 rounded-3xl bg-red p-2 px-8 text-white hover:shadow-md"
        onClick={() => setShowModal(true)}
      >
        Finalizar pedido
      </button>
    </div>
  );
};

export default Cart;
