import "./CreateNewPage.css";
import { Link, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import Navbar from "../components/Navbar";
import LinkBack from "../components/LinkBack/LinkBack";
// import theaterData from "../../assets/theaterData.js";

const CreateNewPage = () => {
    let data = {
        theater: {
            name: "Kino Exon",
            location: "Toruń",
            sectors: [
                {
                    sectorName: "A",
                    rows: [
                        {
                            rowNumber: 1,
                            seats: [
                                { seatNumber: 1 },
                                { seatNumber: 2 },
                                { seatNumber: 3 },
                                { seatNumber: 4 },
                                { seatNumber: 5 },
                                { seatNumber: 6 },
                                { seatNumber: 7 },
                                { seatNumber: 8 },
                                { seatNumber: 9 },
                                { seatNumber: 10 },
                            ],
                        },
                        {
                            rowNumber: 2,
                            seats: [
                                { seatNumber: 1 },
                                { seatNumber: 2 },
                                { seatNumber: 3 },
                                { seatNumber: 4 },
                                { seatNumber: 5 },
                                { seatNumber: 6 },
                                { seatNumber: 7 },
                                { seatNumber: 8 },
                                { seatNumber: 9 },
                                { seatNumber: 10 },
                            ],
                        },
                        {
                            rowNumber: 3,
                            seats: [
                                { seatNumber: 1 },
                                { seatNumber: 2 },
                                { seatNumber: 3 },
                                { seatNumber: 4 },
                                { seatNumber: 5 },
                                { seatNumber: 6 },
                                { seatNumber: 7 },
                                { seatNumber: 8 },
                                { seatNumber: 9 },
                                { seatNumber: 10 },
                            ],
                        },
                        {
                            rowNumber: 4,
                            seats: [
                                { seatNumber: 1 },
                                { seatNumber: 2 },
                                { seatNumber: 3 },
                                { seatNumber: 4 },
                                { seatNumber: 5 },
                                { seatNumber: 6 },
                                { seatNumber: 7 },
                                { seatNumber: 8 },
                                { seatNumber: 9 },
                                { seatNumber: 10 },
                            ],
                        },
                        {
                            rowNumber: 5,
                            seats: [
                                { seatNumber: 1 },
                                { seatNumber: 2 },
                                { seatNumber: 3 },
                                { seatNumber: 4 },
                                { seatNumber: 5 },
                                { seatNumber: 6 },
                                { seatNumber: 7 },
                                { seatNumber: 8 },
                                { seatNumber: 9 },
                                { seatNumber: 10 },
                            ],
                        },
                    ],
                },
                {
                    sectorName: "B",
                    rows: [
                        {
                            rowNumber: 1,
                            seats: [
                                { seatNumber: 1 },
                                { seatNumber: 2 },
                                { seatNumber: 3 },
                                { seatNumber: 4 },
                                { seatNumber: 5 },
                                { seatNumber: 6 },
                                { seatNumber: 7 },
                                { seatNumber: 8 },
                                { seatNumber: 9 },
                                { seatNumber: 10 },
                            ],
                        },
                        {
                            rowNumber: 2,
                            seats: [
                                { seatNumber: 1 },
                                { seatNumber: 2 },
                                { seatNumber: 3 },
                                { seatNumber: 4 },
                                { seatNumber: 5 },
                                { seatNumber: 6 },
                                { seatNumber: 7 },
                                { seatNumber: 8 },
                                { seatNumber: 9 },
                                { seatNumber: 10 },
                            ],
                        },
                        {
                            rowNumber: 3,
                            seats: [
                                { seatNumber: 1 },
                                { seatNumber: 2 },
                                { seatNumber: 3 },
                                { seatNumber: 4 },
                                { seatNumber: 5 },
                                { seatNumber: 6 },
                                { seatNumber: 7 },
                                { seatNumber: 8 },
                                { seatNumber: 9 },
                                { seatNumber: 10 },
                            ],
                        },
                        {
                            rowNumber: 4,
                            seats: [
                                { seatNumber: 1 },
                                { seatNumber: 2 },
                                { seatNumber: 3 },
                                { seatNumber: 4 },
                                { seatNumber: 5 },
                                { seatNumber: 6 },
                                { seatNumber: 7 },
                                { seatNumber: 8 },
                                { seatNumber: 9 },
                                { seatNumber: 10 },
                            ],
                        },
                        {
                            rowNumber: 5,
                            seats: [
                                { seatNumber: 1 },
                                { seatNumber: 2 },
                                { seatNumber: 3 },
                                { seatNumber: 4 },
                                { seatNumber: 5 },
                                { seatNumber: 6 },
                                { seatNumber: 7 },
                                { seatNumber: 8 },
                                { seatNumber: 9 },
                                { seatNumber: 10 },
                            ],
                        },
                        {
                            rowNumber: 6,
                            seats: [
                                { seatNumber: 1 },
                                { seatNumber: 2 },
                                { seatNumber: 3 },
                                { seatNumber: 4 },
                                { seatNumber: 5 },
                                { seatNumber: 6 },
                                { seatNumber: 7 },
                                { seatNumber: 8 },
                                { seatNumber: 9 },
                                { seatNumber: 10 },
                            ],
                        },
                        {
                            rowNumber: 7,
                            seats: [
                                { seatNumber: 1 },
                                { seatNumber: 2 },
                                { seatNumber: 3 },
                                { seatNumber: 4 },
                                { seatNumber: 5 },
                                { seatNumber: 6 },
                                { seatNumber: 7 },
                                { seatNumber: 8 },
                                { seatNumber: 9 },
                                { seatNumber: 10 },
                            ],
                        },
                        {
                            rowNumber: 8,
                            seats: [
                                { seatNumber: 1 },
                                { seatNumber: 2 },
                                { seatNumber: 3 },
                                { seatNumber: 4 },
                                { seatNumber: 5 },
                                { seatNumber: 6 },
                                { seatNumber: 7 },
                                { seatNumber: 8 },
                                { seatNumber: 9 },
                                { seatNumber: 10 },
                            ],
                        },
                    ],
                },
                {
                    sectorName: "C",
                    rows: [
                        {
                            rowNumber: 1,
                            seats: [
                                { seatNumber: 1 },
                                { seatNumber: 2 },
                                { seatNumber: 3 },
                                { seatNumber: 4 },
                                { seatNumber: 5 },
                                { seatNumber: 6 },
                                { seatNumber: 7 },
                                { seatNumber: 8 },
                            ],
                        },
                        {
                            rowNumber: 2,
                            seats: [
                                { seatNumber: 1 },
                                { seatNumber: 2 },
                                { seatNumber: 3 },
                                { seatNumber: 4 },
                                { seatNumber: 5 },
                                { seatNumber: 6 },
                                { seatNumber: 7 },
                                { seatNumber: 8 },
                            ],
                        },
                        {
                            rowNumber: 3,
                            seats: [
                                { seatNumber: 1 },
                                { seatNumber: 2 },
                                { seatNumber: 3 },
                                { seatNumber: 4 },
                                { seatNumber: 5 },
                                { seatNumber: 6 },
                                { seatNumber: 7 },
                                { seatNumber: 8 },
                            ],
                        },
                        {
                            rowNumber: 4,
                            seats: [
                                { seatNumber: 1 },
                                { seatNumber: 2 },
                                { seatNumber: 3 },
                                { seatNumber: 4 },
                                { seatNumber: 5 },
                                { seatNumber: 6 },
                                { seatNumber: 7 },
                                { seatNumber: 8 },
                            ],
                        },
                        {
                            rowNumber: 5,
                            seats: [
                                { seatNumber: 1 },
                                { seatNumber: 2 },
                                { seatNumber: 3 },
                                { seatNumber: 4 },
                                { seatNumber: 5 },
                                { seatNumber: 6 },
                                { seatNumber: 7 },
                                { seatNumber: 8 },
                            ],
                        },
                        {
                            rowNumber: 6,
                            seats: [
                                { seatNumber: 1 },
                                { seatNumber: 2 },
                                { seatNumber: 3 },
                                { seatNumber: 4 },
                                { seatNumber: 5 },
                                { seatNumber: 6 },
                                { seatNumber: 7 },
                                { seatNumber: 8 },
                            ],
                        },
                        {
                            rowNumber: 7,
                            seats: [
                                { seatNumber: 1 },
                                { seatNumber: 2 },
                                { seatNumber: 3 },
                                { seatNumber: 4 },
                                { seatNumber: 5 },
                                { seatNumber: 6 },
                                { seatNumber: 7 },
                                { seatNumber: 8 },
                            ],
                        },
                        {
                            rowNumber: 8,
                            seats: [
                                { seatNumber: 1 },
                                { seatNumber: 2 },
                                { seatNumber: 3 },
                                { seatNumber: 4 },
                                { seatNumber: 5 },
                                { seatNumber: 6 },
                                { seatNumber: 7 },
                                { seatNumber: 8 },
                            ],
                        },
                        {
                            rowNumber: 9,
                            seats: [
                                { seatNumber: 1 },
                                { seatNumber: 2 },
                                { seatNumber: 3 },
                                { seatNumber: 4 },
                                { seatNumber: 5 },
                                { seatNumber: 6 },
                                { seatNumber: 7 },
                                { seatNumber: 8 },
                            ],
                        },
                        {
                            rowNumber: 10,
                            seats: [
                                { seatNumber: 1 },
                                { seatNumber: 2 },
                                { seatNumber: 3 },
                                { seatNumber: 4 },
                                { seatNumber: 5 },
                                { seatNumber: 6 },
                                { seatNumber: 7 },
                                { seatNumber: 8 },
                            ],
                        },
                        {
                            rowNumber: 11,
                            seats: [
                                { seatNumber: 1 },
                                { seatNumber: 2 },
                                { seatNumber: 3 },
                                { seatNumber: 4 },
                                { seatNumber: 5 },
                                { seatNumber: 6 },
                                { seatNumber: 7 },
                                { seatNumber: 8 },
                            ],
                        },
                        {
                            rowNumber: 12,
                            seats: [
                                { seatNumber: 1 },
                                { seatNumber: 2 },
                                { seatNumber: 3 },
                                { seatNumber: 4 },
                                { seatNumber: 5 },
                                { seatNumber: 6 },
                                { seatNumber: 7 },
                                { seatNumber: 8 },
                            ],
                        },
                        {
                            rowNumber: 13,
                            seats: [
                                { seatNumber: 1 },
                                { seatNumber: 2 },
                                { seatNumber: 3 },
                                { seatNumber: 4 },
                                { seatNumber: 5 },
                                { seatNumber: 6 },
                                { seatNumber: 7 },
                                { seatNumber: 8 },
                            ],
                        },
                    ],
                },
                {
                    sectorName: "D",
                    rows: [
                        {
                            rowNumber: 1,
                            seats: [
                                { seatNumber: 1 },
                                { seatNumber: 2 },
                                { seatNumber: 3 },
                                { seatNumber: 4 },
                                { seatNumber: 5 },
                                { seatNumber: 6 },
                                { seatNumber: 7 },
                                { seatNumber: 8 },
                            ],
                        },
                        {
                            rowNumber: 2,
                            seats: [
                                { seatNumber: 1 },
                                { seatNumber: 2 },
                                { seatNumber: 3 },
                                { seatNumber: 4 },
                                { seatNumber: 5 },
                                { seatNumber: 6 },
                                { seatNumber: 7 },
                                { seatNumber: 8 },
                            ],
                        },
                        {
                            rowNumber: 3,
                            seats: [
                                { seatNumber: 1 },
                                { seatNumber: 2 },
                                { seatNumber: 3 },
                                { seatNumber: 4 },
                                { seatNumber: 5 },
                                { seatNumber: 6 },
                                { seatNumber: 7 },
                                { seatNumber: 8 },
                            ],
                        },
                        {
                            rowNumber: 4,
                            seats: [
                                { seatNumber: 1 },
                                { seatNumber: 2 },
                                { seatNumber: 3 },
                                { seatNumber: 4 },
                                { seatNumber: 5 },
                                { seatNumber: 6 },
                                { seatNumber: 7 },
                                { seatNumber: 8 },
                            ],
                        },
                        {
                            rowNumber: 5,
                            seats: [
                                { seatNumber: 1 },
                                { seatNumber: 2 },
                                { seatNumber: 3 },
                                { seatNumber: 4 },
                                { seatNumber: 5 },
                                { seatNumber: 6 },
                                { seatNumber: 7 },
                                { seatNumber: 8 },
                            ],
                        },
                        {
                            rowNumber: 6,
                            seats: [
                                { seatNumber: 1 },
                                { seatNumber: 2 },
                                { seatNumber: 3 },
                                { seatNumber: 4 },
                                { seatNumber: 5 },
                                { seatNumber: 6 },
                                { seatNumber: 7 },
                                { seatNumber: 8 },
                            ],
                        },
                        {
                            rowNumber: 7,
                            seats: [
                                { seatNumber: 1 },
                                { seatNumber: 2 },
                                { seatNumber: 3 },
                                { seatNumber: 4 },
                                { seatNumber: 5 },
                                { seatNumber: 6 },
                                { seatNumber: 7 },
                                { seatNumber: 8 },
                            ],
                        },
                        {
                            rowNumber: 8,
                            seats: [
                                { seatNumber: 1 },
                                { seatNumber: 2 },
                                { seatNumber: 3 },
                                { seatNumber: 4 },
                                { seatNumber: 5 },
                                { seatNumber: 6 },
                                { seatNumber: 7 },
                                { seatNumber: 8 },
                            ],
                        },
                        {
                            rowNumber: 9,
                            seats: [
                                { seatNumber: 1 },
                                { seatNumber: 2 },
                                { seatNumber: 3 },
                                { seatNumber: 4 },
                                { seatNumber: 5 },
                                { seatNumber: 6 },
                                { seatNumber: 7 },
                                { seatNumber: 8 },
                            ],
                        },
                        {
                            rowNumber: 10,
                            seats: [
                                { seatNumber: 1 },
                                { seatNumber: 2 },
                                { seatNumber: 3 },
                                { seatNumber: 4 },
                                { seatNumber: 5 },
                                { seatNumber: 6 },
                                { seatNumber: 7 },
                                { seatNumber: 8 },
                            ],
                        },
                        {
                            rowNumber: 11,
                            seats: [
                                { seatNumber: 1 },
                                { seatNumber: 2 },
                                { seatNumber: 3 },
                                { seatNumber: 4 },
                                { seatNumber: 5 },
                                { seatNumber: 6 },
                                { seatNumber: 7 },
                                { seatNumber: 8 },
                            ],
                        },
                        {
                            rowNumber: 12,
                            seats: [
                                { seatNumber: 1 },
                                { seatNumber: 2 },
                                { seatNumber: 3 },
                                { seatNumber: 4 },
                                { seatNumber: 5 },
                                { seatNumber: 6 },
                                { seatNumber: 7 },
                                { seatNumber: 8 },
                            ],
                        },
                        {
                            rowNumber: 13,
                            seats: [
                                { seatNumber: 1 },
                                { seatNumber: 2 },
                                { seatNumber: 3 },
                                { seatNumber: 4 },
                                { seatNumber: 5 },
                                { seatNumber: 6 },
                                { seatNumber: 7 },
                                { seatNumber: 8 },
                            ],
                        },
                    ],
                },
                {
                    sectorName: "E",
                    rows: [
                        {
                            rowNumber: 1,
                            seats: [
                                { seatNumber: 1 },
                                { seatNumber: 2 },
                                { seatNumber: 3 },
                                { seatNumber: 4 },
                                { seatNumber: 5 },
                                { seatNumber: 6 },
                                { seatNumber: 7 },
                                { seatNumber: 8 },
                                { seatNumber: 9 },
                                { seatNumber: 10 },
                                { seatNumber: 11 },
                                { seatNumber: 12 },
                                { seatNumber: 13 },
                                { seatNumber: 14 },
                                { seatNumber: 15 },
                                { seatNumber: 16 },
                                { seatNumber: 17 },
                                { seatNumber: 18 },
                                { seatNumber: 19 },
                                { seatNumber: 20 },
                                { seatNumber: 21 },
                                { seatNumber: 22 },
                                { seatNumber: 23 },
                                { seatNumber: 24 },
                                { seatNumber: 25 },
                                { seatNumber: 26 },
                            ],
                        },
                        {
                            rowNumber: 2,
                            seats: [
                                { seatNumber: 1 },
                                { seatNumber: 2 },
                                { seatNumber: 3 },
                                { seatNumber: 4 },
                                { seatNumber: 5 },
                                { seatNumber: 6 },
                                { seatNumber: 7 },
                                { seatNumber: 8 },
                                { seatNumber: 9 },
                                { seatNumber: 10 },
                                { seatNumber: 11 },
                                { seatNumber: 12 },
                                { seatNumber: 13 },
                                { seatNumber: 14 },
                                { seatNumber: 15 },
                                { seatNumber: 16 },
                                { seatNumber: 17 },
                                { seatNumber: 18 },
                                { seatNumber: 19 },
                                { seatNumber: 20 },
                                { seatNumber: 21 },
                                { seatNumber: 22 },
                                { seatNumber: 23 },
                                { seatNumber: 24 },
                                { seatNumber: 25 },
                                { seatNumber: 26 },
                            ],
                        },
                        {
                            rowNumber: 3,
                            seats: [
                                { seatNumber: 1 },
                                { seatNumber: 2 },
                                { seatNumber: 3 },
                                { seatNumber: 4 },
                                { seatNumber: 5 },
                                { seatNumber: 6 },
                                { seatNumber: 7 },
                                { seatNumber: 8 },
                                { seatNumber: 9 },
                                { seatNumber: 10 },
                                { seatNumber: 11 },
                                { seatNumber: 12 },
                                { seatNumber: 13 },
                                { seatNumber: 14 },
                                { seatNumber: 15 },
                                { seatNumber: 16 },
                                { seatNumber: 17 },
                                { seatNumber: 18 },
                                { seatNumber: 19 },
                                { seatNumber: 20 },
                                { seatNumber: 21 },
                                { seatNumber: 22 },
                                { seatNumber: 23 },
                                { seatNumber: 24 },
                                { seatNumber: 25 },
                                { seatNumber: 26 },
                            ],
                        },
                        {
                            rowNumber: 4,
                            seats: [
                                { seatNumber: 1 },
                                { seatNumber: 2 },
                                { seatNumber: 3 },
                                { seatNumber: 4 },
                                { seatNumber: 5 },
                                { seatNumber: 6 },
                                { seatNumber: 7 },
                                { seatNumber: 8 },
                                { seatNumber: 9 },
                                { seatNumber: 10 },
                                { seatNumber: 11 },
                                { seatNumber: 12 },
                                { seatNumber: 13 },
                                { seatNumber: 14 },
                                { seatNumber: 15 },
                                { seatNumber: 16 },
                                { seatNumber: 17 },
                                { seatNumber: 18 },
                                { seatNumber: 19 },
                                { seatNumber: 20 },
                                { seatNumber: 21 },
                                { seatNumber: 22 },
                                { seatNumber: 23 },
                                { seatNumber: 24 },
                                { seatNumber: 25 },
                                { seatNumber: 26 },
                            ],
                        },
                        {
                            rowNumber: 5,
                            seats: [
                                { seatNumber: 1 },
                                { seatNumber: 2 },
                                { seatNumber: 3 },
                                { seatNumber: 4 },
                                { seatNumber: 5 },
                                { seatNumber: 6 },
                                { seatNumber: 7 },
                                { seatNumber: 8 },
                                { seatNumber: 9 },
                                { seatNumber: 10 },
                                { seatNumber: 11 },
                                { seatNumber: 12 },
                                { seatNumber: 13 },
                                { seatNumber: 14 },
                                { seatNumber: 15 },
                                { seatNumber: 16 },
                                { seatNumber: 17 },
                                { seatNumber: 18 },
                                { seatNumber: 19 },
                                { seatNumber: 20 },
                                { seatNumber: 21 },
                                { seatNumber: 22 },
                                { seatNumber: 23 },
                                { seatNumber: 24 },
                                { seatNumber: 25 },
                                { seatNumber: 26 },
                            ],
                        },
                        {
                            rowNumber: 6,
                            seats: [
                                { seatNumber: 1 },
                                { seatNumber: 2 },
                                { seatNumber: 3 },
                                { seatNumber: 4 },
                                { seatNumber: 5 },
                                { seatNumber: 6 },
                                { seatNumber: 7 },
                                { seatNumber: 8 },
                                { seatNumber: 9 },
                                { seatNumber: 10 },
                                { seatNumber: 11 },
                                { seatNumber: 12 },
                                { seatNumber: 13 },
                                { seatNumber: 14 },
                                { seatNumber: 15 },
                                { seatNumber: 16 },
                                { seatNumber: 17 },
                                { seatNumber: 18 },
                                { seatNumber: 19 },
                                { seatNumber: 20 },
                                { seatNumber: 21 },
                                { seatNumber: 22 },
                                { seatNumber: 23 },
                                { seatNumber: 24 },
                                { seatNumber: 25 },
                                { seatNumber: 26 },
                            ],
                        },
                        {
                            rowNumber: 7,
                            seats: [
                                { seatNumber: 1 },
                                { seatNumber: 2 },
                                { seatNumber: 3 },
                                { seatNumber: 4 },
                                { seatNumber: 5 },
                                { seatNumber: 6 },
                                { seatNumber: 7 },
                                { seatNumber: 8 },
                                { seatNumber: 9 },
                                { seatNumber: 10 },
                                { seatNumber: 11 },
                                { seatNumber: 12 },
                                { seatNumber: 13 },
                                { seatNumber: 14 },
                                { seatNumber: 15 },
                                { seatNumber: 16 },
                                { seatNumber: 17 },
                                { seatNumber: 18 },
                                { seatNumber: 19 },
                                { seatNumber: 20 },
                                { seatNumber: 21 },
                                { seatNumber: 22 },
                                { seatNumber: 23 },
                                { seatNumber: 24 },
                                { seatNumber: 25 },
                                { seatNumber: 26 },
                            ],
                        },
                        {
                            rowNumber: 8,
                            seats: [
                                { seatNumber: 1 },
                                { seatNumber: 2 },
                                { seatNumber: 3 },
                                { seatNumber: 4 },
                                { seatNumber: 5 },
                                { seatNumber: 6 },
                                { seatNumber: 7 },
                                { seatNumber: 8 },
                                { seatNumber: 9 },
                                { seatNumber: 10 },
                                { seatNumber: 11 },
                                { seatNumber: 12 },
                                { seatNumber: 13 },
                                { seatNumber: 14 },
                                { seatNumber: 15 },
                                { seatNumber: 16 },
                                { seatNumber: 17 },
                                { seatNumber: 18 },
                                { seatNumber: 19 },
                                { seatNumber: 20 },
                                { seatNumber: 21 },
                                { seatNumber: 22 },
                                { seatNumber: 23 },
                                { seatNumber: 24 },
                                { seatNumber: 25 },
                                { seatNumber: 26 },
                            ],
                        },
                    ],
                },
            ],
        },
    };
    // const { setAuth, auth } = useAuth();
    const nav = useNavigate();
    const axiosPrivate = useAxiosPrivate();
    // const [isClicked, setIsClicked] = useState("");
    const [postPageData, setPostPageData] = useState({
        title: "",
        artists: "",
        tid: "",
        description: "",
        startDate: "",
        endDate: "",
        city: "",
        coverImage: "",
        eventType: "koncert",
        totalSeats: 0,
        availableSeats: 0,
        sale: false,
        goingFast: false,
        seated: false,
        ticketInfo: [
            {
                sector: "A",
                normal: 0,
                discounted: 0,
                senior: 0,
            },
            {
                sector: "B",
                normal: 0,
                discounted: 0,
                senior: 0,
            },
            {
                sector: "C",
                normal: 0,
                discounted: 0,
                senior: 0,
            },
            {
                sector: "D",
                normal: 0,
                discounted: 0,
                senior: 0,
            },
            {
                sector: "E",
                normal: 0,
                discounted: 0,
                senior: 0,
            },
        ],
        theater: data.theater,
    });

    const handleInputChange = (e) => {
        const { name, value, type } = e.target;
        const inputValue = type === "number" ? Number(value) : value;
        setPostPageData((prev) => ({ ...prev, [name]: inputValue }));
    };

    const handleTicketInfoChange = (sector, type, value) => {
        setPostPageData((prevData) => ({
            ...prevData,
            ticketInfo: prevData.ticketInfo.map((ticket) =>
                ticket.sector === sector
                    ? { ...ticket, [type]: Number(value) }
                    : ticket
            ),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(data);
        try {
            const response = await axiosPrivate.post(
                "/events",
                JSON.stringify(postPageData),
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );

            console.log(response);

            // nav("/success"); // Navigate to a success page if needed
        } catch (err) {
            if (!err?.response) {
                console.error("No server response");
            } else if (err.response?.status === 400) {
                console.error(
                    "Bad Request:",
                    err.response?.data?.message || "Check your input data."
                );
            } else if (err.response?.status === 401) {
                console.error("Unauthorized");
            } else {
                console.error(
                    "Submit failed:",
                    err.response?.data?.message || "Unknown error."
                );
            }
        }
    };

    return (
        <>
            {/* <Navbar /> */}
            <section className="edit-page-container">
                <LinkBack />
                <h1>Dodaj Post</h1>
                <section className="edit-page-wrapper">
                    <form onSubmit={handleSubmit}>
                        <h2 className="ogolne">Ogólne</h2>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="title">Tytuł Wydarzenia</label>
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    value={postPageData.title}
                                    required
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="artists">Artysta/Artyści</label>
                                <input
                                    type="text"
                                    name="artists"
                                    id="artists"
                                    value={postPageData.artists}
                                    required
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="description">Opis</label>
                                <input
                                    type="text"
                                    name="description"
                                    id="description"
                                    value={postPageData.description}
                                    required
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="tid">Title ID</label>
                                <input
                                    type="text"
                                    name="tid"
                                    id="tid"
                                    value={postPageData.tid}
                                    placeholder="np. nazwa-nazwa"
                                    required
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="city">Miasto</label>
                                <input
                                    type="text"
                                    name="city"
                                    id="city"
                                    value={postPageData.city}
                                    required
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="startDate">
                                    Rozpoczęcie Zdarzenia
                                </label>
                                <input
                                    type="text"
                                    name="startDate"
                                    id="startDate"
                                    value={postPageData.startDate}
                                    placeholder="YYYY-MM-DD"
                                    required
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="endDate">
                                    Zakończenia Zdarzenia
                                </label>
                                <input
                                    type="text"
                                    name="endDate"
                                    id="endDate"
                                    placeholder="YYYY-MM-DD"
                                    value={postPageData.endDate}
                                    required
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="coverImage">
                                    Zdjęcie URL Zdarzenia
                                </label>
                                <input
                                    type="text"
                                    name="coverImage"
                                    id="coverImage"
                                    placeholder="https://example.com"
                                    value={postPageData.coverImage}
                                    required
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="eventType">Rodzaj Eventu</label>
                                <input
                                    type="text"
                                    name="eventType"
                                    id="eventType"
                                    value={postPageData.eventType}
                                    required
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-checkbox">
                                <label htmlFor="eventType">
                                    Wydarzenie z miejscami siedzącymi (sektory)?
                                </label>
                                <input
                                    type="checkbox"
                                    checked={postPageData.seated}
                                    onChange={(e) =>
                                        setPostPageData((prev) => ({
                                            ...prev,
                                            seated: e.target.checked,
                                        }))
                                    }
                                />
                            </div>
                        </div>

                        <section className="edit-tickets">
                            <h2>Bilety</h2>
                            {postPageData.seated
                                ? postPageData.ticketInfo.map(
                                      (ticket, index) => (
                                          <div className="form-row" key={index}>
                                              {ticket.sector + ": "}
                                              <div className="form-group">
                                                  <label htmlFor="normal">
                                                      Normalny
                                                  </label>
                                                  <input
                                                      type="number"
                                                      name="normal"
                                                      id="normal"
                                                      value={ticket.normal}
                                                      onChange={(e) =>
                                                          handleTicketInfoChange(
                                                              ticket.sector,
                                                              "normal",
                                                              e.target.value
                                                          )
                                                      }
                                                      required
                                                  />
                                              </div>
                                              <div className="form-group">
                                                  <label htmlFor="discounted">
                                                      Ulgowy
                                                  </label>
                                                  <input
                                                      type="number"
                                                      name="discounted"
                                                      id="discounted"
                                                      value={ticket.discounted}
                                                      onChange={(e) =>
                                                          handleTicketInfoChange(
                                                              ticket.sector,
                                                              "discounted",
                                                              e.target.value
                                                          )
                                                      }
                                                      required
                                                  />
                                              </div>
                                              <div className="form-group">
                                                  <label htmlFor="vipTicket">
                                                      Senior
                                                  </label>
                                                  <input
                                                      type="number"
                                                      name="senior"
                                                      id="senior"
                                                      value={ticket.senior}
                                                      onChange={(e) =>
                                                          handleTicketInfoChange(
                                                              ticket.sector,
                                                              "senior",
                                                              e.target.value
                                                          )
                                                      }
                                                      required
                                                  />
                                              </div>
                                          </div>
                                      )
                                  )
                                : postPageData.ticketInfo
                                      .slice(0, 1)
                                      .map((ticket, index) => (
                                          <div className="form-row" key={index}>
                                              <div className="form-group">
                                                  <label htmlFor="normal">
                                                      Normalny
                                                  </label>
                                                  <input
                                                      type="number"
                                                      name="normal"
                                                      id="normal"
                                                      value={ticket.normal}
                                                      onChange={(e) =>
                                                          handleTicketInfoChange(
                                                              ticket.sector,
                                                              "normal",
                                                              e.target.value
                                                          )
                                                      }
                                                      required
                                                  />
                                              </div>
                                              <div className="form-group">
                                                  <label htmlFor="discounted">
                                                      Ulgowy
                                                  </label>
                                                  <input
                                                      type="number"
                                                      name="discounted"
                                                      id="discounted"
                                                      value={ticket.discounted}
                                                      onChange={(e) =>
                                                          handleTicketInfoChange(
                                                              ticket.sector,
                                                              "discounted",
                                                              e.target.value
                                                          )
                                                      }
                                                      required
                                                  />
                                              </div>
                                              <div className="form-group">
                                                  <label htmlFor="vipTicket">
                                                      Senior
                                                  </label>
                                                  <input
                                                      type="number"
                                                      name="senior"
                                                      id="senior"
                                                      value={ticket.senior}
                                                      onChange={(e) =>
                                                          handleTicketInfoChange(
                                                              ticket.sector,
                                                              "senior",
                                                              e.target.value
                                                          )
                                                      }
                                                      required
                                                  />
                                              </div>
                                          </div>
                                      ))}
                        </section>
                        <div className="edit-page-btn-container">
                            <button
                                className="save-btn edit-page-btn"
                                type="submit"
                                onClick={handleSubmit}
                            >
                                Zapisz
                            </button>
                            <button
                                className="delete-btn edit-page-btn"
                                type="submit"
                            >
                                Usuń post
                            </button>
                        </div>
                    </form>
                </section>
            </section>
        </>
    );
};

export default CreateNewPage;
