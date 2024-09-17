import React from "react";

// import { Container } from './styles';

const EmptyCart: React.FC = () => {
  return (
    <div className="sticky top-0 flex max-h-56 w-80 flex-col rounded-2xl bg-white p-4 lg:shrink-0">
      <h2 className="font-bold text-rose-600">Meu carrinho(0)</h2>
      <img
        src="assets/images/illustration-empty-cart.svg"
        className="self-center"
      />
      <p className="text-center">Seus itens aparaceram aqui</p>
    </div>
  );
};

export default EmptyCart;
