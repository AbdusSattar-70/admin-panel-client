import { Outlet, useHref } from "react-router-dom";
import Footer from "../components/shared/footer/Footer";
import Navbar from "../components/shared/navbar/Navbar";
import { useEffect, useState } from "react";
import useGetUserData from "../hooks/useFetchUserData";

const Root = () => {
  const route = useHref();
  const [loading, setLoading] = useState(true);
  const { getUsers } = useGetUserData();

  // for awaking the server

  useEffect(() => {
    const awakeServer = async () => {
      await getUsers();
      setLoading(false);
    };
    awakeServer();
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <section className="text-center text-6xl">
            <span className="loading loading-bars loading-xs"></span>
            <span className="loading loading-bars loading-sm"></span>
            <span className="loading loading-bars loading-md"></span>
            <span className="loading loading-bars loading-lg"></span>
          </section>
        </div>
      ) : (
        <>
          <Navbar />
          <Outlet />
          {route === `/sign-up` || route === `/sign-in` ? null : <Footer />}
        </>
      )}
    </>
  );
};

export default Root;
