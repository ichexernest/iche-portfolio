import  { useState } from 'react';
import { ExperienceType } from '../../types/types';

const ExperienceInfo = ({ jobs }: { jobs: ExperienceType[] }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeJob = jobs[activeIdx];


  return (
    <>
      {/* 主要內容區 */}
      <div className="w-full max-w-4xl flex flex-col md:flex-row">
        {/* 公司選單 */}
        <div className="flex md:flex-col overflow-x-auto py-5 md:overflow-x-visible md:w-1/4 mb-6 md:mb-0">
          <div className="flex md:flex-col space-x-2 md:space-x-0 md:space-y-2 min-w-max md:min-w-0">
            {jobs.map((job, idx) => (
              <button
                key={idx+ job.company}
                onClick={() => setActiveIdx(idx)}
                className={`
                  relative px-4 py-2 rounded-r-md whitespace-nowrap md:whitespace-normal text-left
                  transition-all duration-200 border-l-0 md:border-l-2
                  ${
                    idx === activeIdx
                      ? 'text-white bg-white/10 border-l-2 border-[#70c9eb] '
                      : 'text-white/70 hover:text-white hover:bg-white/5 border-transparent'
                  }
                `}
              >
                {job.company}
              </button>
            ))}
          </div>
        </div>

        {/* 經歷詳情 */}
        <div className="md:w-3/4 md:pl-8">
          <h3 className="text-xl sm:text-2xl md:text-3xl mb-2">
            {activeJob.role}{' '}
            <span className="text-[#70c9eb] hover:text-[#4a8399]"><a href={activeJob.website} target="_blank" rel="noopener noreferrer">@ {activeJob.company}</a></span>
          </h3>
          
          <p className="text-sm text-white/80 mb-4">{activeJob.date}</p>
          
          <ul className="space-y-3">
            {activeJob.points.map((point, i) => (
              <li key={i} className="flex items-start">
                <span className="mt-1 text-[#70c9eb] mr-3 flex-shrink-0">▹</span>
                <p className="text-white/70 text-sm sm:text-base leading-relaxed">{point}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      </>
  );
};

export default ExperienceInfo