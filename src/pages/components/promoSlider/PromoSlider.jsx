import React, { useEffect, useRef, useState } from "react";
import "./PromoSlider.css";
import Card from "./PromoCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { height } from "@fortawesome/free-solid-svg-icons/fa0";

const PromoSlider = () => {
    const [width, setWidth] = useState(250);
    const [events, setEvents] = useState(null);
    const [loading, setLoading] = useState(true);

    const ref = useRef(0);

    const scrollBy = (scrollOffset) => {
        ref.current.scrollLeft += scrollOffset;
    };

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const events = await fetch(data);
    //         const json = await events.json();

    //         console.log(json);
    //     };

    //     fetchData();
    // }, []);

    // console.log(data);

    const data = [
        {
            artist: "Coldplay",
            description:
                "Legendarny brytyjski zespół rockowy Coldplay przyjeżdża do twojego miasta z niesamowitym występem na żywo.",
            date: "2024-09-15 - 2024-09-16",
            totalSeats: 50000,
            availableSeats: 15000,
            coverImage:
                "https://dynamicmedia.livenationinternational.com/p/t/e/9b86afab-433d-44a3-882d-35fc894d4ee4.jpg",
            images: [
                "https://upload.wikimedia.org/wikipedia/commons/2/2e/ColdplayBBC071221_%28cropped%29.jpg",
                "https://m.media-amazon.com/images/S/le-target-images-prod/amzn1.dv.gti.4abd6810-ef08-0490-d751-d4945c304a8e/2/HERO-16X9/en-US._UR1920,1080_.jpg",
            ],
            videos: [
                "https://www.youtube.com/watch?v=QtXby3twMmI",
                "https://www.youtube.com/watch?v=dvgZkm1xWPE",
            ],
            eventType: "koncert",
            city: "Warszawa",
        },
        {
            artist: "Taco Hemingway",
            description:
                "Taco Hemingway wystąpi na żywo, prezentując swoje najnowsze utwory i klasyki.",
            date: "2024-08-20",
            totalSeats: 20000,
            availableSeats: 4000,
            coverImage:
                "https://lastfm.freetls.fastly.net/i/u/770x0/d54ce0bab1328844072bff31dab02a7c.jpg#d54ce0bab1328844072bff31dab02a7c",
            images: [
                "https://bi.im-g.pl/im/3d/b1/1c/z30088765AMP,Taco-Hemingway-podczas-koncertu-w-ramach-Krakow-Li.jpg",
                "https://ocdn.eu/pulscms-transforms/1/SPCk9kpTURBXy8yNjM2ODRkY2YwYWVhMmIwNDYyYzM3ZmIwZTBkN2U5Zi5qcGeTlQMAO80EsM0CpJUCzQSwAMPDkwmmZGRiMjc5Bt4AAaEwAQ/opener-festival-2015-taco-hemingway.jpeg",
            ],
            videos: [
                "https://www.youtube.com/watch?v=5BtaOGB3_Wc",
                "https://www.youtube.com/watch?v=qyVBsXMkP-w",
            ],
            eventType: "koncert",
            city: "Bydgoszcz",
        },
        {
            artist: "Beyoncé",
            description:
                "Dołącz do Beyoncé na niezapomnianą noc muzyki i tańca.",
            date: "2024-10-05",
            totalSeats: 30000,
            availableSeats: 5000,
            coverImage:
                "https://i.pinimg.com/564x/42/b2/f6/42b2f610dfb52b415b346874db382e3b.jpg",
            images: [
                "https://ocdn.eu/pulscms-transforms/1/9Rhk9kpTURBXy8xZDI0ODdlMjllNWM1MDhhM2ExNmVkMGZjNTU0YThlZC5qcGeTlQMAJc0GrM0DwJUCzQSwAMPDkwmmOTgwZjg1Bt4AAaEwAQ/beyonce.jpeg",
                "https://www.glamour.pl/media/cache/default_view/uploads/media/default/0007/45/beyonce-i-blue-ivy-carter.png",
            ],
            videos: [
                "https://www.youtube.com/watch?v=Ob7vObnFUJc",
                "https://www.youtube.com/watch?v=4m1EFMoRFvY",
            ],
            eventType: "koncert",
            city: "Toruń",
        },
        {
            artist: "Ed Sheeran",
            description: "Przeżyj poruszające występy Eda Sheerana na żywo.",
            date: "2024-11-20 - 2024-11-21",
            totalSeats: 40000,
            availableSeats: 10000,
            coverImage:
                "https://www.terazmuzyka.pl/wp-content/uploads/2021/06/ed-sheeran.jpg",
            images: [
                "https://bi.im-g.pl/im/22/b2/1d/z31139874AMP,Ed-Sheeran-na-Polsat-Plus-Arena-w-Gdansku.jpg",
                "https://ocdn.eu/pulscms-transforms/1/YPsk9kpTURBXy9jZGI1OWU2YmU2NzIxYjU0MTRlNTc2MTA5YTFlZWQxYS5qcGeTlQMAGc0H0M0EZZUCzQSwAMPDkwmmNDk1OWQ1Bt4AAaEwAQ/ed-sheeran-na-koncercie-w-nowym-jorku.jpeg",
            ],
            videos: [
                "https://www.youtube.com/watch?v=2Vv-BfVoq4g",
                "https://www.youtube.com/watch?v=lp-EO5I60KA",
            ],
            eventType: "koncert",
            city: "Gdańsk",
        },
        {
            artist: "Adele",
            description:
                "Adele powraca na scenę z jej potężnym głosem i duszną muzyką.",
            date: "2024-12-01",
            totalSeats: 25000,
            availableSeats: 8000,
            coverImage:
                "https://goingapp.pl/more/wp-content/uploads/2024/02/Kopia-RAMKA-MORE-SOCIAL-MEDIA-IMAGE-2024-02-01T155651.170-1600x800.jpg",
            images: [
                "https://muzeum.com.pl/wp-content/uploads/2024/07/adele-strona.png",
                "https://www.glamour.pl/media/cache/default_view/uploads/media/default/0007/31/adele-i-rich-paul.jpg",
            ],
            videos: [
                "https://www.youtube.com/watch?v=DDWKuo3gXMQ",
                "https://www.youtube.com/watch?v=hLQl3WQQoQ0",
            ],
            eventType: "koncert",
            city: "Bydgoszcz",
        },
        {
            artist: "Bruno Mars",
            description:
                "Zobacz niesamowite show Bruno Marsa z jego największymi przebojami.",
            date: "2024-07-10",
            totalSeats: 35000,
            availableSeats: 10000,
            coverImage:
                "https://cdns-images.dzcdn.net/images/artist/7f3c0956357c326b2db2cf436f1dc8c5/500x500.jpg",
            images: [
                "https://ocdn.eu/pulscms-transforms/1/xfRk9kpTURBXy83YTljZDg1MjUwMTlhOGRiMGQ3Zjk0N2YwYjgzOGYwYy5qcGeTlQMAzGHNDIvNBw6VAs0EsADDw5MJpmNiMTIxYQbeAAGhMAE/bruno-mars.jpeg",
                "https://bi.im-g.pl/im/24/63/1d/z30814500IER,Bruno-Mars-hazardzista--Media-mowia--ze-jego-dlug-.jpg",
            ],
            videos: [
                "https://www.youtube.com/watch?v=UqyT8IEBkvY",
                "https://www.youtube.com/watch?v=OPf0YbXqDm0",
            ],
            eventType: "koncert",
            city: "Katowice",
        },
        {
            artist: "The Weeknd",
            description:
                "Przygotuj się na niezapomnianą noc z The Weeknd i jego przebojami.",
            date: "2024-09-22 - 2024-09-23",
            totalSeats: 40000,
            availableSeats: 12000,
            coverImage:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-eoqi_wvJaZHOFnuicZFksTIQKUpUnHFJEagUs-wVEcayIUUyNBKONpksrrdkrUvtSmo&usqp=CAU",
            images: [
                "https://static.independent.co.uk/s3fs-public/thumbnails/image/2020/03/20/11/the-weeknd.jpg",
                "https://static.independent.co.uk/2023/08/11/20/GettyImages-1447433147.jpg",
            ],
            videos: [
                "https://www.youtube.com/watch?v=34Na4j8AVgA",
                "https://www.youtube.com/watch?v=yzTuBuRdAyA",
            ],
            eventType: "koncert",
            city: "Bydgoszcz",
        },
        {
            artist: "Rihanna",
            description:
                "Rihanna powraca na scenę z niezwykłym występem na żywo.",
            date: "2024-10-15",
            totalSeats: 30000,
            availableSeats: 5000,
            coverImage:
                "https://www.usatoday.com/gcdn/media/USATODAY/USATODAY/2013/04/13/ap_rihanna_las_vegas-3_4.jpg",
            images: [
                "https://idsb.tmgrup.com.tr/ly/uploads/images/2023/12/13/305276.jpg",
                "https://media.vanityfair.com/photos/56f96e4ab24e140048474af3/master/pass/rihanna-anti-world-tour-barclays.jpg",
            ],
            videos: [
                "https://www.youtube.com/watch?v=lWA2pjMjpBs",
                "https://www.youtube.com/watch?v=2zpGmrBunrE",
            ],
            eventType: "koncert",
            city: "Warszawa",
        },
        {
            artist: "Dawid Podsiadło",
            description:
                "Dawid Podsiadło zagra na żywo, wykonując swoje najnowsze hity oraz ulubione utwory fanów.",
            date: "2024-09-05",
            totalSeats: 25000,
            availableSeats: 5000,
            coverImage:
                "https://img.redbull.com/images/c_crop,x_0,y_0,h_1706,w_1365/c_fill,w_450,h_600/q_auto:low,f_auto/redbullcom/2018/10/06/3bee023e-0d4c-45bf-bab7-04f664984d3f/dawid-podsiadlo",
            images: [
                "https://cdn.galleries.smcloud.net/t/galleries/gf-AEFP-R79m-xkZ6_dawid-podsiadlo-zaskoczyl-na-narodowym-post-na-rockowo-i-zapowiedz-kolejnych-stadionowych-koncertow-1920x1080-nocrop.jpg",
                "https://ocdn.eu/pulscms-transforms/1/ok5k9kpTURBXy8xMDYzYjQ1M2VjMzUyMGNmZjYxNjYzMGM2Y2E1YzIxNC5qcGeTlQMAIs0H0M0EZZUCzQSwAMPDkwmmNDk1NjYyBt4AAaEwAQ/dawid-podsiadlo.jpeg",
            ],
            videos: [
                "https://www.youtube.com/watch?v=6rsVTruvB2E",
                "https://www.youtube.com/watch?v=VtxJmHyUSIo",
            ],
            eventType: "koncert",
            city: "Poznań",
        },
        {
            artist: "Post Malone",
            description:
                "Nie przegap koncertu Post Malone z jego największymi hitami.",
            date: "2024-12-20 - 2024-12-21",
            totalSeats: 30000,
            availableSeats: 7000,
            coverImage:
                "https://muzyk.net/wp-content/uploads/2023/04/postmalone.jpg",
            images: [
                "https://pyxis.nymag.com/v1/imgs/fdf/db0/421af17121276a71945282e440357c43cb-25-post-malone-2.rsocial.w1200.jpg",
                "https://www.rollingstone.com/wp-content/uploads/2024/05/morgan-wallen-post-malone-song.jpg?crop=0px%2C2px%2C1798px%2C1014px&resize=1600%2C900",
            ],
            videos: [
                "https://www.youtube.com/watch?v=ApXoWvfEYVU",
                "https://www.youtube.com/watch?v=UYwF-jdcVjY",
            ],
            eventType: "koncert",
            city: "Toruń",
        },
    ];

    return (
        <section className="promo-wrap">
            <button
                className="promo-btn promo-btn-left"
                onClick={() => scrollBy(-width)}
            >
                <FontAwesomeIcon icon={faAngleLeft} />
            </button>
            <button
                className="promo-btn promo-btn-right"
                onClick={() => scrollBy(width)}
            >
                <FontAwesomeIcon icon={faAngleRight} />
            </button>
            <section className="promo" ref={ref}>
                {data
                    // ?.filter((el, idx) => idx < 5)
                    .map((el, idx) => {
                        // console.log(idx);
                        return idx === 2 ||
                            idx === 3 ||
                            idx === 5 ||
                            idx === 6 ? (
                            <Card
                                key={idx}
                                title={el.title}
                                date={el.date}
                                city={el.city}
                                coverImage={el.coverImage}
                                width={width}
                                height={"half"}
                            />
                        ) : (
                            <Card
                                key={idx}
                                title={el.title}
                                date={el.date}
                                city={el.city}
                                coverImage={el.coverImage}
                                width={width}
                            />
                        );
                    })}
            </section>
        </section>
    );
};

export default PromoSlider;
