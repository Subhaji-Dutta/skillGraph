import type { Skill } from "./skill";

type Props = {
    skill: Skill;
};

export default function SkillOverview({ skill }: Props) {

    return (
        <div className="skill-overview">

            <div>
                <span className="overview-label">
                    SELECTED SKILL
                </span>

                <h2>
                    {skill.name}
                </h2>

                <p>
                    Explore the learning path, career opportunities,
                    jobs and companies using {skill.name}.
                </p>
            </div>

            <div className="skill-level">

                <strong>
                    {skill.level}
                </strong>
            </div>

        </div>
    );
}