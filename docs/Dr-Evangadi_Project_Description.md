# 🩺 Dr. Evangadi: AI Health Prediction System (AWS-Based)

## 📌 Overview

**Dr. Evangadi** is a full-stack AI health prediction system designed to analyze key medical inputs and predict chronic conditions such as **Diabetes**, **Heart Disease**, and potentially **Breast Cancer** using machine learning. The system is built entirely using AWS services under the free tier and integrates real-world ML model training with production-level deployment, both in the cloud and locally.

This solution enables users to manually enter their health data via a web form and receive real-time prediction results along with intelligent health suggestions powered by conversational AI integration (Lax via Amazon Bedrock).

---

## 💡 Features

### ✅ Medical Prediction
- Predicts **Diabetes**, **Heart Disease**, and optionally **Breast Cancer**.
- Uses **real-world datasets** (e.g., Pima Indians Diabetes Dataset).
- Supports multiple disease models (modular structure).

### ✅ Intelligent Assistance
- Integrated with **Lax**, a chat-based AI suggestion system.
- Gives health advice based on prediction result.
- Future support via **Amazon Bedrock** for deeper conversational reasoning.

### ✅ Data Entry & Flexibility
- Accepts **manual user entry** of health-related data (e.g., glucose, BMI, age).
- Handles **missing or invalid values** using intelligent preprocessing.

### ✅ Machine Learning Pipeline
- Cleaned and trained using **Amazon SageMaker Notebook**.
- Replaces invalid medical data (like 0 insulin) using **column medians**.
- Tracks skewness, applies flags for missingness.
- Trains model with **XGBoost**, tuned for precision and recall.

### ✅ Web Application Interface
- **React frontend** hosted on **Amazon S3**.
- **FastAPI backend** deployed on **Amazon EC2**.
- Routed securely through **Amazon API Gateway**.

### ✅ Deployment and Storage
- Datasets and trained models stored in **Amazon S3**.
- Predictions served by FastAPI via REST API.
- Modular backend supports **local or cloud deployment**.

---

