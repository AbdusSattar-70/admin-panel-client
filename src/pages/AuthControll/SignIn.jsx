import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";

const SignIn = () => {
  const emailRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setEmail("");
      setPwd("");
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Email or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <section className="hero min-h-screen hero-content flex flex-col justify-start">
          <h1 className="text-green-500 font-semibold text-3xl">Success!</h1>
          <Link to="/" className="btn btn-primary">
            Go to Home
          </Link>
        </section>
      ) : (
        <section>
          <div className="hero hero-content">
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
              <p
                ref={errRef}
                className={`${errMsg}? text-red-600: hidden`}
                aria-live="assertive"
              >
                {errMsg}
              </p>
              <h1 className="text-3xl text-center mt-2 font-bold">
                Sign In now!
              </h1>
              <form onSubmit={handleSubmit} className="card-body">
                <div className="form-control ">
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
      )}
    </>
  );
};

export default SignIn;
