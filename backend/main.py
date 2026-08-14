from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import execute_query

from queries import (
    get_all_skills,
    get_skill_roadmap,
    get_jobs,
    get_companies,
    get_skill_stats
)


app = FastAPI(title="Skill Graph API")


# -------------------------
# CORS
# -------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


# -------------------------
# Home
# -------------------------

@app.get("/")
def home():
    return {
        "message": "Skill Graph API Running"
    }


# -------------------------
# Skills
# -------------------------

@app.get("/skills")
def get_skills():
    return get_all_skills()


# -------------------------
# Roadmap
# -------------------------

@app.get("/roadmap/{skill}")
def roadmap(skill: str):
    return get_skill_roadmap(skill)


# -------------------------
# Jobs
# -------------------------

@app.get("/jobs/{skill}")
def jobs(skill: str):
    return get_jobs(skill)


# -------------------------
# Companies
# -------------------------

@app.get("/companies/{skill}")
def companies(skill: str):
    return get_companies(skill)


# -------------------------
# Debug
# -------------------------

@app.get("/debug")
def debug():
    return execute_query("""
        MATCH (n)
        RETURN labels(n) AS labels, n
        LIMIT 50
    """)


# -------------------------
# Statistics
# -------------------------

@app.get("/stats")
def stats():

    skills = execute_query("""
        MATCH (s:Skill)
        RETURN count(s) AS count
    """)[0]["count"]

    jobs = execute_query("""
        MATCH (j:Job)
        RETURN count(j) AS count
    """)[0]["count"]

    companies = execute_query("""
        MATCH (c:Company)
        RETURN count(c) AS count
    """)[0]["count"]

    return {
        "skills": skills,
        "jobs": jobs,
        "companies": companies
    }

@app.get("/stats/{skill}")
def skill_stats(skill: str):
    result = get_skill_stats(skill)

    if not result:
        return {
            "skill": skill,
            "prerequisites": 0,
            "jobs": 0,
            "companies": 0
        }

    return result[0]