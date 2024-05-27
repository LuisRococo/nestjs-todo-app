import React, { FC } from "react";
import styles from "./ReturnSection.module.scss";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import Link from "next/link";

interface Props {
  url?: string;
}

const ReturnSection: FC<Props> = ({ url }) => {
  url ??= "/";

  return (
    <Link href={url}>
      <div className={styles["return-sec"]}>
        <FaRegArrowAltCircleLeft className="tw-text-2xl tw-text-blue-500 tw-mr-2" />
        <p className="tw-text-slate-400">Go back to Tasks</p>
      </div>
    </Link>
  );
};

export default ReturnSection;
