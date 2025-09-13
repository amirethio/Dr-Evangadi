import React, { useState } from "react";
import { Shield } from "lucide-react";
import Button from "../components/ui/Button";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import ResultCard from "../components/ResultCard";
import { showToast } from "../components/ui/toast";
import axiosInstance from "../API/axiosInstance";
const CancerRisk = () => {
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) {
      showToast("Please upload a medical image", "error");
      return;
    }

    const formData = new FormData();
    formData.append("file", imageFile);
    setIsLoading(true);

    try {
      const response = await axiosInstance.post("/cancer-predict", formData);
      const data = await response.data;
      setResult({
        label: data.label,
        probabilities: data.probabilities,
      });
      showToast("Cancer prediction completed!", "success");
    } catch (error) {
      console.error(error);
      showToast("Error while processing the image", "error");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-purple-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
        {/* Upload Form */}
        <form
          onSubmit={handleSubmit}
          className="lg:col-span-2 bg-white rounded-3xl shadow-xl p-10 space-y-6"
        >
          <div className="flex items-center mb-6">
            <img
              src="https://www.evangadi.com/assets/logo-icon-DkBTLmtc.png"
              alt="Logo"
              className="h-12 w-12 mr-3"
            />
            <h2 className="text-3xl font-extrabold text-slate-800">
              Image-Based Cancer Detection
            </h2>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Upload medical scan/image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border border-slate-300 rounded-lg p-2 bg-white shadow-sm file:mr-4 file:py-2 file:px-4 file:border-0 file:rounded-md file:bg-orange-600 file:text-white file:cursor-pointer hover:file:bg-orange-700 transition"
            />
          </div>

          {previewUrl && (
            <div className="mt-4">
              <p className="text-sm text-slate-600 mb-2">Image Preview:</p>
              <img
                src={previewUrl}
                alt="Preview"
                className="rounded-xl shadow-md max-h-72 mx-auto border border-slate-200"
              />
            </div>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-orange-600 to-purple-600 hover:from-orange-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg"
          >
            {isLoading ? (
              <>
                <LoadingSpinner className="mr-2" /> Analyzing Image...
              </>
            ) : (
              "Upload & Predict"
            )}
          </Button>
        </form>

        {/* Result Card */}
        {result && (
          <div className="lg:col-span-1">
            <ResultCard
              title={`Result: ${result.label}`}
              riskLevel={result.label.includes("Normal") ? "Low" : "High"}
              probability={Math.round(Math.max(...result.probabilities) * 100)}
              explanation="Prediction based on image classification"
              recommendations={[
                "Consult a medical professional for further examination",
                "Consider advanced diagnostic imaging if necessary",
                "Maintain regular health checkups",
              ]}
              icon={Shield}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CancerRisk;
