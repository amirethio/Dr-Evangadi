import React, { useState, useEffect } from "react";
import { CheckCircle, AlertTriangle, TrendingUp, Download } from "lucide-react";
import Button from "./ui/Button";

const ResultCard = ({ title, riskLevel, probability, icon: Icon }) => {
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [animatedPercent, setAnimatedPercent] = useState(0);

  useEffect(() => {
    let progress = 0;
    const interval = setInterval(() => {
      if (progress >= probability) {
        clearInterval(interval);
      } else {
        progress += 1;
        setAnimatedPercent(progress);
      }
    }, 20);
    return () => clearInterval(interval);
  }, [probability]);

  const downloadHealthReport = async () => {
    const reportData = {
      // Pass current card’s data dynamically
      title, // e.g. "Diabetes"
      riskLevel, // e.g. "High"
      probability, // e.g. 82
    };

    try {
      const response = await fetch(
        "https://oxzkw45j0a.execute-api.us-east-1.amazonaws.com/download-report",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reportData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to generate report");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `dr-evangadi-${title.toLowerCase()}-report.html`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download failed", err);
    }
  };

  const riskColors = {
    Low: {
      text: "text-green-700",
      circle: "stroke-green-500",
      icon: CheckCircle,
    },
    Medium: {
      text: "text-yellow-700",
      circle: "stroke-yellow-500",
      icon: AlertTriangle,
    },
    High: {
      text: "text-red-700",
      circle: "stroke-red-500",
      icon: TrendingUp,
    },
  };
  const suggestionsByRiskLevel = {
    Low: "You are at low risk. Maintain your current healthy habits such as balanced diet, exercise, and regular checkups.",
    Medium:
      "You are at moderate risk. Consider making lifestyle changes such as improving your diet, increasing activity, and consulting with a healthcare provider.",
    High: "You are at high risk. It’s recommended to schedule a consultation with a medical professional as soon as possible for further evaluation.",
  };

  const RiskIcon = riskColors[riskLevel].icon;

  const predictions = {
    result: { title },
    risklevl: { riskLevel },
  };

  return (
    <div className="bg-white border rounded-2xl p-6 shadow-xl flex flex-col items-center animate-in slide-in-from-right-4 duration-500">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-4 w-full">
        <div className="bg-gradient-to-r from-orange-500 to-blue-500 w-10 h-10 rounded-full flex items-center justify-center">
          <Icon className="text-white h-5 w-5" />
        </div>
        <h3 className="text-lg font-bold text-slate-800">{title}</h3>
        <div className="ml-auto">
          <RiskIcon className={`h-5 w-5 ${riskColors[riskLevel].text}`} />
        </div>
      </div>
      {/* Probability + Risk Level */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-around mb-6 w-full">
        {/* Probability Circle */}
        <div className="relative w-32 h-32 mx-auto md:mx-0">
          <svg
            className="absolute top-0 left-0 w-full h-full"
            viewBox="0 0 36 36"
          >
            <path
              className="text-slate-200"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              className={riskColors[riskLevel].circle}
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              strokeDasharray={`${animatedPercent}, 100`}
              strokeLinecap="round"
              strokeWidth="2"
            />
          </svg>
          <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
            <div className="text-3xl font-bold text-slate-800">
              {animatedPercent}%
            </div>
            <div className="text-sm text-slate-500">Probability</div>
          </div>
        </div>

        {/* Risk Level */}
        <div className="text-center md:text-left mt-4 md:mt-0">
          <p className="text-sm text-slate-600">Risk Level:</p>
          <p className={`text-lg font-semibold ${riskColors[riskLevel].text}`}>
            {riskLevel}
          </p>
        </div>
      </div>
      {/* Download Button */}
      <Button
        onClick={downloadHealthReport}
        className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-medium py-2 mb-4"
      >
        <Download className="h-4 w-4 mr-2" />
        Download Result
      </Button>
      {/* View Suggestion Button */}
      <Button
        onClick={() => setShowSuggestion(true)}
        className="w-full bg-gradient-to-r from-orange-500 to-blue-500 hover:from-orange-600 hover:to-blue-600 text-white rounded-xl font-semibold py-3"
      >
        View Suggestion
      </Button>
      {showSuggestion && (
        <div className="mt-6 w-full bg-blue-50 border border-blue-300 rounded-xl p-4 shadow">
          <h4 className="text-sm font-semibold text-blue-700 mb-2">
            Suggested Action:
          </h4>
          <p className="text-sm text-blue-600">
            {suggestionsByRiskLevel[riskLevel]}
          </p>
        </div>
      )}
      {/* Disclaimer */}
      <div className="mt-6 w-full rounded-xl bg-red-100 border border-red-400 p-4 flex items-start space-x-3 shadow-lg">
        <div className="flex-shrink-0">
          <AlertTriangle className="h-6 w-6 text-red-600 mt-0.5" />
        </div>
        <div>
          <p className="text-sm text-red-700 font-bold uppercase tracking-wide">
            Important
          </p>
          <p className="text-xs text-red-600">
            AI predictions may make mistake. Consult a medical professional for
            confirmation.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
