# GenAI for Accessibility in Education Portal

A comprehensive GenAI-powered education platform that converts textbooks and PDFs into accessible formats including audio, simplified summaries, and translations. Designed specifically for students with disabilities and rural learners.

## 🎯 Core Mission

Making education accessible for everyone through AI-powered tools that support:
- Students with dyslexia and learning disabilities
- Visually impaired learners
- Students in rural areas with limited resources
- Non-native language speakers

## ✨ Key Features

### 📚 Content Conversion
- **PDF to Audio**: Convert any textbook/PDF into natural-sounding audio narration
- **Smart Summaries**: AI-generated simplified summaries for complex content
- **Multi-language Support**: Translate content into regional languages
- **OCR Integration**: Process scanned documents and images

### 🔠 Accessibility Features
- **Dyslexic-Friendly Reading**: Special fonts (OpenDyslexic, Lexend)
- **Customizable Display**: Color themes, spacing controls, high contrast modes
- **Text-to-Speech**: Read-along with word highlighting
- **Screen Reader Support**: Full WCAG 2.1 compliance
- **Voice Input**: Ask questions verbally to AI assistant

### 🎮 Interactive Learning
- **AI-Generated Quizzes**: Dynamic questions based on textbook content
- **Educational Games**: Memory games, puzzles, and interactive stories
- **Progress Tracking**: Badges, scores, and learning streaks
- **Personalized Learning**: Adaptive content based on performance

### 👥 Multi-User Support
- **Student Dashboard**: Access books, audio, games, and progress
- **Teacher/Parent Panel**: Upload content, monitor progress, customize learning
- **Admin Interface**: User management, content moderation, analytics

## 🏗️ Technical Architecture

### Frontend
- **React.js** with accessibility-first design
- **WCAG 2.1 AA** compliance
- **Responsive design** for all devices
- **PWA support** for offline access

### Backend
- **FastAPI/Flask** (Python) for robust API development
- **MongoDB/PostgreSQL** for data storage
- **Redis** for caching and session management
- **Celery** for background tasks

### AI Integration
- **OpenAI/Hugging Face** for text summarization and simplification
- **Google Text-to-Speech/Amazon Polly** for audio generation
- **EasyOCR/Tesseract** for document processing
- **Google Translate API** for multi-language support

### Infrastructure
- **Docker** containerization
- **AWS/GCP** cloud deployment
- **CDN** for fast content delivery
- **Load balancing** for scalability

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm
- Python 3.9+
- MongoDB or PostgreSQL
- Redis server

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/accessibility-education-portal.git
   cd accessibility-education-portal
   ```

2. **Set up Backend**
   ```bash
   cd backend
   pip install -r requirements.txt
   cp .env.example .env
   # Configure your environment variables
   python app.py
   ```

3. **Set up Frontend**
   ```bash
   cd frontend
   npm install
   npm start
   ```

## 📱 User Journey

### Student Experience
1. **Registration**: Select language and accessibility preferences
2. **Dashboard**: View available textbooks and games
3. **Study Options**: Choose between audio, visual, or simplified reading
4. **Interactive Learning**: Complete quizzes and games after each chapter
5. **Progress Tracking**: Earn badges and track learning streaks

### Teacher/Parent Experience
1. **Content Management**: Upload textbooks and PDFs
2. **Student Monitoring**: Track progress and identify learning gaps
3. **Customization**: Add notes and suggest focused learning areas
4. **Analytics**: View detailed learning reports

## 🎨 Accessibility Standards

- **WCAG 2.1 AA** compliance
- **ARIA labels** and semantic HTML
- **Keyboard navigation** support
- **Screen reader** compatibility
- **High contrast** and color-blind friendly themes
- **Adjustable text size** and spacing
- **Focus indicators** for all interactive elements

## 🌍 Supported Languages

- English (Primary)
- Hindi
- Spanish
- French
- Portuguese
- Arabic
- Mandarin
- Regional languages (expandable)

## 📊 Analytics & Insights

- **Learning Analytics**: Track time spent, comprehension rates
- **Content Performance**: Most accessed books and chapters
- **Accessibility Usage**: Popular accessibility features
- **Language Preferences**: Regional usage patterns
- **Game Engagement**: Interactive learning effectiveness

## 🔧 Configuration

### Environment Variables
```env
# Database
DATABASE_URL=mongodb://localhost:27017/accessibility_edu
REDIS_URL=redis://localhost:6379

# AI Services
OPENAI_API_KEY=your_openai_key
GOOGLE_CLOUD_KEY=path/to/service-account.json
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret

# Authentication
JWT_SECRET_KEY=your_jwt_secret
OAUTH_GOOGLE_CLIENT_ID=your_google_client_id

# File Storage
UPLOAD_FOLDER=uploads/
MAX_FILE_SIZE=50MB
```

## 🤝 Contributing

We welcome contributions from developers, educators, and accessibility experts!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [docs/](./docs/)
- **Issues**: [GitHub Issues](https://github.com/yourusername/accessibility-education-portal/issues)
- **Discord**: [Join our community](https://discord.gg/accessibility-edu)
- **Email**: support@accessibility-edu.org

## 🙏 Acknowledgments

- OpenDyslexic font contributors
- WCAG accessibility guidelines team
- Open source AI/ML community
- Special education teachers and accessibility advocates

---

**Making education accessible, one student at a time.** 🌟
