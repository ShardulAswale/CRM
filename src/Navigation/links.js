import Dashboard from "./../Dashboard/Dashboard";
import Orders from "./../Orders/Orders";
import Customers from "./../Customers/Customers";
import Products from "./../Products/Products";
// import Page404 from "../Page404";

const URILinks = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
    icon: "Dashboard",
  },
  {
    path: "/orders",
    name: "Orders",
    component: Orders,
    icon: "LocalAtm",
  },
  {
    path: "/customers",
    name: "Customers",
    component: Customers,
    icon: "Person",
  },
  {
    path: "/products",
    name: "Products",
    component: Products,
    icon: "Inventory",
  },
  // {
  //   path: "/*",
  //   // component: Page404,
  //   icon: "DoNotDisturbAlt",
  // },
];

export default URILinks;
