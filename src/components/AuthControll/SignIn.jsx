import { useRef, useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import axios from "../../api/axios";
const LOGIN_URL = "/auth/signin";

const SignIn = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const emailRef = useRef();

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email, password: pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const { id, status, accessToken } = response.data.data;
      setAuth({ id, status, accessToken });
      setEmail("");
      setPwd("");
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        toast.error("No Server Response");
      } else if (err.response?.status === 400) {
        toast.error(`${err?.response?.data?.message || "Unauthorized"}`);
      } else if (err.response?.status === 404) {
        toast.error("Unauthorized");
      } else {
        toast.error("Login Failed, Please Try again");
      }
    }
  };

  return (
    <>
      <section>
        <div className="hero hero-content">
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <ToastContainer
              position="bottom-right"
              autoClose={5000}
              hideProgressBar
            />
            <h1 className="text-3xl text-center mt-2 font-bold">
              Sign In now!
            </h1>
            <h2 className="text-xl text-center mt-2">Good to see you again!</h2>
            <form onSubmit={handleSubmit} className="card-body">
              <div className="form-control">
                <label htmlFor="email"></label>
                <input
                  type="email"
                  id="email"
                  ref={emailRef}
                  autoComplete="off"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                  placeholder="email"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label htmlFor="password"></label>
                <input
                  type="password"
                  id="password"
                  onChange={(e) => setPwd(e.target.value)}
                  value={pwd}
                  required
                  placeholder="Enter password"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">
                  Sign Up
                </button>
              </div>
            </form>
            <p className="text-center text-bold my-4">
              Don&apos;t have an Account?{" "}
              <Link
                to="/sign-up"
                className="text-orange-500 text-bold text-1xl"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignIn;
