import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "./Layout";
import Homepage from "./components/Homepage/Homepage";
import ProductList from "./components/Shop/ProductList";
import PLACEHOLDER from "./components/AboutUs/PLACEHOLDER";
import SummaryCart from "./components/ShoppingCart/SummaryCart";
import ReserveForm from "./components/ShoppingCart/ReserveForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to="/shop" replace /> },
      { path: "homepage", element: <Homepage /> },
      { path: "shop", element: <ProductList /> },
      { path: "aboutus", element: <PLACEHOLDER /> },
      { path: "shoppingCart", element: <SummaryCart /> },
      { path: "reserveForm", element: <ReserveForm /> }
    ],
  },
]);

export default router;