import type { Skill } from "./skill";



type Props = {
    skill: Skill;
    onClick: () => void;
};

export default function SkillCard({
    skill,
    onClick,
}: Props) {

    return (
        <div
            onClick={onClick}
            className="skill-card cursor-pointer hover:shadow-lg transition-shadow duration-300"
        >

            <div className="skill-card-top">

                <div className="skill-icon">

                <img
                    src={`https://cdn.simpleicons.org/${skill.name}`}
                    alt={`${skill.name} icon`}
                />
            </div>
                <div className="skill-info">
                <h3>
                    {skill.name}
                </h3>

                <p>
                    Explore roadmap, jobs and companies
                </p>
                </div>
                </div>
                <span className="skill-level">
                    {skill.level}
                </span>

        </div>
    );
}
