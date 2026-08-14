type Props = {
    skillName: string;
    prerequisites: number;
    jobs: number;
    companies: number;
};

export default function SkillStats({
    prerequisites,
    jobs,
    companies,
}: Props) {
    return (
        <div className="skill-stats">

            <div className="skill-stats-grid">

                <div className="skill-stat-card">
                    <span className="skill-stat-number">
                        {prerequisites}
                    </span>

                    <span className="skill-stat-label">
                        Prerequisites
                    </span>
                </div>

                <div className="skill-stat-card">
                    <span className="skill-stat-number">
                        {jobs}
                    </span>

                    <span className="skill-stat-label">
                        Jobs
                    </span>
                </div>

                <div className="skill-stat-card">
                    <span className="skill-stat-number">
                        {companies}
                    </span>

                    <span className="skill-stat-label">
                        Companies
                    </span>
                </div>

            </div>

        </div>
    );
}