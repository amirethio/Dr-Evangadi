import React from "react";
import PropTypes from "prop-types";

const Button = ({
  variant = "primary",
  size = "md",
  children,
  className = "",
  as: Component = "button",
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variantClasses = {
    primary:
      "bg-gradient-to-r from-orange-600 to-blue-600 hover:from-orange-700 hover:to-blue-700 text-white focus:ring-orange-500 shadow-lg hover:shadow-xl",
    secondary:
      "bg-slate-100 hover:bg-slate-200 text-slate-800 focus:ring-slate-500",
    outline:
      "border-2 border-slate-300 hover:border-slate-400 text-slate-700 hover:bg-slate-50 focus:ring-slate-500",
    ghost:
      "text-slate-600 hover:text-slate-800 hover:bg-slate-100 focus:ring-slate-500",
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm rounded-lg",
    md: "px-4 py-2 text-base rounded-lg",
    lg: "px-6 py-3 text-lg rounded-xl",
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
};

Button.propTypes = {
  variant: PropTypes.oneOf(["primary", "secondary", "outline", "ghost"]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  as: PropTypes.elementType,
};

export default Button;
