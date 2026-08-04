from database import execute_query


def get_all_skills():
    query = """
    MATCH (s:Skill)
    RETURN s.name AS skill
    ORDER BY skill
    """
    return execute_query(query)


def get_skill_roadmap(skill_name):
    query = """
    MATCH path=(s:Skill {name:$skill})-[:REQUIRES*1..5]->(pre:Skill)
    RETURN
        s.name AS skill,
        pre.name AS prerequisite,
        length(path) AS level
    ORDER BY level
    """

    return execute_query(query, {"skill": skill_name})


def get_jobs(skill_name):
    query = """
    MATCH (j:Job)-[:REQUIRES]->(s:Skill {name:$skill})
    RETURN j.title AS job
    ORDER BY job
    """

    return execute_query(query, {"skill": skill_name})


def get_companies(skill_name):
    query = """
    MATCH (c:Company)-[:USES]->(s:Skill {name:$skill})
    RETURN c.name AS company
    ORDER BY company
    """

    return execute_query(query, {"skill": skill_name})