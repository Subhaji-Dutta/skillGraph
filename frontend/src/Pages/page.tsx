import { useEffect, useMemo, useState } from "react";

import api from "../api";

import Header from "../assets/components/Header";
import StatsSection from "../assets/components/StatsSection";
import SearchBar from "../assets/components/SearchBard";
import SkillGrid from "../assets/components/SkillGrid";
import SkillDashboard from "../assets/components/SkillDashboard";
import SkillStats from "../assets/components/SkillStats";
import SkillOverview from "../assets/components/SkillOverview";

import type {
    Skill,
    Roadmap,
    Job,
    Company,
    Stats,
    ApiSkill,
} from "../assets/components/skill";

export default function Page() {
    // --------------------------------------------------
    // State
    // --------------------------------------------------

    const [skills, setSkills] = useState<Skill[]>([]);

    const [roadmap, setRoadmap] = useState<Roadmap[]>([]);
    const [jobs, setJobs] = useState<Job[]>([]);
    const [companies, setCompanies] = useState<Company[]>([]);

    const [selectedSkill, setSelectedSkill] =
        useState<Skill | null>(null);

    const [searchTerm, setSearchTerm] = useState("");

    const [showAllSkills, setShowAllSkills] =
        useState(false);

    const [loading, setLoading] =
        useState(false);

    const [pageLoading, setPageLoading] =
        useState(true);

    const [error, setError] =
        useState<string | null>(null);

    const [stats, setStats] = useState<Stats>({
        skills: 0,
        jobs: 0,
        companies: 0,
    });


    // --------------------------------------------------
    // Load initial page data
    // --------------------------------------------------

    useEffect(() => {
        const loadData = async () => {
            try {
                setPageLoading(true);
                setError(null);

                const [skillsRes, statsRes] =
                    await Promise.all([
                        api.get("/skills"),
                        api.get("/stats"),
                    ]);

                const formattedSkills: Skill[] =
                    skillsRes.data.map(
                        (item: ApiSkill) => ({
                            id: item.skill
                                .toLowerCase()
                                .replace(/\s+/g, "-"),

                            name: item.skill,

                            level: item.level,

                            icon: item.icon,

                            category: item.category,
                        })
                    );

                setSkills(formattedSkills);
                setStats(statsRes.data);

            } catch (err) {
                console.error(
                    "Error loading page data:",
                    err
                );

                setError(
                    "Unable to load Skill Graph data. Please try again."
                );
            } finally {
                setPageLoading(false);
            }
        };

        loadData();
    }, []);


    // --------------------------------------------------
    // Search
    // --------------------------------------------------

    const filteredSkills = useMemo(() => {
        const query = searchTerm
            .trim()
            .toLowerCase();

        if (!query) {
            return skills;
        }

        return skills.filter((skill) => {
            const name =
                skill.name.toLowerCase();

            const category =
                skill.category?.toLowerCase() ?? "";

            return (
                name.includes(query) ||
                category.includes(query)
            );
        });
    }, [skills, searchTerm]);


    const isSearching =
        searchTerm.trim().length > 0;


    const visibleSkills =
        isSearching || showAllSkills
            ? filteredSkills
            : filteredSkills.slice(0, 6);


    // --------------------------------------------------
    // Load selected skill details
    // --------------------------------------------------

    const loadSkillDetails = async (
        skill: Skill
    ) => {
        setSelectedSkill(skill);
        setShowAllSkills(false);

        setLoading(true);

        // Clear previous skill data immediately.
        setRoadmap([]);
        setJobs([]);
        setCompanies([]);

        try {
            const [
                roadmapRes,
                jobsRes,
                companiesRes,
            ] = await Promise.all([
                api.get(
                    `/roadmap/${encodeURIComponent(
                        skill.name
                    )}`
                ),

                api.get(
                    `/jobs/${encodeURIComponent(
                        skill.name
                    )}`
                ),

                api.get(
                    `/companies/${encodeURIComponent(
                        skill.name
                    )}`
                ),
            ]);

            setRoadmap(roadmapRes.data);
            setJobs(jobsRes.data);
            setCompanies(companiesRes.data);

            // Scroll to dashboard after data is loaded.
            setTimeout(() => {
                document
                    .querySelector(
                        ".dashboard-section"
                    )
                    ?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                    });
            }, 100);

        } catch (err) {
            console.error(
                "Error loading skill details:",
                err
            );

            setRoadmap([]);
            setJobs([]);
            setCompanies([]);

        } finally {
            setLoading(false);
        }
    };


    // --------------------------------------------------
    // Search controls
    // --------------------------------------------------

    const clearSearch = () => {
        setSearchTerm("");
        setShowAllSkills(false);
    };


    // --------------------------------------------------
    // Render
    // --------------------------------------------------

    return (
        <div className="page">

            <Header />

            <main>

                {/* -------------------------------- */}
                {/* Initial loading */}
                {/* -------------------------------- */}

                {pageLoading ? (

                    <section className="page-loading">
                        <div className="loading-spinner" />

                        <p>
                            Loading Skill Graph...
                        </p>
                    </section>

                ) : error ? (

                    <section className="page-error">

                        <div className="page-error-icon">
                            !
                        </div>

                        <h2>
                            Something went wrong
                        </h2>

                        <p>
                            {error}
                        </p>

                        <button
                            type="button"
                            className="retry-button"
                            onClick={() =>
                                window.location.reload()
                            }
                        >
                            Try Again
                        </button>

                    </section>

                ) : (

                    <>
                        {/* -------------------------------- */}
                        {/* Statistics */}
                        {/* -------------------------------- */}

                        <StatsSection
                            skills={stats.skills}
                            jobs={stats.jobs}
                            companies={stats.companies}
                        />


                        {/* -------------------------------- */}
                        {/* Skills Explorer */}
                        {/* -------------------------------- */}

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
                                        Search a skill to discover
                                        its learning path, career
                                        opportunities and companies.
                                    </p>

                                </div>


                                <div className="skill-total">

                                    {isSearching
                                        ? `${filteredSkills.length} of ${skills.length} skills`
                                        : `${skills.length} skills`
                                    }

                                </div>

                            </div>


                            {/* Search */}

                            {/* <SearchBar
                                value={searchTerm}
                                onChange={setSearchTerm}
                            /> */}


                            {/* Results */}

                            {visibleSkills.length > 0 ? (

                                <SkillGrid
                                    skills={visibleSkills}
                                    onSelect={loadSkillDetails}
                                />

                            ) : (

                                <div className="no-results">

                                    <div className="no-results-icon">
                                        🔎
                                    </div>

                                    <h3>
                                        No skills found
                                    </h3>

                                    <p>
                                        We couldn't find a skill
                                        matching "{searchTerm}".
                                    </p>

                                    <button
                                        type="button"
                                        className="clear-search-button"
                                        onClick={clearSearch}
                                    >
                                        Clear search
                                    </button>

                                </div>

                            )}


                            {/* Show More */}

                            {!isSearching &&
                                filteredSkills.length > 6 && (

                                    <div className="show-more-container">

                                        <button
                                            type="button"
                                            className="show-more-button"
                                            onClick={() =>
                                                setShowAllSkills(
                                                    (prev) => !prev
                                                )
                                            }
                                        >
                                            {showAllSkills
                                                ? "Show Less"
                                                : `Show All ${filteredSkills.length} Skills`
                                            }
                                        </button>

                                    </div>
                                )}

                        </section>


                        {/* -------------------------------- */}
                        {/* Selected Skill Dashboard */}
                        {/* -------------------------------- */}

                        {selectedSkill && (

                            <section
                                className="dashboard-section"
                            >

                                {loading ? (

                                    <div className="loading">

                                        <div className="loading-spinner" />

                                        <p>
                                            Building your{" "}
                                            <strong>
                                                {selectedSkill.name}
                                            </strong>{" "}
                                            career path...
                                        </p>

                                    </div>

                                ) : (

                                    <>

                                        <SkillOverview
                                            skill={selectedSkill}
                                        />

                                        <SkillStats
                                            skillName={
                                                selectedSkill.name
                                            }
                                            prerequisites={
                                                roadmap.length
                                            }
                                            jobs={
                                                jobs.length
                                            }
                                            companies={
                                                companies.length
                                            }
                                        />

                                        <SkillDashboard
                                            skill={
                                                selectedSkill
                                            }
                                            roadmap={
                                                roadmap
                                            }
                                            jobs={
                                                jobs
                                            }
                                            companies={
                                                companies
                                            }
                                        />

                                    </>

                                )}

                            </section>
                        )}

                    </>
                )}

            </main>

        </div>
    );
}
