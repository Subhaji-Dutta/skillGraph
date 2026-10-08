from neo4j import GraphDatabase

URI = "bolt+s://db-a254df3d.databases.cognodb.com"
USERNAME = "cognodb"
PASSWORD = "b75e4bcc7e4e540b40401c6d143b4fe7"

driver = GraphDatabase.driver(
    URI,
    auth=(USERNAME, PASSWORD),
)

try:
    driver.verify_connectivity()
    print("✅ Neo4j connection successful!")

except Exception as e:
    print("❌ Neo4j connection failed:")
    print(repr(e))

finally:
    driver.close()