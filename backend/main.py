from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from queries import (
    get_all_skills,
    get_skill_roadmap,
    get_jobs,
    get_companies
)

app = FastAPI(title="Skill Graph API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8443"],   # Vite
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "message": "Skill Graph API Running"
    }

@app.get("/skills")
def get_skills():
    return [
        {
            "id":"react",
            "name":"React",
            "level":"Intermediate"
        },
        {
            "id":"python",
            "name":"Python",
            "level":"Advanced"
        }
    ]

@app.get("/roadmap/{skill}")
def roadmap(skill: str):
    return get_skill_roadmap(skill)


@app.get("/jobs/{skill}")
def jobs(skill: str):
    return get_jobs(skill)


@app.get("/companies/{skill}")
def companies(skill: str):
    return get_companies(skill)