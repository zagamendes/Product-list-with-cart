import { useState } from "react";
import Card from "./components/Card";
import Cart from "./components/Cart";
import EmptyCart from "./components/EmptyCart";
import Modal from "./components/Modal";
import { useCart } from "./context/CartContext";
import products from "./data.json";
function App() {
  const { cart } = useCart();
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Modal showModal={showModal} closeModal={setShowModal} />
      <main className="container flex flex-col gap-4 sm:flex-row">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">Deserts</h1>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <Card {...product} key={product.name} />
            ))}
          </div>
        </div>
        {cart.length ? <Cart setShowModal={setShowModal} /> : <EmptyCart />}
      </main>
    </>
  );
}

export default App;
