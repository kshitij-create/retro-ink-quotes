from fastapi import FastAPI, APIRouter, HTTPException, Query
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional
import uuid
from datetime import datetime
from models import Quote, QuoteCreate, Anime, AnimeCreate, Character, CharacterCreate
from seed_data import anime_data, characters_data, quotes_data


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str


# Seed database on startup
@app.on_event("startup")
async def seed_database():
    """Seed database with initial data if collections are empty"""
    try:
        # Check if data already exists
        anime_count = await db.anime.count_documents({})
        if anime_count == 0:
            logger.info("Seeding database with anime data...")
            anime_objects = [Anime(**anime).dict() for anime in anime_data]
            await db.anime.insert_many(anime_objects)
            logger.info(f"Inserted {len(anime_objects)} anime series")
        
        character_count = await db.characters.count_documents({})
        if character_count == 0:
            logger.info("Seeding database with character data...")
            character_objects = [Character(**char).dict() for char in characters_data]
            await db.characters.insert_many(character_objects)
            logger.info(f"Inserted {len(character_objects)} characters")
        
        quote_count = await db.quotes.count_documents({})
        if quote_count == 0:
            logger.info("Seeding database with quote data...")
            quote_objects = [Quote(**quote).dict() for quote in quotes_data]
            await db.quotes.insert_many(quote_objects)
            logger.info(f"Inserted {len(quote_objects)} quotes")
            
            # Update anime and character quote counts
            for anime in anime_data:
                count = await db.quotes.count_documents({"anime_slug": anime["slug"]})
                await db.anime.update_one(
                    {"slug": anime["slug"]},
                    {"$set": {"total_quotes": count}}
                )
            
            for char in characters_data:
                count = await db.quotes.count_documents({"character_slug": char["slug"]})
                await db.characters.update_one(
                    {"slug": char["slug"]},
                    {"$set": {"total_quotes": count}}
                )
        
        logger.info("Database seeding completed")
    except Exception as e:
        logger.error(f"Error seeding database: {e}")


# Basic routes
@api_router.get("/")
async def root():
    return {"message": "Anime Quotes API"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]


# Anime routes
@api_router.get("/anime", response_model=List[Anime])
async def get_all_anime():
    """Get all anime series"""
    anime_list = await db.anime.find().to_list(1000)
    return [Anime(**anime) for anime in anime_list]

@api_router.get("/anime/{slug}", response_model=Anime)
async def get_anime_by_slug(slug: str):
    """Get specific anime by slug"""
    anime = await db.anime.find_one({"slug": slug})
    if not anime:
        raise HTTPException(status_code=404, detail="Anime not found")
    return Anime(**anime)


# Character routes
@api_router.get("/characters", response_model=List[Character])
async def get_all_characters(
    anime_slug: Optional[str] = Query(None, description="Filter by anime slug")
):
    """Get all characters, optionally filtered by anime"""
    query = {}
    if anime_slug:
        query["anime_slug"] = anime_slug
    
    characters = await db.characters.find(query).to_list(1000)
    return [Character(**char) for char in characters]

@api_router.get("/characters/{slug}", response_model=Character)
async def get_character_by_slug(slug: str):
    """Get specific character by slug"""
    character = await db.characters.find_one({"slug": slug})
    if not character:
        raise HTTPException(status_code=404, detail="Character not found")
    return Character(**character)


# Quote routes
@api_router.get("/quotes", response_model=List[Quote])
async def get_quotes(
    anime_slug: Optional[str] = Query(None, description="Filter by anime slug"),
    character_slug: Optional[str] = Query(None, description="Filter by character slug"),
    category: Optional[str] = Query(None, description="Filter by category"),
    featured: Optional[bool] = Query(None, description="Filter featured quotes"),
    limit: int = Query(100, description="Maximum number of quotes to return")
):
    """Get quotes with optional filters"""
    query = {}
    if anime_slug:
        query["anime_slug"] = anime_slug
    if character_slug:
        query["character_slug"] = character_slug
    if category:
        query["category"] = category
    if featured is not None:
        query["featured"] = featured
    
    quotes = await db.quotes.find(query).limit(limit).to_list(limit)
    return [Quote(**quote) for quote in quotes]

@api_router.get("/quotes/featured", response_model=List[Quote])
async def get_featured_quotes():
    """Get all featured quotes"""
    quotes = await db.quotes.find({"featured": True}).to_list(100)
    return [Quote(**quote) for quote in quotes]

@api_router.get("/quotes/search", response_model=List[Quote])
async def search_quotes(
    q: str = Query(..., description="Search query"),
    limit: int = Query(50, description="Maximum number of results")
):
    """Search quotes by text, character, or anime"""
    # Create text search query
    query = {
        "$or": [
            {"text": {"$regex": q, "$options": "i"}},
            {"character": {"$regex": q, "$options": "i"}},
            {"anime": {"$regex": q, "$options": "i"}},
            {"category": {"$regex": q, "$options": "i"}}
        ]
    }
    
    quotes = await db.quotes.find(query).limit(limit).to_list(limit)
    return [Quote(**quote) for quote in quotes]

@api_router.post("/quotes", response_model=Quote)
async def create_quote(quote_input: QuoteCreate):
    """Create a new quote"""
    quote_obj = Quote(**quote_input.dict())
    await db.quotes.insert_one(quote_obj.dict())
    
    # Update quote counts
    await db.anime.update_one(
        {"slug": quote_obj.anime_slug},
        {"$inc": {"total_quotes": 1}}
    )
    await db.characters.update_one(
        {"slug": quote_obj.character_slug},
        {"$inc": {"total_quotes": 1}}
    )
    
    return quote_obj

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
