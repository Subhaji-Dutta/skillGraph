import type { Skill } from "./skill";

type Props = {
    skill: Skill;
};

export default function SkillOverview({ skill }: Props) {
    return (
        <section className="skill-overview">

            <div className="skill-overview-main">

                <div className="overview-label">
                    <span className="overview-pulse" />
                    SELECTED SKILL
                </div>

                <div className="skill-overview-title-row">
                    <h2>{skill.name}</h2>

                    {skill.category && (
                        <span className="overview-category">
                            {skill.category}
                        </span>
                    )}
                </div>

                <p className="skill-overview-description">
                    Explore the learning path, career opportunities,
                    jobs and companies connected to {skill.name}.
                </p>

                <div className="overview-connections">

                    <div className="connection-item">
                        <span className="connection-icon">↳</span>
                        <div>
                            <strong>Learning Path</strong>
                            <span>Prerequisites & progression</span>
                        </div>
                    </div>

                    <div className="connection-item">
                        <span className="connection-icon">↗</span>
                        <div>
                            <strong>Career Opportunities</strong>
                            <span>Jobs requiring this skill</span>
                        </div>
                    </div>

                    <div className="connection-item">
                        <span className="connection-icon">◈</span>
                        <div>
                            <strong>Companies</strong>
                            <span>Organizations hiring</span>
                        </div>
                    </div>

                </div>

            </div>

            <div className="skill-overview-level">

                <span className="level-label">
                    CURRENT LEVEL
                </span>

                <strong className="level-value">
                    {skill.level}
                </strong>

                <span className="level-caption">
                    Skill proficiency
                </span>

            </div>

        </section>
    );
}
