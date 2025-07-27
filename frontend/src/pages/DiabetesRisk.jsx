import React, { useState } from "react";
import { Activity } from "lucide-react";
import FormField from "../components/FormField";
import Button from "../components/ui/Button";
import ResultCard from "../components/ResultCard";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { showToast } from "../components/ui/toast";

const DiabetesRisk = () => {
  const [formData, setFormData] = useState({
    pregnancies: "",
    glucose: "",
    blood_pressure: "",
    skin_thickness: "",
    insulin: "",
    bmi: "",
    diabetes_pedigree_function: "",
    age: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("http://3.91.5.76:8000/diabet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pregnancies: Number(formData.pregnancies),
          glucose: Number(formData.glucose),
          blood_pressure: Number(formData.blood_pressure),
          skin_thickness: Number(formData.skin_thickness),
          insulin: Number(formData.insulin),
          bmi: Number(formData.bmi),
          diabetes_pedigree_function: Number(
            formData.diabetes_pedigree_function
          ),
          age: Number(formData.age),
        }),
      });

      if (!response.ok) throw new Error("Server returned an error");

      const data = await response.json();
      setResult({
        label: data.label,
        probability: Math.round(data.probability * 100),
      });

      showToast("Prediction complete!", "success");
    } catch (error) {
      showToast("Failed to get prediction", "error");
      console.error("Prediction error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getRiskLevel = (prob) => {
    if (prob > 70) return "High";
    if (prob > 40) return "Medium";
    return "Low";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 py-12 px-4">
      <div className="max-w-5xl mx-auto grid lg:grid-cols-3 gap-8 items-start">
        <form
          onSubmit={handleSubmit}
          className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-8 space-y-6"
        >
          <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center">
            <img
              src="https://www.evangadi.com/assets/logo-icon-DkBTLmtc.png"
              alt=""
              className="h-12 w-13"
            />
            Diabetes Prediction Form
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.keys(formData).map((key) => (
              <FormField
                key={key}
                label={key
                  .replace(/_/g, " ")
                  .replace(/\b\w/g, (c) => c.toUpperCase())}
                type="number"
                value={formData[key]}
                onChange={(value) => handleChange(key, value)}
                placeholder={`Enter ${key.replace(/_/g, " ")}`}
                required
              />
            ))}
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-orange-600 to-blue-600 hover:from-orange-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg"
          >
            {isLoading ? (
              <>
                <LoadingSpinner className="mr-2" />
                Analyzing...
              </>
            ) : (
              "Predict Diabetes Risk"
            )}
          </Button>
        </form>

        {result && (
          <ResultCard
            title={`Result: ${
              result.label === 1 ? "Diabetic " : "Non-Diabetic "
            }`}
            probability={result.probability}
            riskLevel={getRiskLevel(result.probability)}
            icon={Activity}
          />
        )}
      </div>
    </div>
  );
};

export default DiabetesRisk;
