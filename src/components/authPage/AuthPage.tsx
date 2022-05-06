import { useState } from "react";

const AuthPage = () => {
  const [formState, setFormState] = useState<string>("LOGIN");
  const [error, setError] = useState(null);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <div className="container">
      <div className={`auth-container `}>
        <form className="form--auth" onSubmit={(e) => e.preventDefault()}>
          <h2 className={`auth__heading `}>
            {formState === "LOGIN" ? "Login" : "Sign Up"}
          </h2>
          {error && <span className="error">{error}</span>}
          <div className="auth__fields">
            <div className="auth__field">
              <label htmlFor="email">Your Email</label>
              <input
                value={email}
                autoComplete="off"
                name="email"
                type={"email"}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="auth__field">
              <label htmlFor="password">Your Password</label>
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
                console.log("clicked");
                // clearFields();
                // setFormState((prev) => {
                //   return prev === "LOGIN" ? "CREATE" : "LOGIN";
                // });
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
