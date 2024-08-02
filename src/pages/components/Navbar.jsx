import React, { useState } from "react";
import {
    faHeart,
    faUser,
    faRightFromBracket,
    faPlusCircle,
    faPlus,
} from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import useLogout from "../hooks/useLogout";

const Navbar = ({ setIsLogged, isLogged, close, open, handleAuth }) => {
    //   const [isClicked, setIsClicked] = useState(false);
    const allowedRoles = [1984, 2150];

    const nav = useNavigate();
    const { auth } = useAuth();

    const logout = useLogout();

    const signOut = async () => {
        await logout();
    };

    return (
        <>
            <div className="wave-background"></div>
            <header className="navbar">
                <div className="logo" onClick={() => nav("/")}>
                    <img
                        className="logoImage"
                        src="https://motocms.exon.pl/mt-content/uploads/2021/08/exon-logo-biel.png"
                        alt="exon logo"
                    />
                </div>
                <div className="icons">
                    {allowedRoles.some((i) => auth?.roles?.includes(i)) && (
                        <div className="add-post">
                            <button
                                className="nav-btn fav-btn"
                                type="button"
                                onClick={() => nav("/edit-page")}
                            >
                                <FontAwesomeIcon
                                    icon={faPlus}
                                    className="nav-icn"
                                />
                            </button>
                        </div>
                    )}

                    <div className="login">
                        <button
                            className="nav-btn log-btn"
                            type="button"
                            // onClick={() => (isLogged ? close() : open())}
                            onClick={handleAuth}
                        >
                            <FontAwesomeIcon
                                icon={faUser}
                                className="nav-icn"
                            />
                        </button>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Navbar;
