import type{ Roadmap } from "./skill";

type Props = {
    roadmap: Roadmap[];
};

export default function LearningRoadmap({ roadmap }: Props) {


    return (
        <div className="dashboard-card roadmap-card">

            <div className="card-header">

                <div>
                    <span className="card-label">
                        LEARNING PATH
                    </span>

                    <h3>
                        Learning Roadmap
                    </h3>
                </div>

                <span className="card-count">
                    {roadmap.length}
                </span>

            </div>

            {roadmap.length === 0 ? (

                <div className="empty-state">
                    No roadmap found for this skill.
                </div>

            ) : (

                <div className="roadmap-list">

                    {roadmap.map((item, index) => (

                        <div
                            className="roadmap-item"
                            key={`${item.prerequisite}-${item.level}-${index}`}
                        >

                            <div className="roadmap-number">
                                {index + 1}
                            </div>

                            <div className="roadmap-content">

                                <strong>
                                    {item.prerequisite}
                                </strong>

                                <span>
                                    {item.level}
                                </span>

                            </div>

                            {index < roadmap.length - 1 && (
                                <div className="roadmap-line" />
                            )}

                        </div>

                    ))}

                </div>

            )}

        </div>
    );
}