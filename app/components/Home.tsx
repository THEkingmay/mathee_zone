import React from 'react';
import { CiInstagram, CiFacebook } from "react-icons/ci";
import { GrGithub } from "react-icons/gr";
import { BiLogoGmail } from "react-icons/bi";
import { BsFillTelephoneFill } from "react-icons/bs";

const TechBadge = ({ name, isExpert } : {name : string , isExpert : boolean}) => {
    const baseStyle = "rounded-full font-normal inline-flex items-center justify-center text-[0.8rem] px-4 py-2 m-1 backdrop-blur-sm transition-all duration-200";
    const expertStyle = "bg-black text-white border border-transparent";
    const normalStyle = "bg-black/5 text-black/60 border border-black/10";

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
    <div className="w-full flex flex-col justify-center items-center h-screen bg-white text-black transition-colors duration-300">
      <style>{`
        .social-icon {
          color: #374151;
          transition: all 0.2s ease;
          opacity: 0.8;
        }
        .social-icon:hover {
          color: #000;
          transform: translateY(-2px);
          opacity: 1;
        }
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .fade-in-up {
            animation: fadeInUp 0.8s ease-out forwards;
        }
      `}</style>

      <div className="text-center fade-in-up">

        <div className="inline-block px-4 py-1.5 mb-4 border border-black/80 rounded-full text-xs opacity-80 tracking-wide">
          Computer Science Student
        </div>

        <h1 className="font-bold mb-2 text-4xl tracking-tight">
          Mathee Rewbumrung
        </h1>

        <p className="mb-6 opacity-85 text-base">
          Building web & mobile applications with passion.
        </p>

        <div className="mb-10 max-w-[600px] mx-auto">
            <div className="flex flex-wrap justify-center mb-2">
                {expertSkills.map(s => (
                    <TechBadge key={s} name={s} isExpert={true} />
                ))}
            </div>
            <div className="flex flex-wrap justify-center opacity-75">
                {otherSkills.map(s => (
                    <TechBadge key={s} name={s} isExpert={false} />
                ))}
            </div>
        </div>

        <div className="flex gap-6 justify-center mb-2">
          <a href="https://github.com/THEkingmay" target="_blank" rel="noreferrer" className="social-icon">
            <GrGithub size={24} />
          </a>
          <a href="https://www.instagram.com/dekchaimay3" target="_blank" rel="noreferrer" className="social-icon">
            <CiInstagram size={26} />
          </a>
          <a href="https://www.facebook.com/mathee.rewbumrung/" target="_blank" rel="noreferrer" className="social-icon">
            <CiFacebook size={26} />
          </a>
          <a href="mailto:beerranee@gmail.com" className="social-icon">
            <BiLogoGmail size={24} />
          </a>
          <a href="tel:+66627768686" className="social-icon">
            <BsFillTelephoneFill size={18} />
          </a>
        </div>

      </div>
    </div>
  );
}