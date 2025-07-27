import React from "react";
import PropTypes from "prop-types";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const ServiceCard = ({
  title,
  description,
  icon: Icon,
  path,
  gradient,
  isChat = false,
}) => {
  const handleClick = (e) => {
    if (isChat) {
      e.preventDefault();
      document.dispatchEvent(new CustomEvent("toggleChat"));
    }
  };

  const CardContent = (
    <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-200 hover:border-teal-200 h-full">
      {/* Gradient Background */}
      <div
        className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
      />

      <div className="relative p-8 h-full flex flex-col">
        {/* Icon */}
        <div
          className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200`}
        >
          <Icon className="h-8 w-8 text-white" />
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col">
          <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-teal-700 transition-colors">
            {title}
          </h3>
          <p className="text-slate-600 leading-relaxed mb-6 flex-1">
            {description}
          </p>

          {/* Action */}
          <div className="flex items-center text-teal-600 font-semibold group-hover:text-teal-700 transition-colors">
            <span className="mr-2">
              {isChat ? "Start Chat" : "Get Started"}
            </span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>

      {/* Hover Effect */}
      <div className="absolute inset-0 ring-2 ring-teal-500 ring-opacity-0 group-hover:ring-opacity-20 rounded-2xl transition-all duration-300" />
    </div>
  );

  if (isChat) {
    return (
      <div onClick={handleClick} className="cursor-pointer">
        {CardContent}
      </div>
    );
  }

  return (
    <Link to={path} className="block h-full">
      {CardContent}
    </Link>
  );
};

ServiceCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
  path: PropTypes.string.isRequired,
  gradient: PropTypes.string.isRequired,
  isChat: PropTypes.bool,
};

export default ServiceCard;
