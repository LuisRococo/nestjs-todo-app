import Image from "next/image";
import React from "react";
import TodoImage from "@/images/undraw-todo-girl.svg";
import { Container } from "@mui/material";

const InfoSection = () => {
  return (
    <Container maxWidth="xl">
      <div className="tw-grid-cols-2 tw-grid tw-gap-5 tw-py-20">
        <div>
          <h3 className="tw-font-bold tw-text-4xl tw-mb-6 tw-text-blue-500">
            All you wish is here!
          </h3>
          <p className="tw-font-normal tw-text-md">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Perferendis quisquam aliquid similique corporis inventore aliquam
            ipsum esse earum adipisci vel sit quibusdam officiis odio quo
            praesentium sint, commodi quas itaque.
          </p>
        </div>

        <Image
          src={TodoImage}
          width={500}
          height={500}
          style={{ width: "90%" }}
          alt="Todo image"
        />
      </div>
    </Container>
  );
};

export default InfoSection;
