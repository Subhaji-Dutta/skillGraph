import { useEffect, useState } from "react";

import api from "../api";

import Header from "../assets/components/Header";
import StatsSection from "../assets/components/StatsSection";
import SearchBar from "../assets/components/SearchBard";
import SkillGrid from "../assets/components/SkillGrid";
import SkillDashboard from "../assets/components/SkillDashboard";
import SkillStats from "../assets/components/SkillStats";
import type{Skill, Roadmap, Job, Company, Stats, ApiSkill} from "../assets/components/skill";
import SkillOverview from "../assets/components/SkillOverview";



export default function Page() {

    const [skills, setSkills] = useState<Skill[]>([]);
    const [roadmap, setRoadmap] = useState<Roadmap[]>([]);
    const [jobs, setJobs] = useState<Job[]>([]);
    const [companies, setCompanies] = useState<Company[]>([]);
    const [showAllSkills, setShowAllSkills] = useState(false);
    const [selectedSkill, setSelectedSkill] =
        useState<Skill | null>(null);

    const [searchTerm, setSearchTerm] =
        useState("");

    const [loading, setLoading] =
        useState(false);
    
    const [stats, setStats] = useState<Stats>({
    skills: 0,
    jobs: 0,
    companies: 0
});

useEffect(() => {

    const loadData = async () => {

        try {

            const [skillsRes, statsRes] =
                await Promise.all([
                    api.get("/skills"),
                    api.get("/stats")
                ]);

            const formattedSkills: Skill[] =
                skillsRes.data.map((item: ApiSkill) => ({
                    id: item.skill
                        .toLowerCase()
                        .replace(/\s+/g, "-"),

                    name: item.skill,

                    level: item.level,
                    icon:item.icon,
                    category:item.category
                }));

            setSkills(formattedSkills);

            setStats(statsRes.data);

            console.log("Skills:", formattedSkills);
            console.log("Stats:", statsRes.data);

        } catch (err) {

            console.error(
                "Error loading page data:",
                err
            );

        }

    };

    loadData();

}, []);

    // -------------------------
    // Load skills
    // -------------------------

  useEffect(() => {
    api.get("/skills")
        .then((res) => {
            const formattedSkills: Skill[] = res.data.map(
                (item: ApiSkill) => ({
                    id: item.skill.toLowerCase().replace(/\s+/g, "-"),
                    name: item.skill,
                    level: item.level
                })
            );

            console.log("Skills:", formattedSkills);

            setSkills(formattedSkills);
        })
        .catch((err) => {
            console.error("Error loading skills:", err);
        });
}, []);


    // -------------------------
    // Load selected skill
    // -------------------------

const loadSkillDetails = async (skill: Skill) => {
    setSelectedSkill(skill);
    setShowAllSkills(false);

    try {
        const roadmapRes = await api.get(
            `/roadmap/${encodeURIComponent(skill.name)}`
        );

        const jobsRes = await api.get(
            `/jobs/${encodeURIComponent(skill.name)}`
        );

        const companiesRes = await api.get(
            `/companies/${encodeURIComponent(skill.name)}`
        );

        setRoadmap(roadmapRes.data);
        setJobs(jobsRes.data);
        setCompanies(companiesRes.data);
    } catch (err) {
        console.error("Error loading skill details:", err);
    }
};

    // -------------------------
    // Search
    // -------------------------

    const filteredSkills = skills.filter((skill) =>
        skill.name
            .toLowerCase()
            .includes(searchTerm.trim().toLowerCase())
    );

    const isSearching = searchTerm.trim().length > 0;

const visibleSkills = isSearching
    ? filteredSkills
    : showAllSkills
        ? filteredSkills
        : filteredSkills.slice(0, 4);


    return (

        <div className="page">

            <Header />

            <main>


                <StatsSection
                    skills={stats.skills}
                    jobs={stats.jobs}
                    companies={stats.companies}
                />


                {/* Search */}

                <section className="skills-section">

                    <div className="section-header">

                        <div>

                            <span className="section-label">
                                EXPLORE
                            </span>

                            <h2>
                                Skills
                            </h2>

                            <p>
                                Select a skill to explore
                                its career path.
                            </p>

                        </div>

                        <div className="skill-total">
                            {filteredSkills.length} skills
                        </div>

                    </div>


                    <SearchBar
                        value={searchTerm}
                        onChange={(value) => {
        setSearchTerm(value);
        setShowAllSkills(false);
    }}
                    />


                    <SkillGrid
                        skills={visibleSkills}
                        onSelect={loadSkillDetails}
                    />
    {!isSearching && filteredSkills.length > 5 && (
    <div className="show-more-container">
        <button
            className="show-more-button"
            onClick={() => setShowAllSkills((prev) => !prev)}
        >
            {showAllSkills ? "Show Less" : "Show More"}
        </button>
    </div>
)}

                </section>

               {selectedSkill && (

    <section className="dashboard-section">

        {loading ? (

            <div className="loading">
                Loading {selectedSkill.name}...
            </div>

        ) : (

            <>
                <SkillOverview skill={selectedSkill} />

                <SkillStats
                    skillName={selectedSkill.name}
                    prerequisites={roadmap.length}
                    jobs={jobs.length}
                    companies={companies.length}
                />

                <SkillDashboard
                    skill={selectedSkill}
                    roadmap={roadmap}
                    jobs={jobs}
                    companies={companies}
                />
            </>
        )}
    </section>
)}
            </main>
        </div>
    );
}