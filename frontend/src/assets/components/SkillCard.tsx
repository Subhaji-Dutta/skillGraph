import type { Skill } from "./skill";

type Props = {
    skill: Skill;
    onClick: () => void;
};

/**
 * Simple Icons slugs for common skills.
 * Using explicit mappings is much more reliable than
 * generating the slug directly from the skill name.
 */
const iconMap: Record<string, string> = {
    python: "python",
    java: "openjdk",
    javascript: "javascript",
    typescript: "typescript",
    react: "react",
    "react.js": "react",
    node: "nodedotjs",
    "node.js": "nodedotjs",

    html: "html5",
    css: "css3",
    "c++": "cplusplus",
    "c#": "csharp",

    sql: "postgresql",
    mysql: "mysql",
    postgresql: "postgresql",
    mongodb: "mongodb",

    aws: "amazonaws",
    azure: "microsoftazure",
    gcp: "googlecloud",

    docker: "docker",
    kubernetes: "kubernetes",
    git: "git",
    github: "github",
    gitlab: "gitlab",

    "power bi": "powerbi",
    tableau: "tableau",
    excel: "microsoftexcel",

    "machine learning": "scikitlearn",
    tensorflow: "tensorflow",
    pytorch: "pytorch",

    fastapi: "fastapi",
    django: "django",
    flask: "flask",

    linux: "linux",
    "ci/cd": "githubactions",
    "ci cd": "githubactions",

    spring: "spring",
    "spring boot": "springboot",
    redis: "redis",
    graphql: "graphql",
    firebase: "firebase",

    php: "php",
    swift: "swift",
    kotlin: "kotlin",
    dart: "dart",
    flutter: "flutter",
};

/**
 * Get the Simple Icons slug for a skill.
 */
const getIconSlug = (skillName: string): string => {
    const normalizedName = skillName.trim().toLowerCase();

    return (
        iconMap[normalizedName] ||
        normalizedName
            .replace(/\s+/g, "")
            .replace(/[.#]/g, "")
            .replace(/\+\+/g, "plusplus")
            .replace(/[^a-z0-9]/g, "")
    );
};

export default function SkillCard({
    skill,
    onClick,
}: Props) {
    const iconSlug = getIconSlug(skill.name);

    const iconUrl = `https://cdn.simpleicons.org/${iconSlug}`;

    return (
        <button
            type="button"
            onClick={onClick}
            className="skill-card"
            aria-label={`Explore ${skill.name}`}
        >
            <div className="skill-card-top">

                <div className="skill-icon">
                    <img
                        src={iconUrl}
                        alt=""
                        loading="lazy"
                        onError={(event) => {
                            const img = event.currentTarget;

                            // Hide broken image instead of showing
                            // the browser's broken-image icon.
                            img.style.display = "none";

                            const fallback =
                                img.parentElement?.querySelector(
                                    ".skill-icon-fallback"
                                ) as HTMLElement | null;

                            if (fallback) {
                                fallback.style.display = "flex";
                            }
                        }}
                    />

                    <span
                        className="skill-icon-fallback"
                        aria-hidden="true"
                        style={{ display: "none" }}
                    >
                        {skill.name.charAt(0).toUpperCase()}
                    </span>
                </div>

                <div className="skill-info">
                    <h3>{skill.name}</h3>

                    {skill.category && (
                        <span className="skill-category">
                            {skill.category}
                        </span>
                    )}

                    <p>
                        Explore roadmap, jobs and companies
                    </p>
                </div>

                <span className="skill-arrow" aria-hidden="true">
                    →
                </span>
            </div>

            <div className="skill-card-bottom">
                <span className="skill-level">
                    {skill.level}
                </span>

                <span className="skill-explore">
                    Explore
                </span>
            </div>
        </button>
    );
}
