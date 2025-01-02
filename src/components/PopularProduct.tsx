"use client";

import dynamic from "next/dynamic";
import { Box, Card, CardContent, Typography } from "@mui/material";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CreditCardIcon from "@mui/icons-material/CreditCard";

const Carousel = dynamic(() => import("react-multi-carousel"), { ssr: false });

import "react-multi-carousel/lib/styles.css";

const CustomCarousel = () => {
  const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  const products = [
    {
      title: "Car Loans",
      description: "Low-interest rates for your dream car.",
      icon: <DirectionsCarIcon fontSize="large" sx={{ color: "#4CAF50" }} />,
    },
    {
      title: "Home Loans",
      description: "Make your dream home a reality.",
      icon: <HomeWorkIcon fontSize="large" sx={{ color: "#FF5722" }} />,
    },
    {
      title: "Investments",
      description: "Grow your wealth with smart plans.",
      icon: <TrendingUpIcon fontSize="large" sx={{ color: "#3F51B5" }} />,
    },
    {
      title: "Credit Cards",
      description: "Enjoy exclusive offers and rewards.",
      icon: <CreditCardIcon fontSize="large" sx={{ color: "#9C27B0" }} />,
    },
  ];

  return (
    <Box
      sx={{
        padding: "48px 16px",
        bgcolor: "linear-gradient(to bottom, #f9f9f9, #ececec)",
        textAlign: "center",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          marginBottom: "24px",
          color: "#333",
        }}
      >
        Popular Products & Services
      </Typography>
      <Carousel
        responsive={responsive}
        infinite
        autoPlay
        autoPlaySpeed={3000}
        keyBoardControl
        containerClass="carousel-container"
        dotListClass="custom-dot-list-style"
      >
        {products.map((product, index) => (
          <Box key={index} sx={{ padding: "16px" }}>
            <Card
              sx={{
                textAlign: "center",
                padding: "24px",
                boxShadow: "0 6px 15px rgba(0, 0, 0, 0.15)",
                borderRadius: "12px",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)",
                },
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    marginBottom: "16px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  {product.icon}
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    marginBottom: "8px",
                    color: "#555",
                  }}
                >
                  {product.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#777",
                    fontSize: "0.9rem",
                  }}
                >
                  {product.description}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Carousel>
    </Box>
  );
};

export default CustomCarousel;
