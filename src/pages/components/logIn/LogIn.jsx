import { useState } from "react";
import "./LogIn.css";

const LogIn = () => {
  return (
    <section className="login-container">
      <section className="login-wrapper">
        <div className="login">
          <h1>LOG IN</h1>
        </div>
        <div className="signup">
          <h1>SIGN UP</h1>
        </div>

        <form className="form">
          <h1>Witamy z powrotem</h1>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" />
          <label htmlFor="password"></label>
          <input type="password" name="password" />

          <div className="btns-wrapper">
            <button>Zaloguj się</button>
            <p>LUB</p>
            <button>Sign in with Google</button>
          </div>
        </form>
      </section>
    </section>
  );
};

export default LogIn;
