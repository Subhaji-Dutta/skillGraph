from database import execute_query


# -------------------------
# Get all skills
# -------------------------

def get_all_skills():
    query = """
        MATCH (s:Skill)
        RETURN s.name AS skill,
                s.level AS level,
                s.icon AS icon,
                s.category AS category
        ORDER BY skill
    """

    return execute_query(query)


# -------------------------
# Get skill roadmap
# -------------------------

def get_skill_roadmap(skill_name):
    query = """
    MATCH path=(s:Skill {name:$skill})-[:REQUIRES*1..5]->(pre:Skill)

    RETURN
        pre.name AS prerequisite,
        pre.level AS level,
        length(path) AS depth

    ORDER BY depth DESC
    """

    results = execute_query(query, {"skill": skill_name})

    for item in results:
        item.pop("depth", None)

    return results


# -------------------------
# Get jobs requiring skill
# -------------------------

def get_jobs(skill_name):
    query = """
        MATCH (j:Job)-[:REQUIRES]->(s:Skill {name: $skill})
        RETURN j.title AS job
        ORDER BY job
    """

    return execute_query(
        query,
        {"skill": skill_name}
    )


# -------------------------
# Get companies using skill
# -------------------------

def get_companies(skill_name):
    query = """
    MATCH (c:Company)-[:USES]->(s:Skill {name:$skill})

    RETURN
        c.name AS company,
        c.domain AS domain

    ORDER BY company
    """

    return execute_query(query, {"skill": skill_name})

def get_skill_stats(skill_name):
    query = """
    MATCH (s:Skill {name: $skill})

    OPTIONAL MATCH (s)-[:REQUIRES*1..5]->(pre:Skill)
    WITH s, count(DISTINCT pre) AS prerequisites

    OPTIONAL MATCH (j:Job)-[:REQUIRES]->(s)
    WITH s, prerequisites, count(DISTINCT j) AS jobs

    OPTIONAL MATCH (c:Company)-[:USES]->(s)
    RETURN
        s.name AS skill,
        prerequisites,
        jobs,
        count(DISTINCT c) AS companies
    """

    return execute_query(query, {"skill": skill_name})