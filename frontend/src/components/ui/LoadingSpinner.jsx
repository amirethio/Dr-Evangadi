import React from "react";
import PropTypes from "prop-types";

const LoadingSpinner = ({ className = "", size = "md" }) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <div className="animate-spin rounded-full border-2 border-current border-t-transparent">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

LoadingSpinner.propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOf(["sm", "md", "lg"]),
};

export default LoadingSpinner;
