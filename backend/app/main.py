"""
Main FastAPI application for the GenAI Accessibility Education Portal
"""

from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from contextlib import asynccontextmanager
import uvicorn
import os
from dotenv import load_dotenv

from routes.auth import router as auth_router
from routes.textbooks import router as textbooks_router
from routes.accessibility import router as accessibility_router
from routes.games import router as games_router
from routes.admin import router as admin_router
from utils.database import connect_to_mongo, close_mongo_connection
from utils.logging_config import setup_logging

# Load environment variables
load_dotenv()

# Setup logging
logger = setup_logging()


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan events"""
    # Startup
    logger.info("Starting Accessibility Education Portal API...")
    await connect_to_mongo()
    logger.info("Database connected successfully")
    
    yield
    
    # Shutdown
    logger.info("Shutting down Accessibility Education Portal API...")
    await close_mongo_connection()
    logger.info("Database connection closed")


# Create FastAPI application
app = FastAPI(
    title="GenAI Accessibility Education Portal",
    description="""
    A comprehensive GenAI-powered education platform that converts textbooks 
    and PDFs into accessible formats including audio, simplified summaries, 
    and translations. Designed for students with disabilities and rural learners.
    """,
    version="1.0.0",
    contact={
        "name": "Accessibility Education Portal Team",
        "email": "support@accessibility-edu.org",
    },
    license_info={
        "name": "MIT License",
        "url": "https://opensource.org/licenses/MIT",
    },
    lifespan=lifespan
)

# CORS Configuration
origins = [
    "http://localhost:3000",  # React development server
    "http://localhost:3001",
    "http://127.0.0.1:3000",
    # Add production origins here
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "PATCH"],
    allow_headers=["*"],
)

# Mount static files
os.makedirs("uploads", exist_ok=True)
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# Include routers
app.include_router(auth_router, prefix="/api/auth", tags=["Authentication"])
app.include_router(textbooks_router, prefix="/api/textbooks", tags=["Textbooks"])
app.include_router(accessibility_router, prefix="/api/accessibility", tags=["Accessibility"])
app.include_router(games_router, prefix="/api/games", tags=["Games & Learning"])
app.include_router(admin_router, prefix="/api/admin", tags=["Administration"])


@app.get("/", tags=["Root"])
async def root():
    """Root endpoint with API information"""
    return {
        "message": "Welcome to GenAI Accessibility Education Portal API",
        "version": "1.0.0",
        "docs": "/docs",
        "redoc": "/redoc",
        "features": [
            "PDF to Audio conversion",
            "AI-powered text summarization",
            "Multi-language translation",
            "Dyslexia-friendly reading",
            "Interactive educational games",
            "Progress tracking and analytics"
        ]
    }


@app.get("/health", tags=["Health"])
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "service": "Accessibility Education Portal API",
        "version": "1.0.0"
    }


@app.get("/api/features", tags=["Features"])
async def get_features():
    """Get available platform features"""
    return {
        "content_conversion": {
            "pdf_to_audio": True,
            "smart_summaries": True,
            "translation": True,
            "ocr_support": True
        },
        "accessibility": {
            "dyslexic_fonts": True,
            "text_to_speech": True,
            "high_contrast": True,
            "screen_reader": True,
            "voice_input": True
        },
        "learning": {
            "ai_quizzes": True,
            "educational_games": True,
            "progress_tracking": True,
            "personalized_content": True
        },
        "user_management": {
            "multi_user_support": True,
            "role_based_access": True,
            "parental_controls": True
        }
    }


if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=int(os.getenv("PORT", 8000)),
        reload=True if os.getenv("ENVIRONMENT") == "development" else False,
        log_level="info"
    )
