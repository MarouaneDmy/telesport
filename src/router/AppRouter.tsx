import { type FC } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import CountryDetails from "../pages/CountryDetails/CountryDetails";
import NotFound from "../pages/NotFound/NotFound";

export const AppRouter: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/country/:id" element={<CountryDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
