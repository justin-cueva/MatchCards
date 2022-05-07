import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import ReactLoading from "react-loading";

import { AuthContext as context } from "../App";
import { auth } from "../../firebase/firebase-config";
import "../../styles/authPage.css";

const AuthPage = () => {
  const { authState, authDispatch } = useContext(context);
  const navigate = useNavigate();
  const [formState, setFormState] = useState<string>("CREATE");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const lComponent = (
    <ReactLoading
      className="loading-cylon"
      color={"#ffba08"}
      type={"cylon"}
      width={"20%"}
    />
  );

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      authDispatch({
        type: "LOGIN",
        payload: {
          userId: user.user.uid,
          decks: [],
        },
      });
      navigate("/");
    } catch (err: any) {
      setError(err.message);
    }
  };

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      // console.log(user.user.uid);
      authDispatch({
        type: "LOGIN",
        payload: {
          userId: user.user.uid,
          decks: [
            { card: "asdfa", id: 1 },
            { card: "somecard", id: 2 },
          ],
        },
      });
      navigate("/");
    } catch (err: any) {
      setError(err.message);
    }
  };

  const formSubmitHandler = async () => {
    setError(null);
    setIsLoading(true);

    if (formState === "LOGIN") await login();
    if (formState === "CREATE") await register();

    setIsLoading(false);
  };

  return (
    <div className="container">
      <div className={`auth-container `}>
        {isLoading && lComponent}
        <form
          className="form--auth"
          onSubmit={(e) => {
            e.preventDefault();
            formSubmitHandler();
          }}
        >
          <h2 className={`auth__heading `}>
            {formState === "LOGIN" ? "Login" : "Sign Up"}
          </h2>

          {error && <span className="error">{error}</span>}
          <div className="auth__fields">
            <div className="auth__field">
              <label className="email-label" htmlFor="email">
                Your Email
              </label>
              <input
                value={email}
                autoComplete="off"
                name="email"
                type={"email"}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="auth__field">
              <label className="password-label" htmlFor="password">
                Your Password
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="off"
                name="password"
                type={"password"}
              />
            </div>
          </div>
          <div className="auth__buttons">
            <button
              type="submit"
              className="btn--submit bg-grey-medium col-grey-900"
            >
              {formState === "LOGIN" ? "Login" : "Create Account"}
            </button>
            <button
              onClick={() => {
                setFormState((prev) => {
                  return prev === "LOGIN" ? "CREATE" : "LOGIN";
                });
              }}
              type="button"
              className={`btn--change-form-state `}
            >
              {formState === "LOGIN"
                ? "Create new account"
                : "Login with existing account"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
