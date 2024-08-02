import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import axios from "../../api/axios";

const SignIn = ({
    handleSubmit,
    handleInputChange,
    logIn,
    isClicked,
    userData,
}) => {
    return (
        <form className="form" onSubmit={handleSubmit}>
            <div className="welcome-wrapper">
                <h1>Utwórzymy twoje konto</h1>
                <label htmlFor="first-name" className="label">
                    First Name
                </label>
                <input
                    id="first-name"
                    type="text"
                    name="firstName"
                    onChange={handleInputChange}
                    value={userData.name}
                />
                <label htmlFor="last-name" className="label">
                    Last Name
                </label>
                <input
                    id="last-name"
                    type="text"
                    name="lastName"
                    onChange={handleInputChange}
                    value={userData.name}
                />
                <label htmlFor="email" className="label">
                    Email
                </label>
                <input
                    id="email"
                    type="email"
                    name="email"
                    onChange={handleInputChange}
                    value={userData.email}
                />
                <label htmlFor="age" className="label">
                    Age
                </label>
                <input
                    id="age"
                    type="date"
                    name="age"
                    onChange={handleInputChange}
                    value={userData.email}
                />
                <label htmlFor="password" className="label">
                    Password
                </label>
                <input
                    type="password"
                    name="password"
                    onChange={handleInputChange}
                    value={userData.password}
                />
            </div>

            <div className="btns-wrapper">
                <motion.button
                    id="1"
                    type="submit"
                    onClick={handleSubmit}
                    initial={{ x: 0 }}
                    animate={{
                        x: logIn && isClicked === "1" ? "40%" : 0,
                        width: logIn && isClicked === "1" ? 350 : 250,
                        opacity: isClicked === "1" || isClicked === "0" ? 1 : 0,
                    }}
                    transition={{ type: "tween", stiffness: 30, duration: 0.6 }}
                >
                    {logIn && isClicked === "1" ? (
                        <>
                            <motion.svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 52 52"
                                width="32"
                                height="32"
                            >
                                <motion.circle
                                    cx="26"
                                    cy="26"
                                    r="23"
                                    fill="none"
                                    stroke="#ffffff"
                                    strokeWidth="3"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 0.4 }}
                                />
                                <motion.path
                                    fill="none"
                                    stroke="#ffff"
                                    strokeWidth="4"
                                    d="M14 27 L22 34 L38 16"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 0.2, delay: 0.5 }}
                                />
                            </motion.svg>
                        </>
                    ) : (
                        "Zarejestruj się"
                    )}
                </motion.button>
                <p>LUB</p>
                <motion.button
                    id="2"
                    className="sign-google"
                    onClick={handleSubmit}
                    initial={{ x: 0 }}
                    animate={{
                        x: logIn && isClicked === "2" ? "-40%" : 0,
                        width: logIn && isClicked === "2" ? 350 : 250,
                        opacity: isClicked === "2" || isClicked === "0" ? 1 : 0,
                    }}
                    transition={{
                        type: "tween",
                        stiffness: 30,
                        duration: 0.6,
                    }}
                >
                    {logIn && isClicked === "2" ? (
                        <motion.svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 52 52"
                            width="32"
                            height="32"
                        >
                            <motion.circle
                                cx="26"
                                cy="26"
                                r="23"
                                fill="none"
                                stroke="#000000"
                                strokeWidth="3"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 0.4 }}
                            />
                            <motion.path
                                fill="none"
                                stroke="#000000"
                                strokeWidth="4"
                                d="M14 27 L22 34 L38 16"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 0.2, delay: 0.5 }}
                            />
                        </motion.svg>
                    ) : (
                        <>
                            <FontAwesomeIcon icon={faGoogle} />
                            Sign in with Google
                        </>
                    )}
                </motion.button>
            </div>
        </form>
    );
};

export default SignIn;
