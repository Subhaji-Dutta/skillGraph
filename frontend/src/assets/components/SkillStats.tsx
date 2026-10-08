type Props = {
    skillName: string;
    prerequisites: number;
    jobs: number;
    companies: number;
};

export default function SkillStats({
    skillName,
    prerequisites,
    jobs,
    companies,
}: Props) {
    const stats = [
        {
            value: prerequisites,
            label: "Prerequisites",
            description: `Skills connected before ${skillName}`,
            icon: "↳",
        },
        {
            value: jobs,
            label: "Jobs",
            description: `Roles connected to ${skillName}`,
            icon: "↗",
        },
        {
            value: companies,
            label: "Companies",
            description: `Companies hiring for ${skillName}`,
            icon: "◈",
        },
    ];

    return (
        <section className="skill-stats">

            <div className="skill-stats-header">
                <div>
                    <span className="section-eyebrow">
                        GRAPH INSIGHTS
                    </span>

                    <h3>
                        {skillName} connections
                    </h3>

                    <p>
                        Explore the relationships discovered in the
                        Skill Graph for this technology.
                    </p>
                </div>
            </div>

            <div className="skill-stats-grid">
                {stats.map((stat) => (
                    <div
                        className="skill-stat-card"
                        key={stat.label}
                    >
                        <div className="skill-stat-top">
                            <span
                                className="skill-stat-icon"
                                aria-hidden="true"
                            >
                                {stat.icon}
                            </span>

                            <span className="skill-stat-label">
                                {stat.label}
                            </span>
                        </div>

                        <strong className="skill-stat-number">
                            {stat.value}
                        </strong>

                        <span className="skill-stat-description">
                            {stat.description}
                        </span>
                    </div>
                ))}
            </div>

        </section>
    );
}
