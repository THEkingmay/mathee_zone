import React from 'react';
import { FaGraduationCap } from "react-icons/fa";

const educationData = [
    {
        time: '2023-now',
        description: "Kasetsart University\nBachelor of Science in Computer Science"
    },
    {
        time: '2017-2023',
        description: 'Triam Udom Suksa Pattanakarn Ratchada School (TUPR)\nScience-Mathematics Program'
    },
    {
        time: '2011-2017',
        description: "Rama 9 Kanchanaphisek School\nPrimary and Lower Secondary Education"
    }
];

export default function About() {
    return (
        <section id="education" className="w-full min-h-screen py-24 bg-white text-black">
            <div className="max-w-4xl mx-auto px-6 md:px-12">
                
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold mb-4 tracking-tight">Education Journey</h2>
                    <p className="text-black/60 text-lg font-light">
                        My academic background and milestones.
                    </p>
                </div>

                <div className="flex flex-col gap-6">
                    {educationData.map((e, index) => (
                        <div key={index} className="group relative overflow-hidden p-6 md:p-8 rounded-2xl border border-black/10 bg-white hover:-translate-y-1 hover:shadow-xl hover:border-black/20 transition-all duration-300">
                            
                            <FaGraduationCap 
                                className="absolute -right-6 -bottom-6 text-[8rem] opacity-[0.03] -rotate-12 transition-transform duration-500 group-hover:scale-110" 
                            />

                            <div className="relative z-10 flex flex-col md:flex-row gap-6 md:gap-8 items-start">
                                <div className="flex-shrink-0">
                                    <span className="inline-block px-4 py-2 bg-black/5 text-black/80 rounded-full text-sm font-medium border border-black/5">
                                        {e.time}
                                    </span>
                                </div>

                                <div className="flex-grow">
                                    {e.description.split('\n').map((line, i) => (
                                        <div key={i}>
                                            {i === 0 ? (
                                                <h3 className="text-xl font-bold mb-3 text-black tracking-tight">
                                                    {line}
                                                </h3>
                                            ) : (
                                                <p className="mb-1 text-black/70 font-light leading-relaxed">
                                                    {line}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-16 text-sm text-black/40 italic font-light">
                    "Education is not the learning of facts, but the training of the mind to think."
                </div>

            </div>
        </section>
    );
}