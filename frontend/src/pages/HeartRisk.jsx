import React, { useState } from "react";
import { Heart } from "lucide-react";
import FormField from "../components/FormField";
import ToggleButtonGroup from "../components/ui/ToggleButtonGroup";
import Button from "../components/ui/Button";
import ResultCard from "../components/ResultCard";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { showToast } from "../components/ui/toast";

const HeartRisk = () => {
  const [formData, setFormData] = useState({
    age: "",
    sex: "",
    cp: "",
    trestbps: "",
    chol: "",
    fbs: "",
    restecg: "",
    thalach: "",
    exang: "",
    oldpeak: "",
    slope: "",
    ca: "",
    thal: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  // Check for empty fields
  for (const [key, value] of Object.entries(formData)) {
    if (value === "" || value === null) {
      showToast(`Please fill in the '${key}' field.`, "error");
      return; // Stop form submission
    }
  }

  setIsLoading(true);

  try {
    const response = await fetch("http://3.91.5.76:8000/heart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        age: Number(formData.age),
        sex: Number(formData.sex),
        cp: Number(formData.cp),
        trestbps: Number(formData.trestbps),
        chol: Number(formData.chol),
        fbs: Number(formData.fbs),
        restecg: Number(formData.restecg),
        thalach: Number(formData.thalach),
        exang: Number(formData.exang),
        oldpeak: Number(formData.oldpeak),
        slope: Number(formData.slope),
        ca: Number(formData.ca),
        thal: Number(formData.thal),
      }),
    });

    if (!response.ok) throw new Error("Server error");

    const data = await response.json();
    setResult({
      label: data.label,
      probability: Math.round(data.probability * 100),
      riskLevel: data.riskLevel,
    });

    showToast("Prediction complete!", "success");
  } catch (error) {
    showToast("Prediction failed.", "error");
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
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 py-12 px-4">
      <div className="max-w-5xl mx-auto grid lg:grid-cols-3 gap-8 items-start">
        <form
          onSubmit={handleSubmit}
          className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-8 space-y-6"
        >
          <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center">
            <img
              src="https://www.evangadi.com/assets/logo-icon-DkBTLmtc.png"
              alt="Logo"
              className="h-12 w-13 mr-3"
            />
            Heart Disease Prediction
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              label="Age"
              type="number"
              value={formData.age}
              onChange={(val) => handleChange("age", val)}
            />
            <ToggleButtonGroup
              label="Gender"
              value={formData.sex}
              onChange={(val) => handleChange("sex", val)}
              options={[
                { value: "1", label: "Male" },
                { value: "0", label: "Female" },
              ]}
            />
            <FormField
              label="Chest Pain Type"
              type="select"
              value={formData.cp}
              onChange={(val) => handleChange("cp", val)}
              options={[
                { value: "", label: "Select" },
                { value: "0", label: "Typical Angina" },
                { value: "1", label: "Atypical Angina" },
                { value: "2", label: "Non-Anginal Pain" },
                { value: "3", label: "Asymptomatic" },
              ]}
            />
            <ToggleButtonGroup
              label="Exercise-Induced Angina"
              value={formData.exang}
              onChange={(val) => handleChange("exang", val)}
              options={[
                { value: "1", label: "Yes" },
                { value: "0", label: "No" },
              ]}
            />
            <FormField
              label="Cholesterol (chol)"
              type="number"
              value={formData.chol}
              onChange={(val) => handleChange("chol", val)}
            />
            <ToggleButtonGroup
              label="Fasting Blood Sugar > 120?"
              value={formData.fbs}
              onChange={(val) => handleChange("fbs", val)}
              options={[
                { value: "1", label: "Yes" },
                { value: "0", label: "No" },
              ]}
            />
            <FormField
              label="Resting ECG Result"
              type="select"
              value={formData.restecg}
              onChange={(val) => handleChange("restecg", val)}
              options={[
                { value: "", label: "Select" },
                { value: "0", label: "Normal" },
                { value: "1", label: "ST-T Abnormality" },
                { value: "2", label: "Left Ventricular Hypertrophy" },
              ]}
            />
            <FormField
              label="Slope of ST Segment"
              type="select"
              value={formData.slope}
              onChange={(val) => handleChange("slope", val)}
              options={[
                { value: "0", label: "Upsloping" },
                { value: "1", label: "Flat" },
                { value: "2", label: "Downsloping" },
              ]}
            />
            <FormField
              label="Max Heart Rate (thalach)"
              type="number"
              value={formData.thalach}
              onChange={(val) => handleChange("thalach", val)}
            />
            <FormField
              label="Resting BP (trestbps)"
              type="number"
              value={formData.trestbps}
              onChange={(val) => handleChange("trestbps", val)}
            />
            <FormField
              label="ST Depression (oldpeak)"
              type="number"
              value={formData.oldpeak}
              onChange={(val) => handleChange("oldpeak", val)}
            />
            <FormField
              label="Number of Major Vessels (ca)"
              type="number"
              value={formData.ca}
              onChange={(val) => handleChange("ca", val)}
            />
            <FormField
              label="Thalassemia Type"
              type="select"
              value={formData.thal}
              onChange={(val) => handleChange("thal", val)}
              options={[
                { value: "", label: "Select" },
                { value: "1", label: "Normal" },
                { value: "2", label: "Fixed Defect" },
                { value: "3", label: "Reversible Defect" },
              ]}
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white py-3 rounded-xl font-semibold shadow-md"
          >
            {isLoading ? (
              <>
                <LoadingSpinner className="mr-2" />
                Analyzing...
              </>
            ) : (
              "Calculate Risk"
            )}
          </Button>
        </form>

        {result && (
          <ResultCard
            title={
              <>
                <span className="block font-bold text-lg">Result:</span>
                <span className="block text-xl">
                  {result.label === 1
                    ? "Positive for heart disease"
                    : "Negative for heart disease"}
                </span>
              </>
            }
            probability={result.probability}
            riskLevel={getRiskLevel(result.probability)}
            icon={Heart}
          />
        )}
      </div>
    </div>
  );
};

export default HeartRisk;
