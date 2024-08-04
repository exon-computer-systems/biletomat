import React, { useRef, useState, useEffect } from "react";
import axios from "../../api/axios";
// import axios from "axios";
import useAuth from "../../hooks/useAuth";

const RegisterForm = ({ handleClose, setResponse }) => {
  const { setAuth, auth } = useAuth();

  const emailRef = useRef();

  const [nextStep, setNextStep] = useState(false);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    age: 22,
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [matchPwd, setMatchPwd] = useState(false);

  const handleNextStep = e => {
    e.preventDefault();
    setNextStep(true);
  };

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  useEffect(() => {
    const { password, passwordConfirmation } = userData;
    setMatchPwd(password === passwordConfirmation);
    setErrorMsg(
      password === passwordConfirmation ? "" : "Passwords dont match"
    );
  }, [userData.password, userData.passwordConfirmation]);

  // useEffect(() => {

  // }, [birthDate]);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    // register
    try {
      const response = await axios.post(
        "/register",
        JSON.stringify({
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          password: userData.password,
          age: userData.age,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(response?.data.success));

      // login after success register
      if (response.data.success) {
        try {

            const response = await axios.post(
                "/register",
                JSON.stringify({
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    email: userData.email,
                    password: userData.password,
                    age: userData.age,
                }),
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );
            console.log(JSON.stringify(response?.data.success));

            // login after success register
            if (response.data.success) {
                try {
                    const response = await axios.post(
                        "/auth",
                        // "https://biletomat-be.onrender.com/auth",
                        // "http://localhost:3500/auth",
                        {
                            email: userData.email,
                            password: userData.password,
                        },
                        {
                            headers: { "Content-Type": "application/json" },
                            withCredentials: true,
                        }
                    );
                    console.log(JSON.stringify(response?.data));
                    //console.log(JSON.stringify(response));
                    const accessToken = response?.data?.accessToken;
                    const roles = response?.data?.roles;
                    const firstName = response?.data?.firstName;
                    const lastName = response?.data?.lastName;
                    const id = response?.data?.id;
                    const likedEvents = response?.data?.likedEvents;
                    const purchasedTickets = response?.data?.purchasedTickets;

                    setAuth({
                        id,
                        email: userData.email,
                        firstName,
                        lastName,
                        roles,
                        accessToken,
                        likedEvents,
                        purchasedTickets,
                    });
                } catch (err) {
                    if (!err?.response) {
                        console.error("No server response");
                    } else if (err.response?.status == 400) {
                        console.error("Missing username or password");
                    } else if (err.response?.status == 401) {
                        console.error("Unauthorized");
                    } else {
                        console.error("Login failed");
                    }
                }

            }
          );
          console.log(JSON.stringify(response?.data));
          //console.log(JSON.stringify(response));
          setResponse(true);
          const accessToken = response?.data?.accessToken;
          const roles = response?.data?.roles;

          setAuth({
            email: userData.email,
            password: userData.password,
            roles,
            accessToken,
          });
          setTimeout(() => {
            handleClose();
          }, 2000);
        } catch (err) {
          if (!err?.response) {
            console.error("No server response");
          } else if (err.response?.status == 400) {
            console.error("Missing username or password");
          } else if (err.response?.status == 401) {
            console.error("Unauthorized");
          } else {
            console.error("Login failed");
          }
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="apanel-form-cont register-form-cont">
      <h1 className="apanel-title register-title">Utwórz konto</h1>
      <form className="register-form apanel-form" onSubmit={handleSubmit}>
        <section className="apanel-inputs">
          {nextStep ? (
            <>
              <label className="register-label apanel-label">
                <p className="register-label-text">First name</p>
                <input
                  className="apanel-input"
                  type="text"
                  name="firstName"
                  onChange={handleInputChange}
                  value={userData.firstName}
                  required
                />
              </label>
              <label className="register-label apanel-label">
                <p className="register-label-text">Last name</p>
                <input
                  className="apanel-input"
                  type="text"
                  name="lastName"
                  onChange={handleInputChange}
                  value={userData.lastName}
                  required
                />
              </label>

              <label className="register-label apanel-label">
                <p className="register-label-text">Date of birth</p>
                <input
                  className="apanel-input"
                  type="number"
                  name="age"
                  onChange={handleInputChange}
                  value={userData.age}
                  required
                />
              </label>
            </>
          ) : (
            <>
              <label className="register-label apanel-label">
                <p className="register-label-text">Email</p>
                <input
                  className="apanel-input"
                  type="email"
                  name="email"
                  ref={emailRef}
                  onChange={handleInputChange}
                  value={userData.email}
                  required
                />
              </label>
              <label className="register-label apanel-label">
                <p className="register-label-text">Password</p>
                <input
                  className="apanel-input"
                  type="password"
                  name="password"
                  onChange={handleInputChange}
                  value={userData.password}
                  required
                />
              </label>
              <label className="register-label apanel-label">
                <p className="register-label-text">Confirm password</p>
                <input
                  className="apanel-input"
                  type="password"
                  name="passwordConfirmation"
                  onChange={handleInputChange}
                  value={userData.passwordConfirmation}
                  required
                />
              </label>
            </>
          )}
          <p className="apanel-error">{errorMsg}</p>
        </section>
        <section className="apanel-btn-cont">
          {nextStep ? (
            <>
              <button
                type="button"
                className="register-btn apanel-btn"
                onClick={() => setNextStep(false)}
              >
                Go back
              </button>
              <button
                type="submit"
                className="register-btn apanel-btn"
                onSubmit={handleSubmit}
              >
                Register
              </button>
            </>
          ) : (
            <button
              disabled={
                !userData.email ||
                !userData.password ||
                !userData.passwordConfirmation ||
                !matchPwd
                  ? true
                  : false
              }
              type="button"
              className="register-btn apanel-btn"
              onClick={handleNextStep}
            >
              Next step
            </button>
          )}
        </section>
      </form>
    </section>
  );
};

export default RegisterForm;
