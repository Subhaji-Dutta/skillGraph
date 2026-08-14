export type Skill = {
    id: string;
    name: string;
    level: string;
    icon: string;
    category: string;
};

export type Stats = {
    skills: number;
    jobs: number;
    companies: number;
};

export type ApiSkill = {
    skill: string;
    level: string;
    icon: string;
    category: string;
};

export type Roadmap = {
    skill: string;
    prerequisite: string;
    level: number;
};

export type Job = {
    job: string;
};

export type Company = {
    company: string;
    domain: string;
};

export type SkillStats = {
    skill: string;
    prerequisites: number;
    jobs: number;
    companies: number;
};