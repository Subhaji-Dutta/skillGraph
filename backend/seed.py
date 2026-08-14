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

    # =========================
    # Frontend
    # =========================

    {"name": "HTML", "level": "Beginner","icon":"html","category":"Frontend"},
    {"name": "CSS", "level": "Beginner","icon":"css","category":"Frontend"},
    {"name": "JavaScript", "level": "Intermediate","icon":"javascript","category":"Frontend"},
    {"name": "TypeScript", "level": "Intermediate","icon":"typescript","category":"Frontend"},
    {"name": "React", "level": "Intermediate","icon":"react","category":"Frontend"},
    {"name": "Next.js", "level": "Intermediate","icon":"nextjs","category":"Frontend"},
    {"name": "Redux", "level": "Intermediate","icon":"redux","category":"Frontend"},
    {"name": "Tailwind CSS", "level": "Intermediate","icon":"tailwindcss","category":"Frontend"},
    {"name": "Bootstrap", "level": "Beginner","icon":"bootstrap","category":"Frontend"},
    {"name": "Material UI", "level": "Intermediate","icon":"materialui","category":"Frontend"},
    {"name": "Vite", "level": "Intermediate","icon":"vite","category":"Frontend"},

    # =========================
    # Backend
    # =========================

    {"name": "Node.js", "level": "Intermediate","icon":"nodejs","category":"Backend"},
    {"name": "Express.js", "level": "Intermediate","icon":"expressjs","category":"Backend"},
    {"name": "Python", "level": "Intermediate","icon":"python","category":"Backend"},
    {"name": "FastAPI", "level": "Intermediate","icon":"fastapi","category":"Backend"},
    {"name": "Django", "level": "Intermediate","icon":"django","category":"Backend"},
    {"name": "Flask", "level": "Intermediate","icon":"flask","category":"Backend"},
    {"name": "Java", "level": "Intermediate","icon":"java","category":"Backend"},
    {"name": "Spring Boot", "level": "Intermediate","icon":"springboot","category":"Backend"},
    {"name": "PHP", "level": "Intermediate","icon":"php","category":"Backend"},
    {"name": "Laravel", "level": "Intermediate","icon":"laravel","category":"Backend"},

    # =========================
    # Database
    # =========================

    {"name": "MySQL", "level": "Beginner","icon":"mysql","category":"Database"},
    {"name": "PostgreSQL", "level": "Intermediate","icon":"postgresql","category":"Database"},
    {"name": "MongoDB", "level": "Intermediate","icon":"mongodb","category":"Database"},
    {"name": "Redis", "level": "Intermediate","icon":"redis","category":"Database"},
    {"name": "SQLite", "level": "Beginner","icon":"sqlite","category":"Database"},

    # =========================
    # DevOps
    # =========================

    {"name": "Git", "level": "Beginner","icon":"git","category":"DevOps"},
    {"name": "GitHub", "level": "Beginner","icon":"github","category":"DevOps"},
    {"name": "Docker", "level": "Intermediate","icon":"docker","category":"DevOps"},
    {"name": "Kubernetes", "level": "Advanced","icon":"kubernetes","category":"DevOps"},
    {"name": "AWS", "level": "Advanced","icon":"aws","category":"DevOps"},
    {"name": "Azure", "level": "Advanced","icon":"azure","category":"DevOps"},
    {"name": "CI/CD", "level": "Intermediate","icon":"cicd","category":"DevOps"},
    {"name": "Nginx", "level": "Intermediate","icon":"nginx","category":"DevOps"},

    # =========================
    # Testing
    # =========================

    {"name": "Jest", "level": "Intermediate","icon":"jest","category":"Testing"},
    {"name": "Cypress", "level": "Intermediate","icon":"cypress","category":"Testing"},
    {"name": "Pytest", "level": "Intermediate","icon":"pytest","category":"Testing"},

    # =========================
    # Mobile
    # =========================

    {"name": "React Native", "level": "Intermediate","icon":"reactnative","category":"Mobile"},
    {"name": "Flutter", "level": "Intermediate","icon":"flutter","category":"Mobile"},

    # =========================
    # AI / Data
    # =========================

    {"name": "NumPy", "level": "Beginner","icon":"numpy","category":"AI/Data"},
    {"name": "Pandas", "level": "Beginner","icon":"pandas","category":"AI/Data"},
    {"name": "Scikit-learn", "level": "Intermediate","icon":"scikitlearn","category":"AI/Data"},
    {"name": "TensorFlow", "level": "Advanced","icon":"tensorflow","category":"AI/Data"},
    {"name": "PyTorch", "level": "Advanced","icon":"pytorch","category":"AI/Data"},

    # =========================
    # Cloud / APIs
    # =========================

    {"name": "REST API", "level": "Beginner","icon":"restapi","category":"Cloud/APIs"},
    {"name": "GraphQL", "level": "Intermediate","icon":"graphql","category":"Cloud/APIs"},
    {"name": "Firebase", "level": "Intermediate","icon":"firebase","category":"Cloud/APIs"},

    # =========================
    # Others
    # =========================

    {"name": "Linux", "level": "Intermediate","icon":"linux","category":"Others"},
    {"name": "Figma", "level": "Beginner","icon":"figma","category":"Others"},
    {"name": "Webpack", "level": "Intermediate","icon":"webpack","category":"Others"},
]


for skill in skills:

    run_query(
        """
        CREATE (:Skill {
            name: $name,
            level: $level,
            icon: $icon,
            category: $category
        })
        """,
        {
            "name": skill["name"],
            "level": skill["level"],
            "icon": skill["icon"],
            "category": skill["category"]
        }
    )

print("skills inserted.")


# -------------------------
# Companies
# -------------------------


companies = [
    {"name": "Google","domain": "google.com"},
    {"name": "Microsoft","domain": "microsoft.com"},
    {"name": "Amazon","domain": "amazon.com"},
    {"name": "Netflix","domain": "netflix.com"},
    {"name": "Meta","domain": "meta.com"},
    {"name": "Apple","domain": "apple.com"},
    {"name": "Adobe","domain": "adobe.com"},
    {"name": "Uber","domain": "uber.com"},
    {"name": "Airbnb","domain": "airbnb.com"},
    {"name": "Spotify","domain": "spotify.com"},
    {"name": "Oracle","domain": "oracle.com"},
    {"name": "IBM","domain": "ibm.com"},
    {"name": "Intel","domain": "intel.com"},
    {"name": "Salesforce","domain": "salesforce.com"},
    {"name": "PayPal","domain": "paypal.com"}
]

for company in companies:
    run_query(
        """
        CREATE (:Company {
            name: $name,
            domain: $domain
        })
        """,
        {
            "name": company["name"],
            "domain": company["domain"]
        }
    )

print("Companies inserted.")


# -------------------------
# Jobs
# -------------------------
jobs = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "React Developer",
    "Python Developer",
    "DevOps Engineer",
    "Cloud Engineer",
    "Software Engineer",
    "AI Engineer",
    "Machine Learning Engineer",
    "Data Scientist",
    "Mobile Developer"
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

    # HTML
    ("CSS", "HTML"),
    ("JavaScript", "HTML"),

    # JS
    ("TypeScript", "JavaScript"),
    ("React", "JavaScript"),
    ("Node.js", "JavaScript"),
    ("Express.js", "Node.js"),
    ("Next.js", "React"),
    ("Redux", "React"),
    ("Vite", "JavaScript"),

    # Styling
    ("Bootstrap", "CSS"),
    ("Tailwind CSS", "CSS"),
    ("Material UI", "React"),

    # Backend
    ("FastAPI", "Python"),
    ("Flask", "Python"),
    ("Django", "Python"),
    ("Laravel", "PHP"),
    ("Spring Boot", "Java"),

    # Databases
    ("MongoDB", "Node.js"),
    ("MySQL", "SQL"),
    ("PostgreSQL", "SQL"),
    ("Redis", "Node.js"),

    # DevOps
    ("Docker", "Node.js"),
    ("Docker", "Python"),
    ("Kubernetes", "Docker"),
    ("AWS", "Docker"),
    ("Azure", "Docker"),
    ("CI/CD", "Git"),
    ("GitHub", "Git"),
    ("Nginx", "Docker"),

    # APIs
    ("REST API", "Node.js"),
    ("REST API", "Python"),
    ("GraphQL", "REST API"),

    # Testing
    ("Jest", "React"),
    ("Cypress", "React"),
    ("Pytest", "Python"),

    # Mobile
    ("React Native", "React"),
    ("Flutter", "Dart"),

    # AI
    ("NumPy", "Python"),
    ("Pandas", "NumPy"),
    ("Scikit-learn", "Pandas"),
    ("TensorFlow", "Python"),
    ("PyTorch", "Python"),

    # Others
    ("Firebase", "React"),
    ("Webpack", "JavaScript"),
    ("Linux", "Docker"),
    ("Figma", "HTML")
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
    ("Google", "TypeScript"),
    ("Google", "Python"),
    ("Google", "Docker"),
    ("Google", "Kubernetes"),

    ("Microsoft", "React"),
    ("Microsoft", "Azure"),
    ("Microsoft", "TypeScript"),
    ("Microsoft", "C#"),

    ("Amazon", "AWS"),
    ("Amazon", "Docker"),
    ("Amazon", "Python"),
    ("Amazon", "Java"),

    ("Netflix", "React"),
    ("Netflix", "Node.js"),
    ("Netflix", "AWS"),

    ("Meta", "React"),
    ("Meta", "GraphQL"),
    ("Meta", "Python"),

    ("Apple", "Swift"),
    ("Apple", "React"),

    ("Adobe", "React"),
    ("Adobe", "Node.js"),

    ("Uber", "Node.js"),
    ("Uber", "Docker"),
    ("Uber", "Kubernetes"),

    ("Airbnb", "React"),
    ("Airbnb", "GraphQL"),

    ("Spotify", "Python"),
    ("Spotify", "Docker"),

    ("Oracle", "Java"),
    ("Oracle", "Spring Boot"),

    ("IBM", "Python"),
    ("IBM", "Docker"),

    ("Intel", "Python"),

    ("Salesforce", "React"),

    ("PayPal", "Node.js")
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
    ("Frontend Developer", "TypeScript"),

    ("Backend Developer", "Node.js"),
    ("Backend Developer", "Express.js"),
    ("Backend Developer", "Python"),
    ("Backend Developer", "FastAPI"),

    ("Full Stack Developer", "React"),
    ("Full Stack Developer", "Node.js"),
    ("Full Stack Developer", "MongoDB"),
    ("Full Stack Developer", "Docker"),

    ("React Developer", "React"),
    ("React Developer", "Redux"),
    ("React Developer", "Next.js"),

    ("Python Developer", "Python"),
    ("Python Developer", "FastAPI"),
    ("Python Developer", "Django"),

    ("DevOps Engineer", "Docker"),
    ("DevOps Engineer", "Kubernetes"),
    ("DevOps Engineer", "AWS"),
    ("DevOps Engineer", "Linux"),

    ("Cloud Engineer", "AWS"),
    ("Cloud Engineer", "Azure"),
    ("Cloud Engineer", "Docker"),

    ("Software Engineer", "Git"),
    ("Software Engineer", "Docker"),
    ("Software Engineer", "REST API"),

    ("AI Engineer", "Python"),
    ("AI Engineer", "TensorFlow"),
    ("AI Engineer", "PyTorch"),

    ("Machine Learning Engineer", "Python"),
    ("Machine Learning Engineer", "Scikit-learn"),
    ("Machine Learning Engineer", "Pandas"),

    ("Data Scientist", "Python"),
    ("Data Scientist", "Pandas"),
    ("Data Scientist", "NumPy"),

    ("Mobile Developer", "React Native"),
    ("Mobile Developer", "Flutter")
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
