import os
from pathlib import Path

from dotenv import load_dotenv, dotenv_values
from neo4j import GraphDatabase


# ============================================================
# Load environment variables
# ============================================================

BASE_DIR = Path(__file__).resolve().parent

# override=True ensures .env values win over pre-existing OS env vars.
# Important because "USERNAME" is already set by Windows, which would
# otherwise shadow the Neo4j username in the .env file.
load_dotenv(BASE_DIR / ".env", override=True)


# ============================================================
# Database Configuration
# ============================================================

URI = os.getenv("URI")
# "USERNAME" is a reserved Windows environment variable, so read it
# directly from the .env file instead of relying on the OS environment.
USERNAME = dotenv_values(BASE_DIR / ".env").get("USERNAME", "cognodb")
PASSWORD = os.getenv("PASSWORD")


# ============================================================
# Validate Configuration
# ============================================================

if not URI:
    raise ValueError(
        "URI is missing from the .env file."
    )

if not PASSWORD:
    raise ValueError(
        "PASSWORD is missing from the .env file."
    )


print("Neo4j URI:", URI)
print("Neo4j Username:", USERNAME)
print("Neo4j Password: [hidden]")


# ============================================================
# Neo4j Driver
# ============================================================

driver = GraphDatabase.driver(
    URI,
    auth=(USERNAME, PASSWORD),
)


# ============================================================
# Test Database Connection
# ============================================================

def test_connection():
    try:

        driver.verify_connectivity()

        print(
            "Neo4j connection successful."
        )

        return True

    except Exception as error:

        print(
            "Neo4j connection failed:"
        )

        print(error)

        return False


# ============================================================
# Execute Query
# ============================================================

def execute_query(query, parameters=None):

    with driver.session() as session:

        result = session.run(
            query,
            parameters or {}
        )

        return [
            record.data()
            for record in result
        ]