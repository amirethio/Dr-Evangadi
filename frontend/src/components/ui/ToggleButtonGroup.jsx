import React from "react";
import PropTypes from "prop-types";

const ToggleButtonGroup = ({ label, value, onChange, options, error }) => {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium text-slate-700 mb-1">{label}</label>
      <div className="flex gap-2 flex-wrap">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`px-4 py-2 text-sm rounded-md border transition-all
              ${
                value === option.value
                  ? "bg-orange-500 text-white border-orange-600"
                  : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"
              }`}
          >
            {option.label}
          </button>
        ))}
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

ToggleButtonGroup.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  error: PropTypes.string,
};

export default ToggleButtonGroup;
