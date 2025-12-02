import { GlassCard } from "./GlassCard";
import LowesLogo from "../assets/Lowe's Logo.png";

export const Experience = () => {
    return (
        <div className="container mx-auto px-4">
            <GlassCard className="mb-12 inline-block px-8 py-4">
                <div className="flex items-center gap-4 justify-center">
                    <img
                        src={LowesLogo}
                        alt="Lowe's Logo"
                        className="h-12 w-auto rounded-xl bg-white/90 p-1"
                    />
                    <h2 className="text-4xl font-bold text-center">
                        Professional <span className="text-[#7BAFD4]">Experience</span>
                    </h2>
                </div>
            </GlassCard>

            <div className="grid grid-cols-1 gap-8">
                {/* AI Software Engineer Role */}
                <GlassCard className="p-8 hover:border-[#7BAFD4]/50 transition-colors duration-300">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                        <div>
                            <h3 className="text-2xl font-bold text-white">AI Software Engineer</h3>
                            <p className="text-[#7BAFD4] font-medium">Lowe's Companies, Inc.</p>
                        </div>
                        <div className="text-right mt-2 md:mt-0">
                            <p className="text-gray-400 text-sm">July 2025 - Present</p>
                            <p className="text-gray-500 text-xs">Charlotte, NC</p>
                        </div>
                    </div>

                    <div className="space-y-4 text-gray-300 leading-relaxed">
                        <p>
                            Hand-selected by VP to pivot into the Enterprise AI division following top-tier performance in core operations.
                            Rapidly upskilled in the Python ecosystem (<span className="text-[#7BAFD4]">FastAPI, Pydantic, LangChain</span>) to architect high-performance backend systems for enterprise-grade generative AI tools.
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>
                                Spearheaded the development of the <span className="text-white font-semibold">"LPS Insights Agent"</span> for the <span className="text-white font-semibold">MyLowe's Ecosystem</span>, taking ownership of the architecture and implementation to provide critical data synthesis for sales teams.
                            </li>
                            <li>
                                Contributed extensively to the <span className="text-white font-semibold">"LPS Shopping Agent,"</span> a core component of the MyLowe's Ecosystem, optimizing retrieval mechanisms and system prompts to improve accuracy for complex product queries.
                            </li>
                            <li>
                                Facilitated rapid Agile iteration loops and mentored associate software engineers, incorporating direct feedback from Territory Managers and Outside Sales Reps to deploy impactful feature updates weekly.
                            </li>
                        </ul>
                    </div>
                </GlassCard>

                {/* Software Engineer - Store Operations Role */}
                <GlassCard className="p-8 hover:border-[#7BAFD4]/50 transition-colors duration-300">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                        <div>
                            <h3 className="text-2xl font-bold text-white">Software Engineer - Store Operations</h3>
                            <p className="text-[#7BAFD4] font-medium">Lowe's Companies, Inc.</p>
                        </div>
                        <div className="text-right mt-2 md:mt-0">
                            <p className="text-gray-400 text-sm">July 2024 - July 2025</p>
                            <p className="text-gray-500 text-xs">Charlotte, NC</p>
                        </div>
                    </div>

                    <div className="space-y-4 text-gray-300 leading-relaxed">
                        <div className="bg-[#7BAFD4]/10 border border-[#7BAFD4]/20 rounded-lg p-4 mb-4">
                            <h4 className="text-[#7BAFD4] font-bold mb-1 flex items-center gap-2">
                                🏆 Performance Award
                            </h4>
                            <p className="text-sm text-gray-200">
                                Rated <span className="font-bold text-white">"Exceeding Expectations" (Top Tier)</span> in first-year performance review.
                            </p>
                        </div>

                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>
                                Served as the sole member of the US team initially, acting as the <span className="text-white font-semibold">Main Point of Contact</span> for the US side and leading the onboarding of subsequent engineering hires.
                            </li>
                            <li>
                                Played an extremely pivotal role in constructing a proprietary tasking platform deployed to <span className="text-white font-semibold">over 1,700 stores</span>, enabling associates to manage daily operations efficiently.
                            </li>
                            <li>
                                Engineered complex frontend solutions using <span className="text-[#7BAFD4]">React</span>, while implementing native Android capabilities to ensure seamless hardware integration on associate handheld devices.
                            </li>
                            <li>
                                Managed CI/CD pipelines and deployment strategies, ensuring high availability and stability for mission-critical store applications.
                            </li>
                        </ul>
                    </div>
                </GlassCard>
            </div>
        </div>
    );
};
