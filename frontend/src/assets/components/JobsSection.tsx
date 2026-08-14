import type { Job } from "./skill";



type Props = {
    jobs: Job[];
};

export default function JobsSection({ jobs }: Props) {

    return (
        <div className="dashboard-card">

            <div className="card-header">

                <div>
                    <span className="card-label">
                        CAREER
                    </span>

                    <h3>
                        Jobs
                    </h3>
                </div>

                <span className="card-count">
                    {jobs.length}
                </span>

            </div>

            {jobs.length === 0 ? (

                <div className="empty-state">
                    No jobs found.
                </div>

            ) : (

                <div className="job-list">

                    {jobs.map((job, index) => (

                        <div
                            className="job-item"
                            key={`${job.job}-${index}`}
                        >

                            <div className="job-icon">
                                💼
                            </div>

                            <div>
                                <strong>
                                    {job.job}
                                </strong>

                                <span>
                                    Career opportunity
                                </span>
                            </div>

                        </div>

                    ))}

                </div>

            )}

        </div>
    );
}