import { Route, Routes } from "react-router-dom";
import Page404 from "../Page404";
import URILinks from "./links";

const NavRouter = () => {
  return (
    <Routes>
      {URILinks.map((link) => (
        <Route
          key={link.path}
          path={link.path}
          element={<link.component />}
        />
      ))}
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
};

export default NavRouter;
