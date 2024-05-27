import React from "react";
import { FaImage } from "react-icons/fa";

const NotFoundPage = () => {
  return (
    <div className="tw-pt-20 tw-mt-10 tw-flex tw-items-center tw-flex-col">
      <h1 className="tw-text-6xl tw-font-bold">404</h1>
      <p className="tw-text-lg tw-text-slate-500 tw-mt-5">
        We could not find the resource that you were searching
      </p>

      <FaImage className="tw-inline tw-mt-5 tw-text-6xl tw-text-slate-400" />
    </div>
  );
};

export default NotFoundPage;
