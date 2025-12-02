import { GlassCard } from "./GlassCard";
import { notableContent } from "../data/notableContent";

export const NotableContent = () => {
    return (
        <div className="container mx-auto px-4">
            <GlassCard className="mb-12 inline-block px-8 py-4">
                <h2 className="text-4xl font-bold text-center">
                    Notable <span className="text-[#7BAFD4]">Courses</span>
                </h2>
            </GlassCard>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {notableContent.map((course, index) => (
                    <GlassCard
                        key={course.id}
                        className="h-full flex flex-col p-6 hover:border-[#7BAFD4]/50 transition-colors duration-300"
                        delay={index * 0.1}
                    >
                        <div className="mb-4">
                            <span className="text-[#7BAFD4] font-bold text-sm tracking-wider uppercase">
                                {course.code}
                            </span>
                            <h3 className="text-xl font-bold mt-1">{course.name}</h3>
                        </div>

                        <p className="text-gray-300 text-sm leading-relaxed mb-6 flex-grow">
                            {course.description}
                        </p>

                        <div>
                            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                                Primary Skills
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {course.skills.map((skill, skillIndex) => (
                                    <span
                                        key={skillIndex}
                                        className="text-xs px-2 py-1 rounded-full bg-[#7BAFD4]/10 text-[#7BAFD4] border border-[#7BAFD4]/20"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </GlassCard>
                ))}
            </div>
        </div>
    );
};
