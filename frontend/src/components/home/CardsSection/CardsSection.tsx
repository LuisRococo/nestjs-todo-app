import { Container } from "@mui/material";
import React from "react";
import InfoCard from "./InfoCard";
import { FaHeart, FaStar, FaUserCircle } from "react-icons/fa";

const CardsSection = () => {
  return (
    <div className="tw-bg-blue-500 tw-p-20">
      <Container maxWidth="xl">
        <h3 className="tw-text-white tw-font-bold tw-text-3xl tw-text-center">
          Surprises are waiting for you !
        </h3>

        <div className="tw-mt-10 tw-flex tw-gap-4 tw-justify-center">
          <InfoCard
            title="Feature #1"
            description={
              "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laudantium, iste."
            }
            Icon={FaStar}
            color="#eb4034"
          />
          <InfoCard
            title="Feature #2"
            description={
              "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laudantium, iste."
            }
            Icon={FaUserCircle}
            color="#f0ab16"
          />
          <InfoCard
            title="Feature #3"
            description={
              "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laudantium, iste."
            }
            Icon={FaHeart}
            color="#d716f0"
          />
        </div>
      </Container>
    </div>
  );
};

export default CardsSection;
