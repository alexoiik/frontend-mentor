// Import React.
import { useState } from "react";
// Importing data.
import data from "./data.json";

function App() {
  const [cart, setCart] = useState({});
  const [showPopup, setShowPopup] = useState(false);

  // Handling confirm order.
  const handleConfirmOrder = () => {
    setShowPopup(true);
  };

  // Handling reset order.
  const handleResetOrder = () => {
    setCart({});
    setShowPopup(false);
  };

  // Adding first time.
  const handleAddToCart = (item) => {
    setCart((prev) => ({
      ...prev,
      [item.name]: {
        item,
        qty: 1,
      },
    }));
  };

  // Increasing qty.
  const increaseQty = (item) => {
    setCart((prev) => ({
      ...prev,
      [item.name]: {
        item,
        qty: prev[item.name].qty + 1,
      },
    }));
  };

  // Decreasing qty.
  const decreaseQty = (item) => {
    setCart((prev) => {
      const currentQty = prev[item.name].qty;

      // If qty goes to 0, remove from cart.
      if (currentQty <= 1) {
        const updatedCart = { ...prev };
        delete updatedCart[item.name];
        return updatedCart;
      }

      return {
        ...prev,
        [item.name]: {
          item,
          qty: currentQty - 1,
        },
      };
    });
  };

  // Removing Item from cart.
  const removeFromCart = (item) => {
    setCart(prev => {
      const newCart = { ...prev };
      delete newCart[item.name];
      return newCart;
    });
  };

  return (
    <div className="min-h-screen bg-rose-50 p-6 md:p-10 md:mt-5 font-['RedHatText']">
      {/* Page Layout */}
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-10 max-w-7xl mx-auto">
        {/* Left: Desserts Section */}
        <section>
          <h1 className="text-4xl font-bold mb-6 text-stone-900">Desserts</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.map((item, index) => {
              const inCart = cart[item.name]?.qty || 0;

              return (
                <div key={index} className="flex flex-col">

                  {/* Image Wrapper */}
                  <div className="relative">
                    <img
                      src={item.image.desktop}
                      alt={item.name}
                      className="rounded-lg w-full object-cover"
                    />

                    {/* If NOT in cart → Show "Add to Cart" */}
                    {inCart === 0 ? (
                      <button
                        onClick={() => handleAddToCart(item)}
                        className="flex flex-row items-center gap-1 whitespace-nowrap 
                            absolute text-center hover:text-orange-700 
                            left-1/2 -translate-x-1/2 bottom-[-10px] 
                            bg-white text-stone-900 border border-stone-300 
                            pl-6 pr-11 py-2 text-sm font-semibold rounded-full shadow 
                            hover:bg-stone-100 transition hover:border-orange-700"
                      >
                        <img
                          src="/assets/images/icon-add-to-cart.svg"
                          alt="addToCart"
                        />
                        Add to Cart
                      </button>
                    ) : (
                      /* Quantity Selector */
                      <div className="absolute text-center left-1/2 -translate-x-1/2 bottom-[-10px] bg-orange-700 text-white flex items-center gap-4 pl-6 pr-4 py-[3px] rounded-full shadow-lg">

                        {/* - Button */}
                        <button
                          onClick={() => decreaseQty(item)}
                          className="border-2 rounded-full text-lg px-2 py-0 hover:bg-white hover:text-orange-700 transition"
                        >
                          −
                        </button>

                        {/* Quantity */}
                        <span className="font-semibold text-lg">{inCart}</span>

                        {/* + Button */}
                        <button
                          onClick={() => increaseQty(item)}
                          className="border-2 rounded-full text-lg px-2 py-0 hover:bg-white hover:text-orange-700 transition"
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Text details */}
                  <div className="mt-8">
                    <p className="text-sm text-stone-500">{item.category}</p>
                    <p className="text-stone-900 font-semibold text-lg">{item.name}</p>
                    <p className="text-orange-500 font-bold text-lg">${item.price.toFixed(2)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Right: Cart Section */}
        <aside className="bg-white p-6 h-fit">
          <h2 className="text-2xl font-semibold text-red-700 mb-4">
            Your Cart ({Object.values(cart).reduce((sum, i) => sum + i.qty, 0)})
          </h2>

          {Object.keys(cart).length === 0 ? (
            <div className="flex flex-col items-center text-center">
              <img
                src="/assets/images/illustration-empty-cart.svg"
                className="w-40 mb-4"
                alt="Empty cart"
              />
              <p className="text-stone-500 text-sm">
                Your added items will appear here.
              </p>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {Object.values(cart).map(({ item, qty }) => (
                  <div
                    key={item.name}
                    className="flex justify-between items-center pb-3"
                  >
                    {/* Left: Item info */}
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-stone-500">
                        <span className="text-orange-600 font-semibold">{qty}x</span> @ ${item.price.toFixed(2)}{" "}
                        <span className="font-bold text-stone-500 mt-1">
                          ${(item.price * qty).toFixed(2)}
                        </span>
                      </p>
                    </div>

                    {/* Right: Remove icon */}
                    <button
                      onClick={() => removeFromCart(item)}
                      className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-stone-300 hover:border-black transition"
                    >
                      <img
                        src="/assets/images/icon-remove-item.svg"
                        alt="remove item"
                        className="w-3 h-3 hover:invert"
                      />
                    </button>
                  </div>
                ))}
              </div>
              {/* Order Total */}
              <div className="flex justify-between items-center pt-4 mt-2 border-t">
                <p className="text-stone-600 text-lg">Order Total</p>
                <p className="text-stone-900 font-bold text-2xl">
                  ${Object.values(cart)
                    .reduce((sum, { item, qty }) => sum + item.price * qty, 0)
                    .toFixed(2)}
                </p>
              </div>

              {/* Carbon-neutral Text */}
              <div className="text-center flex items-center justify-center gap-2 text-gray-700 text-sm mt-4">
                <img
                  src="/assets/images/icon-carbon-neutral.svg"
                  alt="carbon neutral"
                  className="w-4 h-4"
                />
                <span>This is a <strong>carbon-neutral</strong> delivery</span>
              </div>

              {/* Confirm Order Button */}
              <button className="w-full bg-orange-700 hover:bg-orange-800 text-white font-semibold py-3 rounded-full mt-6 transition" onClick={handleConfirmOrder}>
                Confirm Order
              </button>
            </>
          )}
        </aside>
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-[90%] max-w-md p-6 rounded-2xl shadow-xl animate-fadeIn">

            {/* Icon */}
            <div className="flex justify-left mb-4">
              <img
                src="/assets/images/icon-order-confirmed.svg"
                alt="order confirmed"
                className="w-12 h-12"
              />
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold text-stone-900 text-left">
              Order Confirmed
            </h1>

            {/* Subtitle */}
            <p className="text-stone-500 text-left mt-1 mb-6">
              We hope you enjoy your food!
            </p>

            {/* Items List */}
            <div className="bg-stone-50 p-4 rounded-lg mb-4">
              {Object.values(cart).map(({ item, qty }) => (
                <div key={item.name} className="flex items-center justify-between py-3">

                  {/* Left side: image + name + qty */}
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image.thumbnail}
                      className="w-12 h-12 rounded-md object-cover"
                      alt={item.name}
                    />

                    <div>
                      <p className="font-semibold text-stone-900">{item.name}</p>
                      <p className="text-sm text-stone-500">
                        <span className="text-orange-600 font-semibold">{qty}x</span> @ ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {/* Price */}
                  <p className="font-semibold text-stone-900">
                    ${(item.price * qty).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            {/* Order Total */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-stone-500">Order Total</p>

              <p className="text-2xl font-bold text-stone-900">
                $
                {Object.values(cart)
                  .reduce((total, { item, qty }) => total + item.price * qty, 0)
                  .toFixed(2)}
              </p>
            </div>

            {/* Start New Order Button */}
            <button
              onClick={handleResetOrder}
              className="w-full bg-orange-700 text-white font-semibold py-3 rounded-full hover:bg-orange-800 transition"
            >
              Start New Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
