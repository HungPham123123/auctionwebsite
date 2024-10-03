import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import PromoVideo from "./Video/PromoVideo";
import './home.css';

function Home() {
    const [timerDays, setTimerDays] = useState('00');
    const [timerHours, setTimerHours] = useState('00');
    const [timerMinutes, setTimerMinutes] = useState('00');
    const [timerSeconds, setTimerSeconds] = useState('00');
    const [isModalOpen, setIsModalOpen] = useState(false);

    let interval = useRef();

    const startTimer = () => {
        const countdownDate = new Date('October 21, 2024 00:00:00').getTime();

        interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = countdownDate - now;

            const days = Math.floor (distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor ((distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)));
            const minutes = Math.floor ((distance % (1000 * 60 * 60) / (1000 * 60)));
            const seconds = Math.floor ((distance % (1000 * 60)) / 1000);

            if (distance < 0 ) {
                clearInterval(interval.current);
            } else {
                setTimerDays(days);
                setTimerHours(hours);
                setTimerMinutes(minutes);
                setTimerSeconds(seconds);
            }
        }, 1000);
    }

    useEffect(() => {
        startTimer();
        return () => {
            clearInterval(interval.current);
        }
    });


    const handleOpenModal = () => {
        setIsModalOpen(true);
      };

      const handleCloseModal = () => {
        setIsModalOpen(false);
      };
    return(
        <div>
       <div class="home-video-container">
    <video autoPlay loop muted playsinline>
        <source src="video/video1.mp4" type="video/mp4"/>
        Your browser does not support the video tag.
    </video>
    <div className="overlay">
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h1 className="title-homepage">Join Our Next Auction! Find<br/> Your Equipment</h1>
                    <div className="search-box">
                        <div className="input-group">
                            <ul className="home-inline-list">
                                <li className="product-cat">
                                <select className="form-select" id="categorySelect">
                                    <option>All Categories</option>
                                    <option>Category 1</option>
                                    <option>Category 2</option>
                                </select>
                                </li>
                                <li className="product-name">
                                    <input type="text" className="form-control" placeholder="I'm Looking for..."/>
                                </li>
                                <li className="btn-search">
                                    <div>
                                        <input type="submit" className="button" value="Search"/>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="video-promo mt-4">
                    <button className="red-button" onClick={handleOpenModal}>
                    <i class="fa-solid fa-play"></i>
                        <span>We are running our summer discount<br/>Watch video to learn more
                        </span>
                        <div className="playvideo-animation"></div>
                        <div className="playvideo-animation-1"></div>
                        <div className="playvideo-animation-2"></div>
                    </button>
                    </div>
                    <PromoVideo
                     isOpen={isModalOpen}
                     onClose={handleCloseModal}
                     videoSrc="https://www.youtube.com/embed/your-video-id"
                    />
                </div>
                <div class="col-md-0 d-none d-md-block">
                </div>
            </div>
        </div>
    </div>
</div>

            <div className="container auction-popular-container">
                <div className="ending-auction-container">
                    <h2>Explore Popular Categories</h2>
                </div>
                <div className="row category-row">
                    <li className="product-category">
                        <Link className="category-link">
                            <img src="images/category1.png" className="product-category-img"/>
                            <h2 className="category-name">Furniture </h2>
                        </Link>
                    </li>
                    <li className="product-category">
                        <Link className="category-link">
                            <img src="images/category2.png" className="product-category-img"/>
                            <h2 className="category-name">Stamp </h2>
                        </Link>
                    </li>
                    <li className="product-category">
                        <Link className="category-link">
                            <img src="images/category3.png" className="product-category-img"/>
                            <h2 className="category-name">Watches </h2>
                        </Link>
                    </li>
                    <li className="product-category">
                        <Link className="category-link">
                            <img src="images/category1.png" className="product-category-img"/>
                            <h2 className="category-name">Furniture </h2>
                        </Link>
                    </li>
                    <li className="product-category">
                        <Link className="category-link">
                            <img src="images/category1.png" className="product-category-img"/>
                            <h2 className="category-name">Furniture </h2>
                        </Link>
                    </li>
                    <li className="product-category">
                        <Link className="category-link">
                            <img src="images/category1.png" className="product-category-img"/>
                            <h2 className="category-name">Furniture </h2>
                        </Link>
                    </li>
                </div>
            </div>

            <div className="upcoming-auction-container">
                    <div className="container auction-upcoming-container">
                    <h2>Upcoming Auctions</h2>
                    </div>
                </div>
            <div className="container auction-upcoming-container">
                <div className="row auction-box">
                    <div className="col-md-6">
                    <div className="auction-items auction-items-bigger">
                    <div className="auction-image bigger-img-auction">
                        <div class="image-wrapper">
                            <Link to="/detail">
                            <img src="images/productimage1.jpg" />
                            </Link>
                         </div>
                        <div className="auction-time">
                        <div className="auction-time-items">
                            <div className="countdown-box">
                            <span className="countdown-time">
                                <span className="auction-timer">
                                    <span>{timerDays}</span>
                                    <span className="auction-date">Days</span>
                                </span>
                                <span className="auction-timer">
                                <span>{timerHours}</span>
                                <span className="auction-date">Hours</span>
                                </span>
                                <span className="auction-timer">
                                <span>{timerMinutes}</span>
                                <span className="auction-date">Minutes</span>
                                </span>
                                <span className="auction-timer">
                                <span>{timerSeconds}</span>
                                <span className="auction-date">Seconds</span>
                                </span>
                            </span>
                            </div>
                        </div>
                    </div>
                    <div className="bid-now-button">
                        <button className="bid-button">
                        <Link>Bid Now</Link>
                        </button>
                    </div>
                    <div className="favorite-button">
                    <i class="fa-regular fa-heart"></i>
                    </div>
                    </div>
                    <Link className="wrap-auction-detail">
                    <div className="auction-name-price">
                        <div className="auction-name">
                            <span>History</span>
                        </div>
                        <div className="space-between">
                            <div className="auction-category">
                                <p>Books</p>
                            </div>
                        <div className="auction-price">
                        <p>Starting Bid: 2000</p>
                        </div>
                        </div>
                    </div>
                    </Link>
                </div>
                    </div>
                    <div className="col-md-6">
                    <div className="row">
                    <div className="auction-items">
                    <div className="auction-image small-img-auction">
                        <img src="images/productimage7.jpg"/>
                        <div className="auction-time">
                        <div className="auction-time-items">
                            <div className="countdown-box">
                            <span className="countdown-time">
                                <span className="auction-timer">
                                    <span>{timerDays}</span>
                                    <span className="auction-date">Days</span>
                                </span>
                                <span className="auction-timer">
                                <span>{timerHours}</span>
                                <span className="auction-date">Hours</span>
                                </span>
                                <span className="auction-timer">
                                <span>{timerMinutes}</span>
                                <span className="auction-date">Minutes</span>
                                </span>
                                <span className="auction-timer">
                                <span>{timerSeconds}</span>
                                <span className="auction-date">Seconds</span>
                                </span>
                            </span>
                            </div>
                        </div>
                    </div>
                    <div className="bid-now-button">
                        <button className="bid-button">
                        <Link>Bid Now</Link>
                        </button>
                    </div>
                    <div className="favorite-button">
                    <i class="fa-regular fa-heart"></i>
                    </div>
                    </div>
                    <Link className="wrap-auction-detail">
                    <div className="auction-name-price">
                        <div className="auction-name">
                            <span>History</span>
                        </div>
                        <div className="space-between">
                            <div className="auction-category">
                                <p>Books</p>
                            </div>
                        <div className="auction-price">
                        <p>Starting Bid: 2000</p>
                        </div>
                        </div>
                    </div>
                    </Link>
                </div>
                <div className="auction-items">
                    <div className="auction-image small-img-auction">
                        <img src="images/productimage9.jpg"/>
                        <div className="auction-time">
                        <div className="auction-time-items">
                            <div className="countdown-box">
                            <span className="countdown-time">
                                <span className="auction-timer">
                                    <span>{timerDays}</span>
                                    <span className="auction-date">Days</span>
                                </span>
                                <span className="auction-timer">
                                <span>{timerHours}</span>
                                <span className="auction-date">Hours</span>
                                </span>
                                <span className="auction-timer">
                                <span>{timerMinutes}</span>
                                <span className="auction-date">Minutes</span>
                                </span>
                                <span className="auction-timer">
                                <span>{timerSeconds}</span>
                                <span className="auction-date">Seconds</span>
                                </span>
                            </span>
                            </div>
                        </div>
                    </div>
                    <div className="bid-now-button">
                        <button className="bid-button">
                        <Link>Bid Now</Link>
                        </button>
                    </div>
                    <div className="favorite-button">
                    <i class="fa-regular fa-heart"></i>
                    </div>
                    </div>
                    <Link className="wrap-auction-detail">
                    <div className="auction-name-price">
                        <div className="auction-name">
                            <span>History</span>
                        </div>
                        <div className="space-between">
                            <div className="auction-category">
                                <p>Books</p>
                            </div>
                        <div className="auction-price">
                        <p>Starting Bid: 2000</p>
                        </div>
                        </div>
                    </div>
                    </Link>
                </div>
                <div className="auction-items">
                    <div className="auction-image small-img-auction">
                        <img src="images/productimage9.jpg"/>
                        <div className="auction-time">
                        <div className="auction-time-items">
                            <div className="countdown-box">
                            <span className="countdown-time">
                                <span className="auction-timer">
                                    <span>{timerDays}</span>
                                    <span className="auction-date">Days</span>
                                </span>
                                <span className="auction-timer">
                                <span>{timerHours}</span>
                                <span className="auction-date">Hours</span>
                                </span>
                                <span className="auction-timer">
                                <span>{timerMinutes}</span>
                                <span className="auction-date">Minutes</span>
                                </span>
                                <span className="auction-timer">
                                <span>{timerSeconds}</span>
                                <span className="auction-date">Seconds</span>
                                </span>
                            </span>
                            </div>
                        </div>
                    </div>
                    <div className="bid-now-button">
                        <button className="bid-button">
                        <Link>Bid Now</Link>
                        </button>
                    </div>
                    <div className="favorite-button">
                    <i class="fa-regular fa-heart"></i>
                    </div>
                    </div>
                    <Link className="wrap-auction-detail">
                    <div className="auction-name-price">
                        <div className="auction-name">
                            <span>History</span>
                        </div>
                        <div className="space-between">
                            <div className="auction-category">
                                <p>Books</p>
                            </div>
                        <div className="auction-price">
                        <p>Starting Bid: 2000</p>
                        </div>
                        </div>
                    </div>
                    </Link>
                </div>
                <div className="auction-items">
                    <div className="auction-image small-img-auction">
                        <img src="images/productimage9.jpg"/>
                        <div className="auction-time">
                        <div className="auction-time-items">
                            <div className="countdown-box">
                            <span className="countdown-time">
                                <span className="auction-timer">
                                    <span>{timerDays}</span>
                                    <span className="auction-date">Days</span>
                                </span>
                                <span className="auction-timer">
                                <span>{timerHours}</span>
                                <span className="auction-date">Hours</span>
                                </span>
                                <span className="auction-timer">
                                <span>{timerMinutes}</span>
                                <span className="auction-date">Minutes</span>
                                </span>
                                <span className="auction-timer">
                                <span>{timerSeconds}</span>
                                <span className="auction-date">Seconds</span>
                                </span>
                            </span>
                            </div>
                        </div>
                    </div>
                    <div className="bid-now-button">
                        <button className="bid-button">
                        <Link>Bid Now</Link>
                        </button>
                    </div>
                    <div className="favorite-button">
                    <i class="fa-regular fa-heart"></i>
                    </div>
                    </div>
                    <Link className="wrap-auction-detail">
                    <div className="auction-name-price">
                        <div className="auction-name">
                            <span>History</span>
                        </div>
                        <div className="space-between">
                            <div className="auction-category">
                                <p>Books</p>
                            </div>
                        <div className="auction-price">
                        <p>Starting Bid: 2000</p>
                        </div>
                        </div>
                    </div>
                    </Link>
                </div>
                </div>
                    </div>
                </div>
            </div>

             <div className="container auction-1440">
                <div className="by-hand-container">
                    <h2 className="font-title-homepage">Products picked by hand</h2>
                    </div>
                    <div className="row">
                    <div className="auction-items auction-items-smaller">
                    <div className="auction-image small-img-auction">
                        <img src="images/productimage7.jpg"/>
                        <div className="auction-time">
                        <div className="auction-time-items">
                            <div className="countdown-box">
                            <span className="countdown-time">
                                <span className="auction-timer">
                                    <span>{timerDays}</span>
                                    <span className="auction-date">Days</span>
                                </span>
                                <span className="auction-timer">
                                <span>{timerHours}</span>
                                <span className="auction-date">Hours</span>
                                </span>
                                <span className="auction-timer">
                                <span>{timerMinutes}</span>
                                <span className="auction-date">Minutes</span>
                                </span>
                                <span className="auction-timer">
                                <span>{timerSeconds}</span>
                                <span className="auction-date">Seconds</span>
                                </span>
                            </span>
                            </div>
                        </div>
                    </div>
                    <div className="bid-now-button">
                        <button className="bid-button">
                        <Link>Bid Now</Link>
                        </button>
                    </div>
                    <div className="favorite-button">
                    <i class="fa-regular fa-heart"></i>
                    </div>
                    </div>
                    <Link className="wrap-auction-detail">
                    <div className="auction-name-price">
                        <div className="auction-name">
                            <span>History</span>
                        </div>
                        <div className="space-between">
                            <div className="auction-category">
                                <p>Books</p>
                            </div>
                        <div className="auction-price">
                        <p>Starting Bid: 2000</p>
                        </div>
                        </div>
                    </div>
                    </Link>
                </div>
                <div className="auction-items auction-items-smaller">
                    <div className="auction-image small-img-auction">
                        <img src="images/productimage9.jpg"/>
                        <div className="auction-time">
                        <div className="auction-time-items">
                            <div className="countdown-box">
                            <span className="countdown-time">
                                <span className="auction-timer">
                                    <span>{timerDays}</span>
                                    <span className="auction-date">Days</span>
                                </span>
                                <span className="auction-timer">
                                <span>{timerHours}</span>
                                <span className="auction-date">Hours</span>
                                </span>
                                <span className="auction-timer">
                                <span>{timerMinutes}</span>
                                <span className="auction-date">Minutes</span>
                                </span>
                                <span className="auction-timer">
                                <span>{timerSeconds}</span>
                                <span className="auction-date">Seconds</span>
                                </span>
                            </span>
                            </div>
                        </div>
                    </div>
                    <div className="bid-now-button">
                        <button className="bid-button">
                        <Link>Bid Now</Link>
                        </button>
                    </div>
                    <div className="favorite-button">
                    <i class="fa-regular fa-heart"></i>
                    </div>
                    </div>
                    <Link className="wrap-auction-detail">
                    <div className="auction-name-price">
                        <div className="auction-name">
                            <span>History</span>
                        </div>
                        <div className="space-between">
                            <div className="auction-category">
                                <p>Books</p>
                            </div>
                        <div className="auction-price">
                        <p>Starting Bid: 2000</p>
                        </div>
                        </div>
                    </div>
                    </Link>
                </div>
                <div className="auction-items auction-items-smaller">
                    <div className="auction-image small-img-auction">
                        <img src="images/productimage9.jpg"/>
                        <div className="auction-time">
                        <div className="auction-time-items">
                            <div className="countdown-box">
                            <span className="countdown-time">
                                <span className="auction-timer">
                                    <span>{timerDays}</span>
                                    <span className="auction-date">Days</span>
                                </span>
                                <span className="auction-timer">
                                <span>{timerHours}</span>
                                <span className="auction-date">Hours</span>
                                </span>
                                <span className="auction-timer">
                                <span>{timerMinutes}</span>
                                <span className="auction-date">Minutes</span>
                                </span>
                                <span className="auction-timer">
                                <span>{timerSeconds}</span>
                                <span className="auction-date">Seconds</span>
                                </span>
                            </span>
                            </div>
                        </div>
                    </div>
                    <div className="bid-now-button">
                        <button className="bid-button">
                        <Link>Bid Now</Link>
                        </button>
                    </div>
                    <div className="favorite-button">
                    <i class="fa-regular fa-heart"></i>
                    </div>
                    </div>
                    <Link className="wrap-auction-detail">
                    <div className="auction-name-price">
                        <div className="auction-name">
                            <span>History</span>
                        </div>
                        <div className="space-between">
                            <div className="auction-category">
                                <p>Books</p>
                            </div>
                        <div className="auction-price">
                        <p>Starting Bid: 2000</p>
                        </div>
                        </div>
                    </div>
                    </Link>
                </div>
                <div className="auction-items auction-items-smaller">
                    <div className="auction-image small-img-auction">
                        <img src="images/productimage9.jpg"/>
                        <div className="auction-time">
                        <div className="auction-time-items">
                            <div className="countdown-box">
                            <span className="countdown-time">
                                <span className="auction-timer">
                                    <span>{timerDays}</span>
                                    <span className="auction-date">Days</span>
                                </span>
                                <span className="auction-timer">
                                <span>{timerHours}</span>
                                <span className="auction-date">Hours</span>
                                </span>
                                <span className="auction-timer">
                                <span>{timerMinutes}</span>
                                <span className="auction-date">Minutes</span>
                                </span>
                                <span className="auction-timer">
                                <span>{timerSeconds}</span>
                                <span className="auction-date">Seconds</span>
                                </span>
                            </span>
                            </div>
                        </div>
                    </div>
                    <div className="bid-now-button">
                        <button className="bid-button">
                        <Link>Bid Now</Link>
                        </button>
                    </div>
                    <div className="favorite-button">
                    <i class="fa-regular fa-heart"></i>
                    </div>
                    </div>
                    <Link className="wrap-auction-detail">
                    <div className="auction-name-price">
                        <div className="auction-name">
                            <span>History</span>
                        </div>
                        <div className="space-between">
                            <div className="auction-category">
                                <p>Books</p>
                            </div>
                        <div className="auction-price">
                        <p>Starting Bid: 2000</p>
                        </div>
                        </div>
                    </div>
                    </Link>
                </div>
                <div className="auction-items auction-items-smaller">
                    <div className="auction-image small-img-auction">
                        <img src="images/productimage9.jpg"/>
                        <div className="auction-time">
                        <div className="auction-time-items">
                            <div className="countdown-box">
                            <span className="countdown-time">
                                <span className="auction-timer">
                                    <span>{timerDays}</span>
                                    <span className="auction-date">Days</span>
                                </span>
                                <span className="auction-timer">
                                <span>{timerHours}</span>
                                <span className="auction-date">Hours</span>
                                </span>
                                <span className="auction-timer">
                                <span>{timerMinutes}</span>
                                <span className="auction-date">Minutes</span>
                                </span>
                                <span className="auction-timer">
                                <span>{timerSeconds}</span>
                                <span className="auction-date">Seconds</span>
                                </span>
                            </span>
                            </div>
                        </div>
                    </div>
                    <div className="bid-now-button">
                        <button className="bid-button">
                        <Link>Bid Now</Link>
                        </button>
                    </div>
                    <div className="favorite-button">
                    <i class="fa-regular fa-heart"></i>
                    </div>
                    </div>
                    <Link className="wrap-auction-detail">
                    <div className="auction-name-price">
                        <div className="auction-name">
                            <span>History</span>
                        </div>
                        <div className="space-between">
                            <div className="auction-category">
                                <p>Books</p>
                            </div>
                        <div className="auction-price">
                        <p>Starting Bid: 2000</p>
                        </div>
                        </div>
                    </div>
                    </Link>
                </div>
                <div className="auction-items auction-items-smaller">
                    <div className="auction-image small-img-auction">
                        <img src="images/productimage9.jpg"/>
                        <div className="auction-time">
                        <div className="auction-time-items">
                            <div className="countdown-box">
                            <span className="countdown-time">
                                <span className="auction-timer">
                                    <span>{timerDays}</span>
                                    <span className="auction-date">Days</span>
                                </span>
                                <span className="auction-timer">
                                <span>{timerHours}</span>
                                <span className="auction-date">Hours</span>
                                </span>
                                <span className="auction-timer">
                                <span>{timerMinutes}</span>
                                <span className="auction-date">Minutes</span>
                                </span>
                                <span className="auction-timer">
                                <span>{timerSeconds}</span>
                                <span className="auction-date">Seconds</span>
                                </span>
                            </span>
                            </div>
                        </div>
                    </div>
                    <div className="bid-now-button">
                        <button className="bid-button">
                        <Link>Bid Now</Link>
                        </button>
                    </div>
                    <div className="favorite-button">
                    <i class="fa-regular fa-heart"></i>
                    </div>
                    </div>
                    <Link className="wrap-auction-detail">
                    <div className="auction-name-price">
                        <div className="auction-name">
                            <span>History</span>
                        </div>
                        <div className="space-between">
                            <div className="auction-category">
                                <p>Books</p>
                            </div>
                        <div className="auction-price">
                        <p>Starting Bid: 2000</p>
                        </div>
                        </div>
                    </div>
                    </Link>
                </div>
                <div className="auction-items auction-items-smaller">
                    <div className="auction-image small-img-auction">
                        <img src="images/productimage9.jpg"/>
                        <div className="auction-time">
                        <div className="auction-time-items">
                            <div className="countdown-box">
                            <span className="countdown-time">
                                <span className="auction-timer">
                                    <span>{timerDays}</span>
                                    <span className="auction-date">Days</span>
                                </span>
                                <span className="auction-timer">
                                <span>{timerHours}</span>
                                <span className="auction-date">Hours</span>
                                </span>
                                <span className="auction-timer">
                                <span>{timerMinutes}</span>
                                <span className="auction-date">Minutes</span>
                                </span>
                                <span className="auction-timer">
                                <span>{timerSeconds}</span>
                                <span className="auction-date">Seconds</span>
                                </span>
                            </span>
                            </div>
                        </div>
                    </div>
                    <div className="bid-now-button">
                        <button className="bid-button">
                        <Link>Bid Now</Link>
                        </button>
                    </div>
                    <div className="favorite-button">
                    <i class="fa-regular fa-heart"></i>
                    </div>
                    </div>
                    <Link className="wrap-auction-detail">
                    <div className="auction-name-price">
                        <div className="auction-name">
                            <span>History</span>
                        </div>
                        <div className="space-between">
                            <div className="auction-category">
                                <p>Books</p>
                            </div>
                        <div className="auction-price">
                        <p>Starting Bid: 2000</p>
                        </div>
                        </div>
                    </div>
                    </Link>
                </div>
                <div className="auction-items auction-items-smaller">
                    <div className="auction-image small-img-auction">
                        <img src="images/productimage9.jpg"/>
                        <div className="auction-time">
                        <div className="auction-time-items">
                            <div className="countdown-box">
                            <span className="countdown-time">
                                <span className="auction-timer">
                                    <span>{timerDays}</span>
                                    <span className="auction-date">Days</span>
                                </span>
                                <span className="auction-timer">
                                <span>{timerHours}</span>
                                <span className="auction-date">Hours</span>
                                </span>
                                <span className="auction-timer">
                                <span>{timerMinutes}</span>
                                <span className="auction-date">Minutes</span>
                                </span>
                                <span className="auction-timer">
                                <span>{timerSeconds}</span>
                                <span className="auction-date">Seconds</span>
                                </span>
                            </span>
                            </div>
                        </div>
                    </div>
                    <div className="bid-now-button">
                        <button className="bid-button">
                        <Link>Bid Now</Link>
                        </button>
                    </div>
                    <div className="favorite-button">
                    <i class="fa-regular fa-heart"></i>
                    </div>
                    </div>
                    <Link className="wrap-auction-detail">
                    <div className="auction-name-price">
                        <div className="auction-name">
                            <span>History</span>
                        </div>
                        <div className="space-between">
                            <div className="auction-category">
                                <p>Books</p>
                            </div>
                        <div className="auction-price">
                        <p>Starting Bid: 2000</p>
                        </div>
                        </div>
                    </div>
                    </Link>
                </div>
                    </div>
                    </div>
                    <div className="container auction-1440">
                <div className="by-hand-container">
                    <h2 className="font-title-homepage">Best Reviewed User</h2>
                </div>
                <div className="row">
                    <div className="user-container">
                    <div className="user-content">
                        <Link className="user-name">Markus Pham</Link>
                        <div className="user-rating">
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star-half"></i>
                        </div>
                        <p>Vietnam</p>
                    </div>
                    <div className="user-image">
                        <Link>
                        <img src="images/team-7-96x96.jpg" alt="User Image" />
                        </Link>
                    </div>
                    <div className="user-absolute">
                        <Link className="user-button"><i class="fa-solid fa-arrow-right"></i></Link>
                    </div>
                    </div>
                    <div className="user-container">
                    <div className="user-content">
                        <Link className="user-name">Markus Pham</Link>
                        <div className="user-rating">
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star-half"></i>
                        </div>
                        <p>Vietnam</p>
                    </div>
                    <div className="user-image">
                        <Link>
                        <img src="images/team-7-96x96.jpg" alt="User Image" />
                        </Link>
                    </div>
                    <div className="user-absolute">
                        <Link className="user-button"><i class="fa-solid fa-arrow-right"></i></Link>
                    </div>
                    </div>
                    <div className="user-container">
                    <div className="user-content">
                        <Link className="user-name">Markus Pham</Link>
                        <div className="user-rating">
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star-half"></i>
                        </div>
                        <p>Vietnam</p>
                    </div>
                    <div className="user-image">
                        <Link>
                        <img src="images/team-7-96x96.jpg" alt="User Image" />
                        </Link>
                    </div>
                    <div className="user-absolute">
                        <Link className="user-button"><i class="fa-solid fa-arrow-right"></i></Link>
                    </div>
                    </div>
                    <div className="user-container">
                    <div className="user-content">
                        <Link className="user-name">Markus Pham</Link>
                        <div className="user-rating">
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star-half"></i>
                        </div>
                        <p>Vietnam</p>
                    </div>
                    <div className="user-image">
                        <Link>
                        <img src="images/team-7-96x96.jpg" alt="User Image" />
                        </Link>
                    </div>
                    <div className="user-absolute">
                        <Link className="user-button"><i class="fa-solid fa-arrow-right"></i></Link>
                    </div>
                    </div>
                    <div className="user-container">
                    <div className="user-content">
                        <Link className="user-name">Markus Pham</Link>
                        <div className="user-rating">
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star-half"></i>
                        </div>
                        <p>Vietnam</p>
                    </div>
                    <div className="user-image">
                        <Link>
                        <img src="images/team-7-96x96.jpg" alt="User Image" />
                        </Link>
                    </div>
                    <div className="user-absolute">
                        <Link className="user-button"><i class="fa-solid fa-arrow-right"></i></Link>
                    </div>
                    </div>
                    <div className="user-container">
                    <div className="user-content">
                        <Link className="user-name">Markus Pham</Link>
                        <div className="user-rating">
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star-half"></i>
                        </div>
                        <p>Vietnam</p>
                    </div>
                    <div className="user-image">
                        <Link>
                        <img src="images/team-7-96x96.jpg" alt="User Image" />
                        </Link>
                    </div>
                    <div className="user-absolute">
                        <Link className="user-button"><i class="fa-solid fa-arrow-right"></i></Link>
                    </div>
                    </div>
                </div>
            </div>

            <div className="social-panel-button">
                    <Link className="social-panel-button-button">
                    <i class="fa-brands fa-facebook"></i>
                    <span className="social-panel-button-desc">View Facebook</span>
                    </Link>
                    <Link className="social-panel-button-button">
                    <i class="fa-brands fa-twitter"></i>
                    <span className="social-panel-button-desc">View Twitter</span>
                    </Link>
                    <Link className="social-panel-button-button">
                    <i class="fa-brands fa-instagram"></i>
                    <span className="social-panel-button-desc">View Instagram</span>
                    </Link>
            </div>
            </div>
    );
}

export default Home;