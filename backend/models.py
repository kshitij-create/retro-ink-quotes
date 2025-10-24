from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
import uuid


class Quote(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    anime: str
    anime_slug: str
    character: str
    character_slug: str
    text: str
    image_url: Optional[str] = None
    category: Optional[str] = None  # motivation, friendship, battle, wisdom
    japanese_title: Optional[str] = None
    featured: bool = False
    created_at: datetime = Field(default_factory=datetime.utcnow)


class QuoteCreate(BaseModel):
    anime: str
    anime_slug: str
    character: str
    character_slug: str
    text: str
    image_url: Optional[str] = None
    category: Optional[str] = None
    japanese_title: Optional[str] = None
    featured: bool = False


class Anime(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    slug: str
    japanese_name: str
    description: str
    cover_image: Optional[str] = None
    release_year: Optional[int] = None
    total_quotes: int = 0
    created_at: datetime = Field(default_factory=datetime.utcnow)


class AnimeCreate(BaseModel):
    name: str
    slug: str
    japanese_name: str
    description: str
    cover_image: Optional[str] = None
    release_year: Optional[int] = None


class Character(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    slug: str
    japanese_name: Optional[str] = None
    anime: str
    anime_slug: str
    bio: Optional[str] = None
    image_url: Optional[str] = None
    role: Optional[str] = None  # protagonist, antagonist, supporting
    total_quotes: int = 0
    created_at: datetime = Field(default_factory=datetime.utcnow)


class CharacterCreate(BaseModel):
    name: str
    slug: str
    japanese_name: Optional[str] = None
    anime: str
    anime_slug: str
    bio: Optional[str] = None
    image_url: Optional[str] = None
    role: Optional[str] = None
