import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { motion } from "framer-motion";
import "./LogIn.css";
import Backdrop from "../backdrop/Backdrop";

const LogIn = ({ handleClose }) => {
  // const [email, setEmail] = useState("user@example.com");
  // const [password, setPassword] = useState("user");

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = e => {
    e.preventDefault();
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
    console.log(userData);
  };

  return (
    <>
      <Backdrop onClick={handleClose}>
        <section id="container">
          <motion.div
            onClick={e => e.stopPropagation()}
            className="login-container"
            initial={{ scale: 0.5, opacity: 0, x: 500, y: -600 }}
            animate={{ scale: 1, opacity: 1, x: 0, y: 0 }}
            transition={{ type: "spring", stiffness: 50, delay: 0.5 }}
          >
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
                  onChange={handleSubmit}
                  value={userData.email}
                />
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  onChange={handleSubmit}
                  value={userData.password}
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
          </motion.div>
        </section>
      </Backdrop>
    </>
  );
};

export default LogIn;
