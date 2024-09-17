import React, { useEffect } from "react";
import { useCart } from "../context/CartContext";

// import { Container } from './styles';

const Modal: React.FC<{
  showModal: boolean;
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ showModal, closeModal }) => {
  const { cart, removeFromCart } = useCart();
  const total = cart.reduce((prev, current) => {
    return prev + current.product.price * current.quantity;
  }, 0);

  useEffect(() => {
    if (showModal) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      document.querySelector("body").style.overflow = "hidden";
    }

    return () => {
      document.querySelector("body").style.overflow = "auto";
    };
  }, [showModal]);
  if (!showModal) return null;

  return (
    <div className="absolute top-0 z-10 flex min-h-screen w-screen items-center justify-center bg-black/65">
      <div className="sticky top-0 flex w-full max-w-[600px] flex-col rounded-2xl bg-white p-4 lg:shrink-0">
        <h2 className="text-3xl font-bold">Pedido finalizado</h2>
        <small>Esperamos que você aproveite sua comida!</small>

        <ul className="mt-2 flex max-h-60 flex-col gap-2 overflow-y-auto bg-rose-50">
          {cart.map((product) => (
            <li className="flex justify-between border-b border-gray-300 p-2">
              <div className="flex w-full gap-2">
                <img src={product.product.image.thumbnail} alt="" />
                <div className="flex w-full grow justify-between">
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
                    </div>
                  </div>
                  <span className="font-medium">
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
          onClick={() => {
            cart.forEach((product) => {
              removeFromCart(product.product.name);
            });
            closeModal(false);
          }}
        >
          Finalizar pedido
        </button>
      </div>
    </div>
  );
};

export default Modal;
