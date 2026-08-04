from neo4j import GraphDatabase
from dotenv import load_dotenv
import os

from pathlib import Path

load_dotenv(dotenv_path=Path(__file__).parent / ".env")

print("URI:", os.getenv("URI"))
print("USERNAME:", "cognodb")
print("PASSWORD:", os.getenv("PASSWORD"))

URI = os.getenv("URI")
USERNAME = "cognodb"
PASSWORD = os.getenv("PASSWORD")

driver = GraphDatabase.driver(
    URI,
    auth=(USERNAME, PASSWORD)
)

def execute_query(query, parameters=None):
    with driver.session() as session:
        result = session.run(query, parameters or {})
        return [record.data() for record in result]