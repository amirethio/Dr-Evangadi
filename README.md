# 🩺 Dr-Evangadi — Chronic Disease Risk Prediction System

**Dr-Evangadi** is an AI-powered health assistant that predicts the risk level for multiple chronic diseases (Diabetes, Heart Disease,lung Cancer) using minimal patient data. Built with AWS SageMaker for training and deployed using EC2 for accessibility.

---
![Uploading image.png…]()

---

## 🚀 Features
- Predict risk level: Low / Moderate / High
- Confidence score with each result
- Covers 3 diseases: Diabetes, Heart Disease, lung Cancer
- Trained using real datasets on AWS SageMaker
- FastAPI-based backend for real-time prediction
- Optional chatbot integration using AWS Lex

---

## 📊 Datasets Used
| Disease       | Dataset                                      |
|---------------|----------------------------------------------|
| Diabetes      | Pima Indians Diabetes Dataset (Kaggle)       |
| Heart Disease | Heart Failure Prediction Dataset (Kaggle)    |
| lung Cancer   |   |

---

## 🛠 Tech Stack
- Python, Pandas, Scikit-learn, XGBoost
- AWS SageMaker, S3, EC2 , lamda , 
- FastAPI
- (Optional) AWS Lex for chatbot support

---

## 📁 Project Structure
```
Dr-Evangadi/
├── dataset/
├── notebooks/
├── model/
├── api/
├── deployment/
├── docs/
└── requirements.txt
```

---

## 📌 How to Run (Local Dev)
```bash
# Create virtual environment
python3 -m venv venv
source venv/bin/activate   # On Linux/macOS
venv\Scripts\activate      # On Windows

# Install dependencies
pip install -r requirements.txt

# Run FastAPI app (after it's ready)
uvicorn api.main:app --reload
```

---

## 👨‍⚕ Disclaimer
This tool is for educational/demo purposes only and does not replace professional medical advice.
Sure! Here's your **final, polished, copy-paste-ready `README.md`** for the **Dr-Evangadi** GitHub project — complete with improvements like badges, clearer descriptions, and added best practices:

---

# 🩺 Dr-Evangadi — AI-Powered Chronic Disease Risk Predictor



**Dr-Evangadi** is a cloud-based AI health assistant that predicts chronic disease risks from user input or medical images. It provides fast, real-time predictions for **Diabetes, Heart Disease, Breast Cancer**, and **Lung Cancer (via X-ray)** — powered by machine learning models trained on AWS SageMaker and deployed with EC2, Lambda, and FastAPI.

---

## 🚀 Key Features

- ✅ **Risk Prediction**: Classifies risk as **Low / Moderate / High**
- 📊 **Confidence Score**: Returns model certainty with each result
- 🧠 **Covers 3 Diseases**:
  - Diabetes (clinical data)
  - Heart Disease (clinical data)
  - Lung Cancer (X-ray images)
- ⚙️ **End-to-End AWS Architecture**: SageMaker, S3, EC2, Lambda, Lex
- ⚡ **FastAPI Backend** for scalable inference
- 📄 **PDF Health Report** generated with HTML template on Lambda
- 🤖 **Optional Chatbot** using Amazon Lex

---

## 📊 Datasets Used

| Disease       | Dataset Source                                  |
|---------------|-------------------------------------------------|
| Diabetes      | Pima Indians Diabetes Dataset (Kaggle)          |
| Heart Disease | Heart Failure Prediction Dataset (Kaggle)       |
| Lung Cancer   | Custom Chest X-ray Dataset (Manually Annotated) |

---

## 🛠 Tech Stack

**Languages & Libraries**:
- Python (Scikit-learn, XGBoost, PyTorch, Pandas, FPDF, Jinja2)
- React (JavaScript) frontend (optional)
- WeasyPrint (for styled PDF generation)

**AWS Services**:
- **SageMaker**: Training & evaluation of ML models
- **S3**: Dataset & frontend hosting
- **EC2**: Model inference with FastAPI
- **API Gateway**: Routing to backend
- **Lambda**: Serverless PDF generation
- **DynamoDB**: Logs predictions for analytics
- **Lex**: Optional chatbot interaction
- **IAM & CloudWatch**: Role-based access and monitoring

---

## 📁 Project Structure

```

Dr-Evangadi/
├── api/               # FastAPI backend
│   └── main.py
├── model/             # Saved model files (.pkl, .pt)
├── notebooks/         # Jupyter notebooks for training
├── dataset/           # Raw and preprocessed data
├── deployment/        # Scripts for EC2, Lambda deployment
├── docs/              # Architecture diagrams, reports
├── frontend/          # Optional React-based frontend
├── templates/         # PDF templates (HTML/CSS)
├── utils/             # Helper functions (preprocessing, PDF, etc.)
├── requirements.txt   # Python dependencies
└── README.md          # Project overview

````

---

## 🧪 Local Development Guide

```bash
# 1. Clone repo and set up env
git clone https://github.com/your-username/Dr-Evangadi.git
cd Dr-Evangadi
python3 -m venv venv
source venv/bin/activate      # or venv\Scripts\activate (Windows)

# 2. Install dependencies
pip install -r requirements.txt

# 3. Run FastAPI backend
uvicorn api.main:app --reload

# Optional: Test frontend or chatbot separately
````

---

## 🧾 Sample Output

* 🧠 Prediction: `Heart Disease — Moderate Risk`
* 📈 Confidence: `0.76`
* 📄 PDF Report: Generated dynamically with patient name, result summary, and branding

---

## 📦 Deployment Architecture

```
            ┌──────────────────────┐
            │     React Frontend   │  
            └────────┬─────────────┘
                     │
        ┌────────────▼─────────────┐
        │     AWS API Gateway      │
        └────────┬────────────┬────┘
                 │            │
        ┌────────▼───┐   ┌────▼────────┐
        │   EC2 (API)│   │Lambda (PDF) │
        └────┬───────┘   └────┬────────┘
             │                │
   ┌─────────▼───────┐   ┌────▼────────┐
   │ ML Models (local│   │ HTML+CSS PDF│
   │  or SageMaker)  │   └─────────────┘
   └────────┬────────┘
            │
     ┌──────▼───────┐
     │ DynamoDB     │ ←─ Logs predictions
     └──────────────┘
```

---

## 💬 Example Chatbot Interaction (via Lex)

> **User**: "I tested positive for diabetes. What should I do?"
> **Bot**: "Stay calm. Our system suggests you maintain a healthy diet and regular checkups. Contact a doctor for personalized advice."

---

## 🛡️ Disclaimer

This project is for **educational/demo** purposes only. It **does not provide medical advice** or substitute professional diagnosis. Always consult a licensed healthcare provider.

---

## 👨‍🎓 Author

Built by **Amir Ali**

🔗 [https://www.linkedin.com/in/amireth/](#)

---


