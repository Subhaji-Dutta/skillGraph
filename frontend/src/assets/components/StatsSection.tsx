type Props = {
    skills: number;
    jobs: number;
    companies: number;

    labels?: {
        skills?: string;
        jobs?: string;
        companies?: string;
    };
};

export default function StatsSection({
    skills,
    jobs,
    companies,
    labels,
}: Props) {
    const stats = [
        {
            label: labels?.skills ?? "Skills",
            value: skills,
            icon: "✦",
            description: "Technologies to explore",
        },
        {
            label: labels?.jobs ?? "Jobs",
            value: jobs,
            icon: "↗",
            description: "Career opportunities",
        },
        {
            label: labels?.companies ?? "Companies",
            value: companies,
            icon: "◈",
            description: "Companies hiring",
        },
    ];

    return (
        <section className="stats" aria-label="Skill Graph statistics">
            {stats.map((stat) => (
                <div className="stat-card" key={stat.label}>

                    <div className="stat-icon" aria-hidden="true">
                        {stat.icon}
                    </div>

                    <div className="stat-content">
                        <span className="stat-label">
                            {stat.label}
                        </span>

                        <strong className="stat-value">
                            {stat.value}
                        </strong>

                        <span className="stat-description">
                            {stat.description}
                        </span>
                    </div>

                </div>
            ))}
        </section>
    );
}
