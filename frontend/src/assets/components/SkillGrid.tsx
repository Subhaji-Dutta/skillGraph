import SkillCard from "./SkillCard";
import type { Skill } from "./skill";


type Props = {
    skills: Skill[];
    onSelect: (skill: Skill) => void;
};

export default function SkillGrid({
    skills,
    onSelect,
}: Props) {

    if (skills.length === 0) {
        return (
            <div className="empty-state">
                No skills found.
            </div>
        );
    }

    return (
        <div className="skill-grid">

            {skills.map((skill) => (

                <SkillCard
                    key={skill.id}
                    skill={skill}
                
                    onClick={() => onSelect(skill)}
                />

            ))}

        </div>
    );
}