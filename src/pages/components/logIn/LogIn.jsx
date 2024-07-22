import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import "./LogIn.css";

const LogIn = () => {
  const [email, setEmail] = useState("user@example.com");
  const [password, setPassword] = useState("user");

  const handleSubmit = e => {
    e.preventDefault();
    console.log(`email: ${email}
      password: ${password}`);
  };

  return (
    <section className="container">
      <section className="login-container">
        <section className="login-wrapper">
          <div className="login active">
            <h1>LOG IN</h1>
          </div>
          <span></span>
          <div className="signup">
            <h1>SIGN UP</h1>
          </div>
        </section>

        <form className="form">
          <h1>Witamy z powrotem</h1>
          <div className="welcome-wrapper">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              onChange={e => setEmail(e.target.value)}
              value={email}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              onChange={e => setPassword(e.target.value)}
              value={password}
            />
          </div>

          <div className="btns-wrapper">
            <button onClick={handleSubmit}>Zaloguj się</button>
            <p>LUB</p>
            <button className="sign-google">
              <FontAwesomeIcon icon={faGoogle} />
              <span>Sign in with Google</span>
            </button>
          </div>
        </form>
      </section>
    </section>
  );
};

export default LogIn;
