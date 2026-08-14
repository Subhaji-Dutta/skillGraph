
import LearningRoadmap from "./LearningRoadmap";
import JobsSection from "./JobsSection";
import CompaniesSection from "./CompaniesSection";
import type { Skill, Roadmap, Job, Company } from "./skill";

type Props = {
    skill: Skill;
    roadmap: Roadmap[];
    jobs: Job[];
    companies: Company[];
};

export default function SkillDashboard({
    roadmap,
    jobs,
    companies,
}: Props) {

    return (
        <section className="skill-dashboard">

            <div className="dashboard-grid">

                <LearningRoadmap
                    roadmap={roadmap}
                />

                <JobsSection
                    jobs={jobs}
                />

                <CompaniesSection
                    companies={companies}
                />

            </div>

        </section>
    );
}