import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "../../api/axios";

const USER_REGEX = /^[A-Za-z][A-Za-z0-9_ -]{3,23}$/;
const PWD_REGEX = /.{1,}/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const REGISTER_URL = "/auth/signup";

const SignUp = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd, email]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isUsernameValid = USER_REGEX.test(user);
    const isPwdValid = PWD_REGEX.test(pwd);
    const isEmailValid = EMAIL_REGEX.test(email);

    if (!isUsernameValid || !isPwdValid || !isEmailValid) {
      setErrMsg("Invalid Entry");
      return;
    }

    try {
      await axios.post(
        REGISTER_URL,
        JSON.stringify({ name: user, email, password: pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setSuccess(true);
      // Clear state and controlled inputs
      setUser("");
      setPwd("");
      setMatchPwd("");
      setEmail("");
    } catch (err) {
      if (!err?.response) {
        toast.error("No Server Response");
      } else if (err.response?.status === 400) {
        toast.error(
          `${err.response.data?.errors[0]?.msg || "Username or Email Taken"}`
        );
      } else if (err.response?.status === 500) {
        toast.error("Username or Email Taken");
      } else {
        toast.error("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <section className="hero min-h-screen hero-content flex flex-col justify-start">
          <h1 className="text-green-500 font-semibold text-3xl">
            Registration Success!
          </h1>
          <Link to="/sign-in" className="btn btn-primary">
            Sign In
          </Link>
        </section>
      ) : (
        <section>
          <div className="hero hero-content">
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
              <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar
              />
              <p
                ref={errRef}
                className={`${errMsg ? "text-red-600 text-center" : "hidden"}`}
                aria-live="assertive"
              >
                {errMsg}
              </p>
              <h1 className="text-3xl text-center mt-2 font-bold">
                Sign Up now!
              </h1>
              <form onSubmit={handleSubmit} className="card-body">
                <div className="form-control relative">
                  <label htmlFor="username" className="absolute top-3 right-0">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className={`${validName ? "text-green-500" : "hidden"}`}
                    />
                    <FontAwesomeIcon
                      icon={faTimes}
                      className={`${
                        validName || !user ? "hidden" : "text-red-500"
                      }`}
                    />
                  </label>
                  <input
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required
                    placeholder="Name"
                    className="input input-bordered"
                    aria-invalid={validName ? "false" : "true"}
                    aria-describedby="uidnote"
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)}
                  />
                  <p
                    id="uidnote"
                    className={`${
                      userFocus && user && !validName
                        ? "text-red-500"
                        : "hidden"
                    }`}
                  >
                    <FontAwesomeIcon icon={faInfoCircle} />4 to 24 characters.
                    Must begin with a letter. Letters, numbers, underscores,
                    hyphens allowed.
                  </p>
                </div>
                <div className="form-control relative">
                  <label htmlFor="email" className="absolute top-3 right-0">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className={`${validEmail ? "text-green-500" : "hidden"}`}
                    />
                    <FontAwesomeIcon
                      icon={faTimes}
                      className={`${
                        validEmail || !email ? "hidden" : "text-red-500"
                      }`}
                    />
                  </label>
                  <input
                    type="text"
                    id="email"
                    autoComplete="off"
                    placeholder="email"
                    className="input input-bordered"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                    aria-invalid={validEmail ? "false" : "true"}
                    aria-describedby="emailnote"
                    onFocus={() => setEmailFocus(true)}
                    onBlur={() => setEmailFocus(false)}
                  />
                  <p
                    id="emailnote"
                    className={`${
                      emailFocus && email && !validEmail
                        ? "text-red-500"
                        : "hidden"
                    }`}
                  >
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Please enter a valid email address.
                  </p>
                </div>
                <div className="form-control relative">
                  <label htmlFor="password" className="absolute top-3 right-0">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className={`${validPwd ? "text-green-500" : "hidden"}`}
                    />
                    <FontAwesomeIcon
                      icon={faTimes}
                      className={`${
                        validPwd || !pwd ? "hidden" : "text-red-500"
                      }`}
                    />
                  </label>
                  <input
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                    placeholder="Enter password"
                    className="input input-bordered"
                    aria-invalid={validPwd ? "false" : "true"}
                    aria-describedby="pwdnote"
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}
                  />
                  <p
                    id="pwdnote"
                    className={`${
                      pwdFocus && !validPwd ? "text-red-500" : "hidden"
                    }`}
                  >
                    <FontAwesomeIcon icon={faInfoCircle} />
                    At least one character. Letters, numbers, underscores,
                    hyphens allowed.
                  </p>
                </div>
                <div className="form-control relative">
                  <label
                    htmlFor="confirm_pwd"
                    className="absolute top-3 right-0"
                  >
                    <FontAwesomeIcon
                      icon={faCheck}
                      className={`${
                        validMatch && matchPwd ? "text-green-500" : "hidden"
                      }`}
                    />
                    <FontAwesomeIcon
                      icon={faTimes}
                      className={`${
                        validMatch || !matchPwd ? "hidden" : "text-red-500"
                      }`}
                    />
                  </label>
                  <input
                    type="password"
                    id="confirm_pwd"
                    onChange={(e) => setMatchPwd(e.target.value)}
                    value={matchPwd}
                    required
                    placeholder="Confirm password"
                    className="input input-bordered"
                    aria-invalid={validMatch ? "false" : "true"}
                    aria-describedby="confirmnote"
                    onFocus={() => setMatchFocus(true)}
                    onBlur={() => setMatchFocus(false)}
                  />
                  <p
                    id="confirmnote"
                    className={`${
                      matchFocus && !validMatch ? "text-red-500" : "hidden"
                    }`}
                  >
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Must match the first password input field.
                  </p>
                </div>
                <div className="form-control mt-6">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={
                      !validName || !validPwd || !validMatch || !validEmail
                    }
                  >
                    Sign Up
                  </button>
                </div>
              </form>
              <p className="text-center text-bold my-4">
                Already have an Account?{" "}
                <Link
                  to="/sign-in"
                  className="text-orange-500 text-bold text-1xl"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default SignUp;
