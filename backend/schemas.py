from pydantic import BaseModel
from typing import Optional, List


class PropertyBase(BaseModel):
    id: int
    title: str
    city: str
    locality: str
    property_type: str
    listing_type: str
    price: int
    bedrooms: int
    bathrooms: int
    area_sqft: int
    floor: Optional[str] = None
    furnished: Optional[str] = None
    parking: int = 0
    description: Optional[str] = None
    image_url: Optional[str] = None
    is_verified: int = 0
    posted_by: Optional[str] = None
    contact: Optional[str] = None
    amenities: Optional[str] = None
    created_at: Optional[str] = None

    class Config:
        orm_mode = True


class PropertyList(BaseModel):
    total: int
    properties: List[PropertyBase]


class CityLocality(BaseModel):
    city: str
    localities: List[str]
