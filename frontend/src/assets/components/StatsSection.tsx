type Props = {
    skills: number;
    jobs: number;
    companies: number;

    labels?:{
        skills?: string;
        jobs?: string;
        companies?: string;
    }
};

export default function StatsSection({
    skills,
    jobs,
    companies,
    labels
}: Props) {

    return (

        <section className="stats">

            <div className="stat-card">

                <span>
                    {labels?.skills ?? "Skills"}
                </span>

                <strong>
                    {skills}
                </strong>

            </div>


            <div className="stat-card">

                <span>
                    {labels?.jobs ?? "Jobs"}
                </span>

                <strong>
                    {jobs}
                </strong>

            </div>


            <div className="stat-card">

                <span>
                    {labels?.companies ?? "Companies"}
                </span>

                <strong>
                    {companies}
                </strong>

            </div>

        </section>
    );
}