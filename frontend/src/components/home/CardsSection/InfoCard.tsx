import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import React, { FC } from "react";
import { IconType } from "react-icons";
import styles from "./styles.module.scss";

interface Props {
  color: string;
  Icon: IconType;
  title: string;
  description: string;
}

const InfoCard: FC<Props> = ({ color, description, Icon, title }) => {
  return (
    <Card sx={{ maxWidth: 345 }} className={styles.card}>
      <CardActionArea>
        <div className="tw-pt-7 tw-flex tw-justify-center">
          <div
            className={styles["card__icon-cont"]}
            style={{ backgroundColor: color }}
          >
            <Icon />
          </div>
        </div>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default InfoCard;
