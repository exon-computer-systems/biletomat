import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

const MainUserPage = () => {
    const { auth } = useAuth();

    const [userData, setUserData] = useState({
        email: "email@example.com",
        firstName: "John",
        lastName: "Smith",
        age: 22,
    });

    useEffect(() => {
        console.log(auth);
        setUserData(auth);
    }, [auth]);

    return (
        <section className="user-wrapper">
            <div className="user-image">
                <img
                    src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    alt=""
                />
                <h2>{`${userData.firstName} ${userData.lastName}`}</h2>
            </div>

            <section className="main-info">
                <div className="user-l">
                    <div className="info-sections">
                        <label htmlFor="user">Imię i nazwisko</label>
                        <input
                            type="text"
                            placeholder={`${userData.firstName} ${userData.lastName}`}
                            disabled
                        />
                        <p>Zmień swoją nazwę</p>
                    </div>
                    <div className="info-sections">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            placeholder={`${userData.email}`}
                            disabled
                        />
                        <p>Zmień swój email</p>
                    </div>
                    <div className="info-sections">
                        <label htmlFor="password">Hasło</label>
                        <input type="password" placeholder="******" disabled />
                        <p>Zmień swoje hasło</p>
                    </div>
                </div>
            </section>
        </section>
    );
};

export default MainUserPage;
