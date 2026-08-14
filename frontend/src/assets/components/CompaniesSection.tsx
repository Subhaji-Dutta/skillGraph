import type { Company } from "./skill";


type Props = {
    companies: Company[];
};

export default function CompaniesSection({
    companies
}: Props) {

    return (
        <div className="dashboard-card">

            <div className="card-header">

                <div>
                    <span className="card-label">
                        INDUSTRY
                    </span>

                    <h3>
                        Companies
                    </h3>
                </div>

                <span className="card-count">
                    {companies.length}
                </span>

            </div>

            {companies.length === 0 ? (

                <div className="empty-state">
                    No companies found.
                </div>

            ) : (

                <div className="company-list">

                    {companies.map((company, index) => {

                        const logoUrl =
                            `https://img.logo.dev/${company.domain}?token=pk_ShKv4440QOmwuNQopMqTIg`;

                        return (
                            <div
                                className="company-item"
                                key={`${company.company}-${index}`}
                            >

                                <img
                                    src={logoUrl}
                                    alt={`${company.company} logo`}
                                    className="company-logo"
                                />

                                <div>
                                    <strong>
                                        {company.company}
                                    </strong>

                                    <span>
                                        {company.domain}
                                    </span>
                                </div>

                            </div>
                        );
                    })}

                </div>

            )}

        </div>
    );
}