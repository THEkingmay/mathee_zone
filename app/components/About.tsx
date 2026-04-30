import React from 'react';
import { FaGraduationCap } from "react-icons/fa";

const educationData = [
    {
        time: '2023 - Present',
        title: "Kasetsart University",
        subtitle: "Bachelor of Science in Computer Science",
        description: "Focusing on Software Engineering, Data Structures, and Modern Web Technologies."
    },
    {
        time: '2017 - 2023',
        title: 'Triam Udom Suksa Pattanakarn Ratchada',
        subtitle: 'Science-Mathematics Program',
        description: "Developed a strong foundation in analytical thinking and problem-solving."
    },
    {
        time: '2011 - 2017',
        title: "Rama 9 Kanchanaphisek School",
        subtitle: "Primary & Lower Secondary Education",
        description: "Early exploration into science and technology."
    }
];

export default function About() {
    return (
        <section id="education" className="w-full py-32 bg-[#fafafa] text-black">
            <div className="max-w-5xl mx-auto px-6 md:px-12">

                <div className="flex flex-col md:flex-row gap-16">
                    <div className="md:w-1/3">
                        <div className="sticky top-12">
                            <h2 className="text-4xl font-extrabold tracking-tighter mb-6">Education Journey</h2>
                            <p className="text-gray-500 leading-relaxed mb-8">
                                A timeline of my academic background and the milestones that have shaped my path as a developer.
                            </p>
                            <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
                                <div className="text-3xl font-bold mb-2">GPA 3.79</div>
                                <div className="text-xs font-bold uppercase tracking-widest text-gray-400">Current Academic Standing</div>
                            </div>
                        </div>
                    </div>

                    <div className="md:w-2/3">
                        <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-gray-200 before:via-gray-100 before:to-transparent">
                            {educationData.map((e, index) => (
                                <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-gray-50 text-gray-400 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 transition-colors group-hover:bg-black group-hover:text-white group-hover:border-black z-10">
                                        <FaGraduationCap size={16} />
                                    </div>
                                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl border border-gray-100 bg-white hover:border-gray-300 hover:shadow-md transition-all duration-300">
                                        <div className="flex items-center justify-between space-x-2 mb-1">
                                            <div className="font-bold text-gray-900">{e.title}</div>
                                            <time className="font-medium text-[10px] uppercase tracking-widest text-gray-400 bg-gray-50 px-2 py-1 rounded">{e.time}</time>
                                        </div>
                                        <div className="text-sm font-medium text-black mb-3">{e.subtitle}</div>
                                        <div className="text-gray-500 text-sm leading-relaxed">{e.description}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-32 text-center">
                    <div className="inline-block p-1 bg-gray-100 rounded-full mb-6">
                        <div className="px-4 py-1 bg-white rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm">Philosophical Note</div>
                    </div>
                    <blockquote className="text-2xl font-light italic text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        "Education is not the learning of facts, but the training of the mind to think."
                    </blockquote>
                    <cite className="block mt-4 text-xs font-bold uppercase tracking-widest text-gray-300">— Albert Einstein</cite>
                </div>

            </div>
        </section>
    );
}