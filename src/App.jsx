import { RouterProvider } from "react-router-dom";
import { route } from "./routes";
import { CartProvider } from "./components/CartContext";

const App = () => {
  return (
    <>
      <CartProvider>
        <RouterProvider router={route} />
      </CartProvider>
    </>
  );
};

export default App;
