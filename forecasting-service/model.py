"""Price trend / sell-advisory model."""

def get_advisory(crop: str, market: str):
    return {
        "crop": crop,
        "market": market,
        "trend": "stable",
        "advisory": f"{crop} sathi bhav pudhchya aathvadyat vadhnyachi shakyata aahe."
    }
