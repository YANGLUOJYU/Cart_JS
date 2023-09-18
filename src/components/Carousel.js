import React from "react";
import 'bootstrap/dist/js/bootstrap.min.js';
export default function MyCarousel() {
    return (
        <div >
            <div id="carouselExampleIndicators" className="carousel slide border-0">
                <div className="carousel-indicators">
                    <button
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide-to="0"
                        className="active"
                        aria-current="true"
                        aria-label="Slide 1"
                    ></button>
                    <button
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide-to="1"
                        aria-label="Slide 2"
                    ></button>
                    <button
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide-to="2"
                        aria-label="Slide 3"
                    ></button>
                    <button
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide-to="3"
                        aria-label="Slide 4"
                    ></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src="./feed.jpg" className="d-block w-100" alt="banner 1" height="550px"/>
                    </div>
                    <div className="carousel-item">
                        <img src="./pet.jpg" className="d-block w-100" alt="banner 2" height="550px"/>
                    </div>
                    <div className="carousel-item">
                        <img src="./terrarium.jpg" className="d-block w-100" alt="banner 3" height="550px"/>
                    </div>
                    <div className="carousel-item">
                        <img src="./pet2.jpg" className="d-block w-100" alt="banner 4" height="550px"/>
                    </div>
                </div>
                <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide="prev"
                >
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide="next"
                >
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>

        </div>
    );
}
