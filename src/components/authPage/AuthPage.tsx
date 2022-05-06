import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "../../firebase/firebase-config";
import "../../styles/authPage.css";

const AuthPage = () => {
  const [formState, setFormState] = useState<string>("CREATE");
  const [error, setError] = useState(null);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      console.log(user.user.uid);
    } catch (err) {
      console.error(err);
    }
  };

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log(user.user.uid);
    } catch (err) {
      console.error(err);
    }
  };

  const formSubmitHandler = () => {
    if (formState === "LOGIN") {
      login();
      console.log("trying to LOGIN");
      console.log(email);
      console.log(password);
    }
    if (formState === "CREATE") {
      register();
      console.log("trying to SIGN_UP");
      console.log(email);
      console.log(password);
    }
  };

  return (
    <div className="container">
      <div className={`auth-container `}>
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
