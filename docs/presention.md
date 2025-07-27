# Dr. Evangadi: AI Health Prediction System Using AWS

## Project Description

Dr. Evangadi is a full-stack AI health prediction system built entirely on AWS. It predicts conditions such as diabetes and heart disease using machine learning models trained with Amazon SageMaker on real-world health datasets. The app features a user-facing React frontend hosted on **Amazon S3**, which interacts with a **FastAPI backend deployed on Amazon EC2**. Requests are routed through **Amazon API Gateway** (if possible )for scalability and control. All datasets and model artifacts are stored in **Amazon S3**, and SageMaker notebooks are used for data cleaning, exploration, and training. The system also integrates with **Lax**, a suggestion engine, to offer health tips based on prediction results. This architecture demonstrates secure, production-style ML deployment using AWS Free Tier services.

---










## Architecture Diagram
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
  |   Trained Model Stored    | <----- Amazon S3   |   Health Suggestions (Lex) | 
  +--------------------------+                     +----------------------------+
            ^
            |
+-----------+-----------+               
|  - Clean & Train Model | <----- Amazon SageMaker
+-----------+-----------+
            |
   +--------v--------------+                    
   |   Raw Dataset Stored   | <----- Amazon S3
   +-----------------------+
```
//things to add while deploying 
containerization 
autoscaling group load balancer 
