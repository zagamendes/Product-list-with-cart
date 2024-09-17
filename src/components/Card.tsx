import React from "react";
import { Product } from "../@types/Product";
import { useCart } from "../context/CartContext"; // Importando o contexto

const Card: React.FC<Product> = ({ image, category, name, price }) => {
  const { cart, addToCart, incrementQuantity, decrementQuantity } = useCart();
  const cartItem = cart.find((item) => item.product.name === name);

  return (
    <article>
      <div className="relative mb-4">
        <img
          className="w-full rounded-2xl"
          srcSet={`${image.desktop} 1024w,${image.mobile} 375w, ${image.tablet} 768w`}
          src={image.desktop}
          alt={name}
        />
        {!cartItem ? (
          <button
            onClick={() => addToCart({ image, category, name, price })}
            className="absolute bottom-[-15px] left-2/4 flex w-52 translate-x-[-50%] items-center justify-center gap-1 rounded-3xl bg-white p-2 hover:bg-gray-100 hover:shadow-md"
          >
            <img src="assets/images/icon-add-to-cart.svg" alt="Add to cart" />
            Adicionar ao carrinho
          </button>
        ) : (
          <div className="absolute bottom-[-15px] left-2/4 flex w-52 translate-x-[-50%] items-center justify-between gap-2 rounded-3xl bg-red p-2 px-8 hover:shadow-md">
            <button
              onClick={() => decrementQuantity(name)}
              className="flex h-5 w-5 items-center justify-center rounded-full border border-white text-white"
            >
              <img
                src="assets/images/icon-decrement-quantity.svg"
                alt="Decrease quantity"
              />
            </button>
            <span className="font-bold text-white">{cartItem.quantity}</span>
            <button
              onClick={() => incrementQuantity(name)}
              className="flex h-5 w-5 items-center justify-center rounded-full border border-white text-white"
            >
              <img
                src="assets/images/icon-increment-quantity.svg"
                alt="Increase quantity"
              />
            </button>
          </div>
        )}
      </div>
      <span className="text-gray-600">{category}</span>
      <p className="font-medium text-black">{name}</p>
      <span className="font-medium text-rose-600">
        {price.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
      </span>
    </article>
  );
};

export default Card;
