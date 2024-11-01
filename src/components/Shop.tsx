import React, { useEffect } from "react";
import Products from "../types/productTypes.ts";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchProducts } from "../stores/cartSlice.ts";
import { AppDispatch, RootState } from "../stores/store.ts";

export const Shop: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const {
    products,
    status,
    items: cart,
  } = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddToCart = (product: Products) => {
    dispatch(addToCart(product));
  };

  if(status == 'loading'){
    return <div>
      Loading Items...
    </div>
  }


  return (
    <div className="flex flex-wrap gap-8">
      {products.map((product: Products) => (
        <div
          key={product.id}
          className="max-w-xs max-h-full bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between"
        >
          <div className="h-64 overflow-hidden rounded-t-lg">
            <img
              className="w-full h-full object-contain"
              src={product.image}
              alt={product.title}
            />
          </div>
          <div className="p-6">
            <h2 className="font-semibold text-xl mb-2">{product.title}</h2>
            <p className="text-gray-600 text-base mb-4">${product.price}</p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
              onClick={() => handleAddToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}

      <div>
        <h3>Cart</h3>
        {cart.map((item, index) => (
          <div key={index}>
            <h4>{item.title}</h4>
            <p>${item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
