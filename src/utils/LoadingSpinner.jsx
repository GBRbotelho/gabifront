// LoadingSpinner.jsx

import React from "react";
import { useLoading } from "./LoadingContext";
import { ClipLoader } from "react-spinners";
import { css } from "@emotion/react";

const override = css`
  display: block;
  margin: 0 auto;
`;

const LoadingSpinner = () => {
  const { loading } = useLoading();

  return (
    loading && (
      <div className="fixed top-0 left-0 w-full h-full flex items-center bg-white/80 justify-center">
        <ClipLoader
          css={override}
          color={"#36D7B7"}
          loading={loading}
          size={50}
        />
      </div>
    )
  );
};

export default LoadingSpinner;
