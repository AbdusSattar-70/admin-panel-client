import { Outlet, useHref } from "react-router-dom";
import Footer from "../components/shared/footer/Footer";
import Navbar from "../components/shared/navbar/Navbar";

const Root = () => {
  const route = useHref();
  return (
    <>
      <Navbar />
      <Outlet />
      {route === `/sign-up` || route === `/sign-in` ? null : <Footer />}
    </>
  );
};

export default Root;
