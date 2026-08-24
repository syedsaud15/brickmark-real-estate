from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import Optional, List
from database import get_db, Property
from schemas import PropertyBase, PropertyList, CityLocality

router = APIRouter(prefix="/api", tags=["properties"])

CITIES = ["Bangalore", "Mumbai"]

LOCALITIES = {
    "Bangalore": [
        "Koramangala", "Whitefield", "Indiranagar", "HSR Layout",
        "Bellandur", "Jayanagar", "Electronic City", "Sarjapur Road",
        "Marathahalli", "JP Nagar",
    ],
    "Mumbai": [
        "Bandra West", "Powai", "Andheri West", "Juhu", "Malad West",
        "Thane West", "Worli", "Goregaon East", "Navi Mumbai", "Lower Parel",
    ],
}


@router.get("/cities", response_model=List[str])
def get_cities():
    return CITIES


@router.get("/localities", response_model=CityLocality)
def get_localities(city: str = Query(..., description="City name")):
    locs = LOCALITIES.get(city, [])
    return CityLocality(city=city, localities=locs)


@router.get("/properties", response_model=PropertyList)
def list_properties(
    city: Optional[str] = Query(None),
    listing_type: Optional[str] = Query(None, description="'buy' or 'rent'"),
    min_price: Optional[int] = Query(None),
    max_price: Optional[int] = Query(None),
    bedrooms: Optional[int] = Query(None),
    property_type: Optional[str] = Query(None),
    locality: Optional[str] = Query(None),
    furnished: Optional[str] = Query(None),
    sort_by: Optional[str] = Query("created_at", description="price_asc | price_desc | newest"),
    db: Session = Depends(get_db),
):
    q = db.query(Property)

    if city:
        q = q.filter(Property.city == city)
    if listing_type:
        q = q.filter(Property.listing_type == listing_type)
    if min_price is not None:
        q = q.filter(Property.price >= min_price)
    if max_price is not None:
        q = q.filter(Property.price <= max_price)
    if bedrooms is not None:
        q = q.filter(Property.bedrooms == bedrooms)
    if property_type:
        q = q.filter(Property.property_type == property_type)
    if locality:
        q = q.filter(Property.locality == locality)
    if furnished:
        q = q.filter(Property.furnished == furnished)

    if sort_by == "price_asc":
        q = q.order_by(Property.price.asc())
    elif sort_by == "price_desc":
        q = q.order_by(Property.price.desc())
    else:
        q = q.order_by(Property.created_at.desc())

    total = q.count()
    results = q.all()

    return PropertyList(total=total, properties=results)


@router.get("/properties/{property_id}", response_model=PropertyBase)
def get_property(property_id: int, db: Session = Depends(get_db)):
    from fastapi import HTTPException
    prop = db.query(Property).filter(Property.id == property_id).first()
    if not prop:
        raise HTTPException(status_code=404, detail="Property not found")
    return prop
