from fastapi import FastAPI
from pydantic import BaseModel 
import sys
import os
from fastapi.middleware.cors import CORSMiddleware
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from crew import BackendCrew

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Adjust this to match your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TripData(BaseModel):
    destination: str
    startDate: str
    endDate: str
    budget: int
    travelers: int
    interests: list[str]
    accommodation: str
    transportation: list[str]
    notes: str 

@app.post("/kickoff")
async def kickoff(trip_data: TripData):
    # Calculate max_price for flight based on budget
    # Assuming 40% of the budget is allocated for flights
    max_price = int(trip_data.budget * 0.4 / trip_data.travelers)
    # Create a new dictionary with all trip data and the calculated max_price
    trip_info = trip_data.dict()
    trip_info['max_price'] = max_price
    trip_info['origin'] = 'New York City'

    crew = BackendCrew().crew()
    print("TRIP DATA=======>", trip_info)
    result = crew.kickoff(inputs=trip_info)
    return {"result": result}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
    
    
# def run():
#     # Replace with your inputs, it will automatically interpolate any tasks and agents information
#     inputs = {
#         'topic': 'AI LLMs'
#     }
#     BackendCrew().crew().kickoff(inputs=inputs)