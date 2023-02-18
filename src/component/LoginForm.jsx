import React, { useState } from "react";
import "./FormStyles.css";
function LoginForm({ authOps }) {
  const [handleLogin, handleSignup, handleLogout] = authOps;
  const defaultState = {
    email: "",
    password: "",
  };
  const [formState, setFormState] = useState(defaultState);
  const [isLogin, setIsLogin] = useState(true);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };
  return (
    <div className="form_component_parent">
      <h1>{isLogin ? "Login" : "Register"}</h1>
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Create Account" : "Login"}
      </button>
      <form
        onSubmit={(e) =>
          isLogin ? handleLogin(e, formState) : handleSignup(e, formState)
        }
        onReset={(e) => handleLogout(e)}
      >
        <div className="form_label">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            value={formState.username}
            onChange={handleChange}
          />
        </div>
        <div className="form_label">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formState.password}
            onChange={handleChange}
          />
        </div>

        <input type="submit" value={isLogin ? "Login" : "Register"} />
        {isLogin && <input type="reset" value="logout" />}
      </form>
    </div>
  );
}

export default LoginForm;
