import React, { useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import {
  bannerImgOne,
  bannerImgTwo,
  bannerImgThree,
} from "../../assets/images";
import Image from "../designLayouts/Image";

const Banner = () => {
  const [dotActive, setDotActive] = useState(0); // Fixed typo: setDotActive

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    beforeChange: (current, next) => {
      setDotActive(next);
    },
    appendDots: (dots) => (
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "7%",
          transform: "translateY(-50%)",
        }}
      >
        <ul style={{ margin: "0px" }}> {dots} </ul>
      </div>
    ),
    customPaging: (i) => (
      <div
        style={
          i === dotActive
            ? {
                width: "30px",
                color: "#262626",
                borderRight: "3px #262626 solid",
                padding: "8px 0",
                cursor: "pointer",
              }
            : {
                width: "30px",
                color: "transparent",
                borderRight: "3px white solid",
                padding: "8px 0",
                cursor: "pointer",
              }
        }
      >
        0{i + 1}
      </div>
    ),
    responsive: [
      {
        breakpoint: 576,
        settings: {
          dots: true,
          appendDots: (dots) => (
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "2%",
                transform: "translateY(-50%)",
              }}
            >
              <ul style={{ margin: "0px" }}> {dots} </ul>
            </div>
          ),
          customPaging: (i) => (
            <div
              style={
                i === dotActive
                  ? {
                      width: "25px",
                      color: "#262626",
                      borderRight: "3px #262626 solid",
                      cursor: "pointer",
                      fontSize: "12px",
                    }
                  : {
                      width: "25px",
                      color: "transparent",
                      borderRight: "3px white solid",
                      cursor: "pointer",
                      fontSize: "12px",
                    }
              }
            >
              0{i + 1}
            </div>
          ),
        },
      },
    ],
  };

  return (
    <div className="w-full bg-white">
      {/* 
        Adjust the height of the banner by changing the height class below.
        Example: h-64 (16rem), h-48 (12rem), h-32 (8rem), etc.
      */}
      <div className="relative h-66"> {/* <-- Change h-64 to desired height */}
        <Slider {...settings}>
          {/* Slide 1 */}
          <Link to="/offer">
            <div className="relative h-full">
              <Image imgSrc={bannerImgOne} className="object-cover w-full h-full" />
              {/* Text removed */}
            </div>
          </Link>

          {/* Slide 2 */}
          <Link to="/offer">
            <div className="relative h-full">
              <Image imgSrc={bannerImgTwo} className="object-cover w-full h-full" />
              {/* Text removed */}
            </div>
          </Link>

          {/* Slide 3 */}
          <Link to="/offer">
            <div className="relative h-full">
              <Image imgSrc={bannerImgThree} className="object-cover w-full h-full" />
              {/* Text removed */}
            </div>
          </Link>
        </Slider>
      </div>
    </div>
  );
};

export default Banner;
