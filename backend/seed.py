from database import driver


def run_query(query, parameters=None):
    with driver.session() as session:
        session.run(query, parameters or {})


# -------------------------
# Delete Existing Data
# -------------------------
run_query("""
MATCH (n)
DETACH DELETE n
""")

print("Old graph deleted.")


# -------------------------
# Skills
# -------------------------
skills = [
    "HTML",
    "CSS",
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Python",
    "FastAPI",
    "Docker",
    "AWS"
]

for skill in skills:
    run_query(
        """
        CREATE (:Skill {name:$name})
        """,
        {"name": skill}
    )

print("Skills inserted.")


# -------------------------
# Companies
# -------------------------
companies = [
    "Google",
    "Microsoft",
    "Amazon",
    "Netflix"
]

for company in companies:
    run_query(
        """
        CREATE (:Company {name:$name})
        """,
        {"name": company}
    )

print("Companies inserted.")


# -------------------------
# Jobs
# -------------------------
jobs = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "DevOps Engineer"
]

for job in jobs:
    run_query(
        """
        CREATE (:Job {title:$title})
        """,
        {"title": job}
    )

print("Jobs inserted.")


# -------------------------
# Skill Roadmap
# -------------------------
relations = [

    ("CSS", "HTML"),

    ("JavaScript", "HTML"),

    ("TypeScript", "JavaScript"),

    ("React", "JavaScript"),

    ("Next.js", "React"),

    ("Node.js", "JavaScript"),

    ("FastAPI", "Python"),

    ("Docker", "Node.js"),

    ("AWS", "Docker")
]

for child, parent in relations:
    run_query(
        """
        MATCH (a:Skill {name:$child})
        MATCH (b:Skill {name:$parent})

        CREATE (a)-[:REQUIRES]->(b)
        """,
        {
            "child": child,
            "parent": parent
        }
    )

print("Skill relationships created.")


# -------------------------
# Company Uses Skill
# -------------------------
company_skills = [

    ("Google", "React"),
    ("Google", "Python"),

    ("Microsoft", "React"),
    ("Microsoft", "TypeScript"),

    ("Amazon", "AWS"),
    ("Amazon", "Python"),

    ("Netflix", "React"),
    ("Netflix", "Node.js")
]

for company, skill in company_skills:
    run_query(
        """
        MATCH (c:Company {name:$company})
        MATCH (s:Skill {name:$skill})

        CREATE (c)-[:USES]->(s)
        """,
        {
            "company": company,
            "skill": skill
        }
    )

print("Companies connected.")


# -------------------------
# Job Requires Skill
# -------------------------
job_skills = [

    ("Frontend Developer", "HTML"),
    ("Frontend Developer", "CSS"),
    ("Frontend Developer", "JavaScript"),
    ("Frontend Developer", "React"),

    ("Backend Developer", "Python"),
    ("Backend Developer", "FastAPI"),

    ("Full Stack Developer", "React"),
    ("Full Stack Developer", "Node.js"),
    ("Full Stack Developer", "Python"),

    ("DevOps Engineer", "Docker"),
    ("DevOps Engineer", "AWS")
]

for job, skill in job_skills:
    run_query(
        """
        MATCH (j:Job {title:$job})
        MATCH (s:Skill {name:$skill})

        CREATE (j)-[:REQUIRES]->(s)
        """,
        {
            "job": job,
            "skill": skill
        }
    )

print("Jobs connected.")

print("\nDatabase seeded successfully!")