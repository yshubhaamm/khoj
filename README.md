Khoj AI
Khoj AI is an advanced multi-platform application designed to assist in finding missing persons and reuniting them with their families. Leveraging state-of-the-art deep learning face recognition, age progression, social handle verification, and AI-powered chatbot technologies, Khoj AI provides a robust and user-friendly solution for authorities, NGOs, and communities.

Features
Live Face Detection & Recognition
Detect faces in real-time or from uploaded images and identify individuals with high accuracy.

Age Progression Visualization
Generate simulated aged versions of input photos to aid the search process.

Social Handle Availability Checker
Verify username availability across Twitter, Instagram, and GitHub to aididentity verification and outreach.

Smart Chatbot Interface (Frontend Embedded)
Interactive assistant trained to answer user queries and support the application workflow.

Cross-Platform Access
Responsive React.js web frontend and a Flutter mobile app for seamless accessibility.

Statistical Analysis Dashboard (Frontend)
Visualize and analyze missing person data trends with dynamic charts.

Dataset
This project uses the Kaggle Face Recognition Dataset containing diverse facial images and metadata such as age, gender, and identity information for training and validating face recognition models.

Architecture Overview
Backend:
FastAPI with InsightFace models handling face detection, recognition, liveness detection, and social handle checks.

Frontend:
React.js + TypeScript + Tailwind CSS implementing UI, chatbot, statistical analysis, and integration with backend APIs.

Mobile:
Flutter app replicates frontend features for mobile users.

Getting Started
Prerequisites
Python 3.8+

Node.js 14+

Flutter SDK (for mobile app)

Git

Backend Setup
bash
git clone https://github.com/your-repo-link.git
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
Frontend Setup
bash
cd frontend
npm install
npm run dev
Mobile App Setup
bash
cd mobile
flutter pub get
flutter run
Usage
Access the frontend via your browser (http://localhost:3000 by default).

Upload images or use webcam for live face recognition.

Use the social handle check feature to verify username availability.

Use the chatbot for assistance and FAQs.

Explore age progression via image uploads.

View statistical dashboards for insight into missing persons data.

Future Improvements
Integration with automated workflow engines (e.g., n8n) for AI model orchestration.

Multi-language support and accessibility enhancements.

Deepfake and spoof detection for enhanced security.

Expanded datasets and law enforcement database integration.

Contributing
Contributions are welcome! Please fork the repository and create a pull request with your improvements or fixes.

License
This project is licensed under the MIT License.

Acknowledgements
InsightFace for state-of-the-art AI models.

Kaggle Face Recognition Dataset.

Trainers and mentors at Skillify Me: Shweta Ma’am and Rishit Sir.

Perplexity AI for research assistance.

Contact
For questions or support, please contact [imshubham1404@gmail.com].
