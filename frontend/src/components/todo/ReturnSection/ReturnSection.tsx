"use client";

import React, { FC } from "react";
import styles from "./ReturnSection.module.scss";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface Props {
  text?: string;
  url?: string;
}

/**
 * Return/navigate to other url component.
 */
const ReturnSection: FC<Props> = ({ text, url }) => {
  const { push, back } = useRouter();
  text ??= "Go back";

  const handleOnClick = () => {
    if (url) {
      push(url);
    } else {
      back();
    }
  };

  return (
    <div className={styles["return-sec"]} onClick={handleOnClick}>
      <FaRegArrowAltCircleLeft className="tw-text-2xl tw-text-blue-500 tw-mr-2" />
      <p className="tw-text-slate-400" data-testid="rc-text">
        {text}
      </p>
    </div>
  );
};

export default ReturnSection;
