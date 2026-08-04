import { useEffect, useState } from "react";
import api from "../api";

export default function Home() {

    const [skills, setSkills] = useState([]);

    useEffect(() => {
    api.get("/skills")
        .then((res) => {
            setSkills(res.data);
        })
        .catch((err) => {
            console.error("API Error:", err);
        });
}, []);

const [roadmap, setRoadmap] = useState([]);
const [jobs, setJobs] = useState([]);
const [companies, setCompanies] = useState([]);

const loadSkill = async (skill: string) => {
    console.log("Clicked:", skill);

    try {
        const roadmapRes = await api.get(`/roadmap/${skill}`);
        console.log("Roadmap:", roadmapRes.data);

        const jobsRes = await api.get(`/jobs/${skill}`);
        console.log("Jobs:", jobsRes.data);

        const companiesRes = await api.get(`/companies/${skill}`);
        console.log("Companies:", companiesRes.data);

        setRoadmap(roadmapRes.data);
        setJobs(jobsRes.data);
        setCompanies(companiesRes.data);
    } catch (err) {
        console.error(err);
    }
};

    return (

        <div className="p-10">

            <h1 className="text-4xl font-bold mb-8">
                Skill Graph Explorer
            </h1>

            <div className="grid grid-cols-4 gap-4">

                {skills.map((skill: any) => (

                    <div
                        key={skill.id}
                        onClick={() => loadSkill(skill.name)}
                        className="border rounded-lg p-5 shadow hover:shadow-lg cursor-pointer"
                    >
                        <p>{skill.name}</p>
                        <p>{skill.level}</p>
                    </div>

                ))}

            </div>

        </div>

    )

}