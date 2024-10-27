from crewai import Agent, Crew, Process, Task
from crewai.project import CrewBase, agent, crew, task
from backend.tools.custom_tool import AmadeusFlightSearchTool, AmadeusHotelSearchTool, GeoapifyPlacesSearchTool
import os
from dotenv import load_dotenv
from langchain.chat_models import ChatOpenAI

# Load environment variables
load_dotenv()

OPENAI_API_MODEL = os.getenv("OPENAI_API_MODEL", "gpt-3.5-turbo")

@CrewBase
class BackendCrew():
    """Backend crew for travel planning"""
    agents_config = 'config/agents.yaml'
    tasks_config = 'config/tasks.yaml'

    @agent
    def flight_search_agent(self) -> Agent:
        return Agent(
            config=self.agents_config['flight_search_agent'],
            tools=[AmadeusFlightSearchTool()],
            verbose=True,
           # Add a function to log or print the input data
            on_start=lambda agent, task: print(f"Flight search started with data: {task.input}"),
            llm=ChatOpenAI(model_name=OPENAI_API_MODEL)
        )

    @agent
    def hotel_search_agent(self) -> Agent:
        return Agent(
            config=self.agents_config['hotel_search_agent'],
            tools=[AmadeusHotelSearchTool()],
            verbose=True,
            llm=ChatOpenAI(model_name=OPENAI_API_MODEL) 
        )

    @agent
    def activity_planning_agent(self) -> Agent:
        return Agent(
            config=self.agents_config['activity_planning_agent'],
            llm=ChatOpenAI(model_name=OPENAI_API_MODEL) ,
            tools=[GeoapifyPlacesSearchTool()],
            verbose=True
        )

    @agent
    def itinerary_expert_agent(self) -> Agent:
        return Agent(
            config=self.agents_config['itinerary_expert_agent'],
            verbose=True,
            llm=ChatOpenAI(model_name=OPENAI_API_MODEL) 
        )

    @task
    def flight_search_task(self) -> Task:
        return Task(
            config=self.tasks_config['flight_search_task'],
            agent=self.flight_search_agent()
        )

    @task
    def hotel_search_task(self) -> Task:
        return Task(
            config=self.tasks_config['hotel_search_task'],
            agent=self.hotel_search_agent()
        )

    @task
    def activity_planning_task(self) -> Task:
        return Task(
            config=self.tasks_config['activity_planning_task'],
            agent=self.activity_planning_agent()
        )

    @task
    def itinerary_creation_task(self) -> Task:
        return Task(
            config=self.tasks_config['itinerary_creation_task'],
            agent=self.itinerary_expert_agent()
        )

    @crew
    def crew(self) -> Crew:
        """Creates the Backend crew for travel planning"""
        return Crew(
            agents=self.agents,  # Automatically created by the @agent decorator
            tasks=self.tasks,  # Automatically created by the @task decorator
            process=Process.sequential,
            verbose=2,
        )