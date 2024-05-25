import React from "react";
import loadingGif from "../images/loading.gif";
import Image from "next/image";

const Loading = () => {
  return (
    <div className="tw-flex tw-flex-col tw-items-center tw-py-20">
      <Image src={loadingGif} width={50} height={50} alt="loading gif" />
      <p className="tw-text-sm tw-text-slate-400 tw-mt-2">loading...</p>
    </div>
  );
};

export default Loading;
