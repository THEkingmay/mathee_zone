import React from 'react';
import { CiInstagram, CiFacebook } from "react-icons/ci";
import { GrGithub } from "react-icons/gr";
import { BiLogoGmail } from "react-icons/bi";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FiDownload, FiEye } from "react-icons/fi";

const TechBadge = ({ name, isExpert } : {name : string , isExpert : boolean}) => {
    const baseStyle = "rounded-full font-medium inline-flex items-center justify-center text-[0.75rem] px-4 py-1.5 m-1 transition-all duration-300";
    const expertStyle = "bg-black text-white shadow-sm hover:scale-105";
    const normalStyle = "bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200 hover:text-black";

    return (
        <span className={`${baseStyle} ${isExpert ? expertStyle : normalStyle}`}>
            {name}
        </span>
    );
};

export default function Home() {
  const expertSkills = ['Next.js', 'React', 'TypeScript', 'JavaScript'];
  const otherSkills = ['Node.js','ORM', 'GIT' , 'DOCKER' , 'Python', 'Tailwind', 'SQL'];

  return (
    <div className="w-full flex flex-col justify-center items-center min-h-screen bg-[#fafafa] text-black overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-50 rounded-full blur-[120px] opacity-50 pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-gray-100 rounded-full blur-[120px] opacity-50 pointer-events-none"></div>

      <div className="text-center z-10 px-6 max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-1000">

        <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 bg-white border border-gray-200 rounded-full shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-500">Available for Projects</span>
        </div>

        <h1 className="font-extrabold mb-4 text-5xl md:text-7xl tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-black to-gray-600">
          Mathee Rewbumrung
        </h1>

        <p className="mb-8 text-gray-500 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
          Computer Science Student at KU. <br className="hidden md:block" /> 
          Crafting digital experiences with <span className="font-medium text-black underline decoration-gray-300 underline-offset-4">purpose</span> and <span className="font-medium text-black underline decoration-gray-300 underline-offset-4">precision</span>.
        </p>

        <div className="mb-12">
            <div className="flex flex-wrap justify-center mb-3">
                {expertSkills.map(s => (
                    <TechBadge key={s} name={s} isExpert={true} />
                ))}
            </div>
            <div className="flex flex-wrap justify-center">
                {otherSkills.map(s => (
                    <TechBadge key={s} name={s} isExpert={false} />
                ))}
            </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <a 
            href="/resume.pdf" 
            target="_blank" 
            className="flex items-center justify-center gap-2 px-8 py-4 bg-black text-white rounded-full font-medium transition-all hover:bg-gray-800 hover:shadow-lg hover:-translate-y-1 active:scale-95"
          >
            <FiEye className="text-lg" />
            View Resume
          </a>
          <a 
            href="/resume.pdf" 
            download 
            className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-black border border-gray-200 rounded-full font-medium transition-all hover:border-black hover:shadow-md hover:-translate-y-1 active:scale-95"
          >
            <FiDownload className="text-lg" />
            Download CV
          </a>
        </div>

        <div className="flex gap-8 justify-center items-center">
          <a href="https://github.com/THEkingmay" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-black transition-all hover:-translate-y-1" title="GitHub">
            <GrGithub size={24} />
          </a>
          <a href="https://www.instagram.com/dekchaimay3" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-black transition-all hover:-translate-y-1" title="Instagram">
            <CiInstagram size={28} />
          </a>
          <a href="https://www.facebook.com/mathee.rewbumrung/" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-black transition-all hover:-translate-y-1" title="Facebook">
            <CiFacebook size={28} />
          </a>
          <a href="mailto:beerranee@gmail.com" className="text-gray-400 hover:text-black transition-all hover:-translate-y-1" title="Email">
            <BiLogoGmail size={26} />
          </a>
          <a href="tel:+66627768686" className="text-gray-400 hover:text-black transition-all hover:-translate-y-1" title="Phone">
            <BsFillTelephoneFill size={20} />
          </a>
        </div>

      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-20">
        <div className="w-1 h-10 rounded-full bg-gradient-to-b from-black to-transparent"></div>
      </div>
    </div>
  );
}