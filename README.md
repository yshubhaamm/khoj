<div align="center">
<img src="https://img.shields.io/badge/Khoj%20AI-Missing%20Person%20Finder-blue?style=for-the-badge&logo=searchengin&logoColor=white" alt="Khoj AI Banner"/>
🔍 Khoj AI
Reuniting Families. Restoring Hope.

An advanced multi-platform AI system for finding missing persons using deep learning face recognition, age progression, and intelligent automation.

<br/>
Show Image
Show Image
Show Image
Show Image
Show Image
Show Image
</div>

📖 Overview
Khoj AI is an advanced multi-platform application designed to assist in finding missing persons and reuniting them with their families. Leveraging state-of-the-art deep learning face recognition, age progression, social handle verification, and AI-powered chatbot technologies, Khoj AI provides a robust and user-friendly solution for authorities, NGOs, and communities.

✨ Features
FeatureDescription🎯 Live Face Detection & RecognitionDetect faces in real-time or from uploaded images and identify individuals with high accuracy using InsightFace models.👴 Age Progression VisualizationGenerate simulated aged versions of input photos to aid the search process over time.🔎 Social Handle Availability CheckerVerify username availability across Twitter, Instagram, and GitHub to aid identity verification and outreach.🤖 Smart Chatbot InterfaceFrontend-embedded interactive assistant trained to answer user queries and support the application workflow.📱 Cross-Platform AccessResponsive React.js web frontend and a Flutter mobile app for seamless accessibility on any device.📊 Statistical Analysis DashboardVisualize and analyze missing person data trends with dynamic, real-time charts.

🧠 Architecture Overview
Khoj AI
├── 🖥️  Backend         → FastAPI + InsightFace (Face Detection, Recognition, Liveness, Social Checks)
├── 🌐  Frontend        → React.js + TypeScript + Tailwind CSS (UI, Chatbot, Analytics, API Integration)
└── 📲  Mobile App      → Flutter (Full Feature Parity with Web Frontend)
Detailed Stack
Backend

FastAPI for high-performance REST APIs
InsightFace models for face detection, recognition, and liveness detection
Social handle availability checks via HTTP scraping/APIs

Frontend

React.js + TypeScript + Tailwind CSS
Embedded AI chatbot interface
Statistical analysis dashboard with dynamic charts
Full integration with all backend APIs

Mobile

Flutter SDK replicating full frontend features for iOS and Android


📦 Dataset
This project uses the Kaggle Face Recognition Dataset containing diverse facial images and metadata such as:

🧑 Age
⚧ Gender
🪪 Identity information

Used for training and validating face recognition models.

🚀 Getting Started
Prerequisites
Make sure you have the following installed:

🐍 Python 3.8+
🟢 Node.js 14+
📲 Flutter SDK (for mobile app)
🔧 Git


🔧 Backend Setup
bash# Clone the repository
git clone https://github.com/your-repo-link.git

# Navigate to backend
cd backend

# Install dependencies
pip install -r requirements.txt

# Start the development server
uvicorn app.main:app --reload

Backend runs at http://localhost:8000 by default.


🌐 Frontend Setup
bash# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev

Frontend runs at http://localhost:3000 by default.


📲 Mobile App Setup
bash# Navigate to mobile
cd mobile

# Get Flutter dependencies
flutter pub get

# Run the app (connect a device or emulator first)
flutter run

🛠️ Usage

🌐 Open the app — Access the frontend via your browser at http://localhost:3000
📸 Face Recognition — Upload images or use your webcam for live face recognition
🔍 Social Handle Check — Verify username availability across major platforms
🤖 Chatbot — Use the embedded chatbot for assistance and FAQs
👴 Age Progression — Upload a photo to generate a simulated aged image
📊 Dashboard — Explore statistical dashboards for insight into missing persons data


🔮 Future Improvements

 🔄 Integration with automated workflow engines (e.g., n8n) for AI model orchestration
 🌍 Multi-language support and accessibility enhancements
 🛡️ Deepfake and spoof detection for enhanced security
 🗄️ Expanded datasets and law enforcement database integration


🤝 Contributing
Contributions are welcome and appreciated! Here's how you can help:

Fork the repository
Create a new branch (git checkout -b feature/your-feature-name)
Commit your changes (git commit -m 'Add: your feature description')
Push to the branch (git push origin feature/your-feature-name)
Open a Pull Request

Please make sure your code follows the existing style and includes appropriate documentation.

📄 License
This project is licensed under the MIT License — see the LICENSE file for details.

🙏 Acknowledgements
ContributorRoleInsightFaceState-of-the-art face AI modelsKaggle Face Recognition DatasetTraining & validation dataShweta Ma'am & Rishit SirTrainers and mentors at Skillify MePerplexity AIResearch assistance

📬 Contact
Have questions or need support?
📧 Email: imshubham1404@gmail.com

<div align="center">
Made with ❤️ to bring families back together
⭐ Star this repo if you find it helpful!
</div>
