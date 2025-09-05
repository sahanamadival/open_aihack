# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a **GenAI-powered accessibility education portal** designed specifically for students with disabilities and rural learners. The platform converts textbooks and PDFs into accessible formats including audio, simplified summaries, and translations.

### Key Mission
Making education accessible through AI-powered tools supporting students with dyslexia, visual impairments, learning disabilities, and non-native language speakers.

## Architecture

### Full-Stack Structure
- **Frontend**: React.js with accessibility-first design (WCAG 2.1 AA compliance)
- **Backend**: FastAPI (Python) with async MongoDB operations
- **Database**: MongoDB for primary data, Redis for caching and sessions
- **AI Services**: OpenAI, Google TTS, AWS Polly, EasyOCR/Tesseract
- **Background Tasks**: Celery for document processing and audio generation

### Core Features
- PDF to audio conversion with natural voice narration
- AI-generated simplified summaries for complex content
- Multi-language translation support
- Interactive educational games and quizzes
- Comprehensive accessibility features (dyslexic fonts, screen reader support, voice input)
- Multi-user support (students, teachers/parents, admins)

## Development Commands

### Backend (FastAPI)
```powershell
# Navigate to backend directory
cd backend

# Install dependencies
pip install -r requirements.txt

# Setup environment
cp .env.example .env
# Configure your API keys and database connections in .env

# Run development server (with hot reload)
python app/main.py

# Alternative: using uvicorn directly
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload

# Run tests
pytest

# Code formatting and linting
black .
flake8
mypy .
```

### Frontend (React)
```powershell
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm start

# Run tests
npm test

# Run accessibility tests
npm run test:a11y

# Test coverage
npm run test:coverage

# Build for production
npm build

# Linting and formatting
npm run lint
npm run lint:fix
npm run format
```

### Running the Full Application
1. **Start Backend**: In `backend/` directory, run `python app/main.py` (port 8000)
2. **Start Frontend**: In `frontend/` directory, run `npm start` (port 3000)
3. **Access Application**: Navigate to `http://localhost:3000`
4. **API Documentation**: Available at `http://localhost:8000/docs`

## Key Architecture Patterns

### Backend Structure
- **`app/main.py`**: FastAPI application entry point with CORS, middleware, and router registration
- **`routes/`**: API route handlers organized by feature (auth, textbooks, accessibility, games, admin)
- **`models/`**: Pydantic models for request/response validation and database schemas
- **`utils/`**: Database connections, email services, logging configuration
- **Async/Await**: All database operations use async MongoDB driver (motor)

### Frontend Architecture
- **Context Providers**: AccessibilityContext, AuthContext, LanguageContext for global state
- **Route-based Architecture**: Authenticated vs unauthenticated app flows
- **Accessibility-First**: Skip links, ARIA labels, semantic HTML, screen reader support
- **Component Structure**: Layout (Header/Sidebar), Pages (Dashboard/Textbooks/Games), Common utilities

### Authentication & Authorization
- **JWT-based**: Access tokens (30 min) and refresh tokens (7 days)
- **Role-based Access**: Student, Teacher/Parent, Admin roles
- **Password Security**: bcrypt hashing with configurable rounds
- **Session Management**: Token storage in localStorage with validation

### AI Integration Points
- **Text Processing**: OpenAI for summarization, Hugging Face for additional ML tasks
- **Text-to-Speech**: Google TTS, Azure Speech, AWS Polly for audio generation
- **OCR**: EasyOCR and Tesseract for document processing
- **Translation**: Google Translate API for multi-language support

## Environment Configuration

### Required Environment Variables (.env file)
```env
# Core Application
PORT=8000
ENVIRONMENT=development
DEBUG=true

# Database
DATABASE_URL=mongodb://localhost:27017/accessibility_edu
REDIS_URL=redis://localhost:6379

# Security
JWT_SECRET_KEY=your-super-secret-jwt-key
JWT_ALGORITHM=HS256

# AI Services (Required)
OPENAI_API_KEY=your-openai-api-key-here
GOOGLE_CLOUD_KEY_PATH=path/to/service-account.json
AZURE_SPEECH_KEY=your-azure-speech-key

# File Processing
UPLOAD_FOLDER=uploads
MAX_FILE_SIZE=50MB
```

### Testing Database Setup
The application expects MongoDB running on default port (27017) and Redis on port 6379. For development, you can use local installations or Docker containers.

## Accessibility Standards

This codebase strictly follows **WCAG 2.1 AA compliance**:

### Frontend Accessibility Features
- Semantic HTML with proper heading hierarchy
- ARIA labels and roles throughout the application
- Keyboard navigation support for all interactive elements
- Skip links for keyboard users
- High contrast themes and customizable color schemes
- Screen reader compatibility
- Focus indicators and proper tab order

### Testing Accessibility
```bash
# Run automated accessibility tests
npm run test:a11y

# ESLint JSX accessibility rules are configured in package.json
npm run lint
```

## Common Development Workflows

### Adding New API Endpoints
1. Create route handler in appropriate `routes/` file
2. Define Pydantic models for request/response validation
3. Add authentication/authorization dependencies if needed
4. Register router in `app/main.py`
5. Update API documentation strings

### Adding Frontend Features
1. Create components following accessibility patterns
2. Use existing context providers (AccessibilityContext, AuthContext)
3. Implement proper keyboard navigation and ARIA labels
4. Test with screen readers and accessibility tools
5. Ensure responsive design for all devices

### AI Feature Integration
1. Add API credentials to environment configuration
2. Create service utilities in `utils/` directory
3. Implement async processing with Celery for long-running tasks
4. Add proper error handling and fallback mechanisms
5. Consider rate limiting for external API calls

## Database Schema Patterns

### User Management
- Users have roles (student, teacher, admin) with different permissions
- Authentication tokens are managed through JWT with refresh capabilities
- User profiles include accessibility preferences and learning progress

### Content Management
- Textbooks/PDFs are processed and stored with metadata
- Audio files are generated and cached for reuse
- Progress tracking includes completion status, quiz scores, and engagement metrics

### Accessibility Data
- User preferences for fonts, colors, speech rate, etc.
- Learning accommodations and assistive technology settings
- Analytics on accessibility feature usage

## Development Best Practices

### Code Organization
- Follow existing patterns for route handlers and component structure
- Maintain separation of concerns between authentication, business logic, and data access
- Use TypeScript/Python type hints for better code maintainability

### Performance Considerations
- Implement caching for frequently accessed content (Redis)
- Use background tasks (Celery) for expensive operations like audio generation
- Optimize database queries with proper indexing
- Consider CDN for static assets in production

### Security Guidelines
- Never commit API keys or sensitive configuration
- Use environment variables for all external service credentials
- Implement proper input validation and sanitization
- Follow OWASP security practices for web applications

## Running Single Tests

### Backend Testing
```bash
# Run specific test file
pytest tests/test_auth.py

# Run specific test function
pytest tests/test_auth.py::test_user_registration

# Run with verbose output
pytest -v tests/
```

### Frontend Testing  
```bash
# Run specific test file
npm test -- --testNamePattern="Login"

# Run tests in specific directory
npm test src/components/Auth/

# Run tests with coverage
npm test -- --coverage --watchAll=false
```

This codebase prioritizes accessibility and inclusive design in every aspect of development. When making changes, always consider the impact on users with disabilities and test accordingly.
