import React from "react";
import { AlertCircle } from "lucide-react";

const FormField = ({
  label,
  type,
  value,
  onChange,
  error,
  placeholder,
  helperText,
  required = false,
  options = [],
  rows = 4,
}) => {
  const inputId = `field-${label.toLowerCase().replace(/\s+/g, "-")}`;

  const baseInputClasses = `
    w-full px-4 py-3 border-2 rounded-lg transition-all duration-200 
    focus:outline-none focus:ring-2 focus:ring-offset-2 
    ${
      error
        ? "border-red-300 focus:border-red-500 focus:ring-red-200"
        : "border-slate-300 focus:border-orange-500 focus:ring-orange-200"
    }
    ${value ? "bg-white" : "bg-slate-50"}
    text-slate-800 placeholder-slate-400
  `;

  const renderInput = () => {
    switch (type) {
      case "select":
        return (
          <select
            id={inputId}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={baseInputClasses}
            required={required}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      case "textarea":
        return (
          <textarea
            id={inputId}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className={baseInputClasses}
            rows={rows}
            required={required}
          />
        );
      default:
        return (
          <input
            id={inputId}
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className={baseInputClasses}
            required={required}
          />
        );
    }
  };

  return (
    <div className="space-y-2">
      <label
        htmlFor={inputId}
        className="block text-sm font-semibold text-slate-700"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {renderInput()}

      {helperText && !error && (
        <p className="text-sm text-slate-500 flex items-center">
          <span className="mr-1">💡</span>
          {helperText}
        </p>
      )}

      {error && (
        <p className="text-sm text-red-600 flex items-center animate-in slide-in-from-left-1 duration-200">
          <AlertCircle className="h-4 w-4 mr-1" />
          {error}
        </p>
      )}
    </div>
  );
};

export default FormField;
