# from crewai_tools import BaseTool
from amadeus import Client, ResponseError
from typing import Optional
from os import environ
from langchain.tools import BaseTool
import requests
from pydantic import Field, BaseModel  
import logging

from dotenv import load_dotenv
load_dotenv()
      

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

class AmadeusFlightSearchTool(BaseTool):
    name: str = "Amadeus Flight Search Tool"
    description: str = "Searches for flight availability and prices using the Amadeus API."
    client_id: str = Field(default_factory=lambda: environ.get('AMADEUS_CLIENT_ID'))
    client_secret: str = Field(default_factory=lambda: environ.get('AMADEUS_CLIENT_SECRET'))

    def __init__(self, **data):
        super().__init__(**data)

    def _get_access_token(self):
        url = "https://test.api.amadeus.com/v1/security/oauth2/token"
        headers = {"Content-Type": "application/x-www-form-urlencoded"}
        data = {
            "grant_type": "client_credentials",
            "client_id": self.client_id,
            "client_secret": self.client_secret
        }
        
        try:
            response = requests.post(url, headers=headers, data=data)
            response.raise_for_status()
            return response.json()["access_token"]
        except Exception as e:
            logger.error(f"Failed to obtain access token: {str(e)}")
            raise

    def _run(self, origin: str, destination: str, departure_date: str, adults: int = 1, max_price: Optional[int] = None) -> str:
        access_token = self._get_access_token()

        url = "https://test.api.amadeus.com/v2/shopping/flight-offers"
        params = {
            "originLocationCode": origin,
            "destinationLocationCode": destination,
            "departureDate": departure_date,
            "adults": adults,
            "max": 5  # Limit to 5 results for brevity
        }
        if max_price:
            params["maxPrice"] = max_price

        headers = {"Authorization": f"Bearer {access_token}"}

        try:
            response = requests.get(url, headers=headers, params=params)
            response.raise_for_status()
            data = response.json()["data"]

            results = []
            for offer in data:
                itinerary = offer['itineraries'][0]
                price = offer['price']
                result = f"Flight: {itinerary['segments'][0]['carrierCode']} {itinerary['segments'][0]['number']}\n"
                result += f"Departure: {itinerary['segments'][0]['departure']['iataCode']} at {itinerary['segments'][0]['departure']['at']}\n"
                result += f"Arrival: {itinerary['segments'][-1]['arrival']['iataCode']} at {itinerary['segments'][-1]['arrival']['at']}\n"
                result += f"Price: {price['total']} {price['currency']}\n"
                result += "---\n"
                results.append(result)

            return "\n".join(results) if results else "No flights found matching the criteria."

        except Exception as e:
            logger.error(f"Error in flight search: {str(e)}")
            return f"An error occurred while searching for flights: {str(e)}"

    async def _arun(self, origin: str, destination: str, departure_date: str, adults: int = 1, max_price: Optional[int] = None) -> str:
        return self._run(origin, destination, departure_date, adults, max_price)

# Usage example:
# tool = AmadeusFlightSearchTool(client_id='YOUR_API_KEY', client_secret='YOUR_API_SECRET')
# result = tool._run(origin='PAR', max_price=200)
# print(result)

class AmadeusHotelSearchTool(BaseTool):
    name: str = "Amadeus Hotel Search Tool"
    description: str = "Searches for hotel availability and prices using the Amadeus API."
    client_id: str = Field(default_factory=lambda: environ.get('AMADEUS_CLIENT_ID'))
    client_secret: str = Field(default_factory=lambda: environ.get('AMADEUS_CLIENT_SECRET'))

    def __init__(self, **data):
        super().__init__(**data)
        if not self.client_id or not self.client_secret:
            logger.error("Amadeus API credentials are missing. Please set AMADEUS_CLIENT_ID and AMADEUS_CLIENT_SECRET environment variables.")

    def _get_access_token(self):
        url = "https://test.api.amadeus.com/v1/security/oauth2/token"
        headers = {"Content-Type": "application/x-www-form-urlencoded"}
        data = {
            "grant_type": "client_credentials",
            "client_id": self.client_id,
            "client_secret": self.client_secret
        }
        
        try:
            response = requests.post(url, headers=headers, data=data)
            response.raise_for_status()
            return response.json()["access_token"]
        except requests.exceptions.HTTPError as e:
            if e.response.status_code == 401:
                logger.error(f"Authentication failed. Please check your Amadeus API credentials. Error: {e.response.text}")
                raise ValueError("Authentication failed. Please check your Amadeus API credentials.")
            else:
                logger.error(f"HTTP error occurred: {e}")
                raise
        except Exception as e:
            logger.error(f"An unexpected error occurred while obtaining access token: {str(e)}")
            raise

    def _run(self, city_code: str, check_in_date: str, check_out_date: str, adults: int = 2, children: Optional[int] = None) -> str:
        try:
            access_token = self._get_access_token()
        except ValueError as e:
            return str(e)

        url = "https://test.api.amadeus.com/v2/shopping/hotel-offers"
        params = {
            "cityCode": city_code,
            "checkInDate": check_in_date,
            "checkOutDate": check_out_date,
            "adults": adults
        }
        if children:
            params["children"] = children

        headers = {"Authorization": f"Bearer {access_token}"}

        try:
            response = requests.get(url, headers=headers, params=params)
            response.raise_for_status()
            data = response.json()["data"]

            results = []
            for offer in data:
                hotel = offer['hotel']
                price = offer['offers'][0]['price']
                result = f"Hotel: {hotel['name']}\n"
                result += f"Rating: {hotel.get('rating', 'N/A')}\n"
                result += f"Price: {price['total']} {price['currency']}\n"
                result += f"Available: {offer['offers'][0].get('available', 'N/A')}\n"
                result += "---\n"
                results.append(result)

            return "\n".join(results) if results else "No hotels found matching the criteria."

        except requests.exceptions.HTTPError as e:
            logger.error(f"HTTP error occurred: {e}")
            return f"An error occurred while searching for hotels: {str(e)}"
        except Exception as e:
            logger.error(f"An unexpected error occurred: {str(e)}")
            return f"An unexpected error occurred while searching for hotels: {str(e)}"

    async def _arun(self, city_code: str, check_in_date: str, check_out_date: str, adults: int = 2, children: Optional[int] = None) -> str:
        return self._run(city_code, check_in_date, check_out_date, adults, children)

class GeoapifyPlacesSearchTool(BaseTool):
    name: str = "Geoapify Places Search Tool"
    description: str = "Searches for points of interest in a location using the Geoapify Places API."
    api_key: str = Field(default_factory=lambda: environ.get("GEOAPIFY_API_KEY"))
    base_url: str = "https://api.geoapify.com/v1"

    def _run(self, location: str, categories: Optional[str] = None, limit: int = 20) -> str:
        try:
            # Geocode the location to get coordinates
            geocoding_url = f"{self.base_url}/geocode/search"
            geocoding_params = {
                "text": location,
                "format": "json",
                "apiKey": self.api_key
            }
            geocoding_response = requests.get(geocoding_url, params=geocoding_params)
            geocoding_data = geocoding_response.json()
            
            if not geocoding_data.get('features'):
                return f"Could not find coordinates for the location: {location}"
            
            lat = geocoding_data['features'][0]['properties']['lat']
            lon = geocoding_data['features'][0]['properties']['lon']

            # Search for places
            places_url = f"{self.base_url}/places"
            places_params = {
                "filter": f"circle:{lon},{lat},5000",
                "bias": f"proximity:{lon},{lat}",
                "limit": limit,
                "apiKey": self.api_key
            }
            
            if categories:
                places_params["categories"] = categories

            places_response = requests.get(places_url, params=places_params)
            places_data = places_response.json()
            
            # Format the response
            results = []
            for place in places_data.get('features', []):
                props = place['properties']
                result = f"Name: {props.get('name', 'N/A')}, "
                result += f"Category: {props.get('categories', ['N/A'])[0]}, "
                result += f"Address: {props.get('formatted', 'N/A')}"
                results.append(result)

            return "\n".join(results) if results else "No places found matching the criteria."

        except Exception as e:
            return f"An error occurred: {str(e)}"

# Usage example:
# tool = GeoapifyPlacesSearchTool(api_key='YOUR_API_KEY')
# result = tool._run(location="New York City", categories="catering.restaurant", limit=5)
# print(result)