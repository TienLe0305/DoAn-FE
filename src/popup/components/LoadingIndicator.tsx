import React from "react";
import { useLoading, Puff } from "@agney/react-loading";

const LoadingIndicator = ({ loading }) => {
  const { containerProps, indicatorEl } = useLoading({
    loading,
    indicator: <Puff />,
  });
  if (loading) {
    return (
      <div className="cwa_container-loading">
        <section {...containerProps} className="cwa_indicator-component">
          {indicatorEl}
        </section>
        <p>Loading...</p>
      </div>
    );
  }

  return null;
};

export default LoadingIndicator;
