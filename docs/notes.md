# 📓 Dr-Evangadi — Development Notes

## ✅ Phase 1 — Planning & Setup

- [x] Finalized project idea
- [x] Chose 3 datasets (diabetes, heart, breast cancer)
- [x] Chose FastAPI and EC2 deployment
- [x] Decided to use virtual environment

---

## ⚠️ Issues & Solutions Log

### ❗ Issue 1: Dataset encoding error when loading CSV
- **Solution:** Used `encoding='utf-8'` in `pandas.read_csv()`

### ❗ Issue 2: Need minimal features per disease
- **Solution:** Selected top 5–7 relevant features based on domain knowledge

---

## 🛠 To Do
- [ ] Clean each dataset (start with Diabetes)
- [ ] Train models on SageMaker
- [ ] Build `/predict` API with FastAPI
- [ ] Deploy to EC2 (Free Tier)
- [ ] Optional: Add Lex chatbot support

### 📌 Using Missing Value Flags to Improve Model Precision

When training our AI model (e.g., for diabetes prediction), we handle invalid or missing medical values like `Glucose = 0` or `Insulin = 0`. These values are replaced with the **median** of their respective columns to avoid dropping valuable data. However, blindly replacing values can cause the model to **overtrust imputed values**, which may reduce prediction precision.

To solve this, we add **binary flags** like `Insulin_missing`, `BMI_missing`, etc., to signal that a value was missing and replaced. These flags help the model:

- Adjust its confidence when using imputed data
- Reduce false positives caused by overfitting to filled values
- Learn to distinguish between "real" and "estimated" inputs

This technique is widely used in healthcare and finance AI systems where data quality varies and precision is critical.

**Impact on Precision:** In many models, this technique improves precision by 3%–10%, especially when key features like `Insulin` are frequently missing or unreliable.

✅ This design also helps maintain transparency and interpretability in predictions.


```
                      +-----------------------------+      
                      |         Frontend (UI)       |  <----- Amazon S3    
                      +-------------+---------------+
                                    |
                                    v
                 +------------------+------------------+    
                 |     API Gateway (Routing Layer)     |   <----- Amazon API Gateway    
                 +------------------+------------------+
                                    |
                                    v
                      +------------+-------------+       
                      |       FastAPI Backend     |  <----- Amazon EC2
                      +------------+-------------+
                                   | 
            +----------------------+----------------------+
            |                                             |
  +---------v----------------+                     +-------------v-------------+    
  |   Trained Model stored    | <--S3              |     Health Suggestions     |    <----- Amazon Bedrock (via Lex)
  +--------------------------+                     +----------------------------+
            ^
            |
+-----------+-----------+               
|  - Clean & Train Mode | <---Amazon SageMake
+-----------+-----------+
            |
   +--------v--------------+                    
   |   Raw Datase stored   |<---S3
   +-----------------------+
```
