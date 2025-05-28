import { ExperienceType } from '../../types/types';
import ExperienceInfo from '../Experience.info';
import GlobalTitle from '../Global.title';

const jobs: ExperienceType[] = [
  {
    company: 'Quanta Storage Inc.',
    role: 'Senior Software Engineer',
    date: 'Dec 2023 – Feb 2025',
    website: 'https://www.qsitw.com/page/en/index.html',
    points: [
      'Cross-Platform Tool Development: Independently developed multiple hardware support tools (e.g., Docking, SSD security/setting/update toolboxes) covering UI design and Electron (React.js + Node.js) development with CLI integration and packaging for Windows/macOS (including ARM). Reduced maintenance costs by 50% and created a reusable architecture for future custom projects',
      'Report System Implementation: Built a React.js-based SSD Module Report System integrated with APIs to automate data input and Excel export, improving cross-departmental data workflows by 60%',
      'UI System Planning & Collaboration: Led the UI design system of the NAS App using Figma to create 200+ screens and modular components. Standardized shared styles and collaborated with international teams, improving delivery efficiency by 30% and reducing the iteration cycle by 2 weeks',
      'Feature Module Development: Independently developed key NAS App modules including Surveillance and Snapshot. Integrated MediaMTX and ONVIF API to support multi-IP cam real-time monitoring, becoming a highlight in product demos and client-specific features'
    ],
  },
    {
    company: 'Chung Shu Biotech Co., Ltd.',
    role: 'Co-founder / Marketing & Technical Consultant',
    date: 'Dec 2021 – Present',
    website: 'https://goodmoods.store/',
    points: [
      'Developed interactive event web modules using LIFF (LINE Front-end Framework), improving campaign conversion rates by approximately 15%',
      'Created brand design guidelines and continuously optimized official website UX and member system logic',
      'Managed a 3-person design and planning team; established structured marketing workflows and copywriting templates, reducing campaign cycle time by 30% and maintaining stable conversion rates of 5–8%'
      ],
  },
  {
    company: 'Formosa Technologies Corporation',
    role: 'Software Engineer',
    date: 'Dec 2019 – Dec 2023',
    website: 'https://www.efpg.com.tw/ftc/zhtw/index.do',
    points: [
      'Core BPM Module Redesign & UX Optimization: Led UI/UX refactoring of the BPM system, identifying usability pain points and balancing stakeholder needs, including internal users (legacy habits), new end-user developers (streamlined onboarding), and customer decision-makers (clear product value). Designed layered interaction logic and implemented responsive pages using Flexbox and Bootstrap',
      'SPA Tool Development for BPM Extensions: Designed and implemented several BPM-related SPA tools (React.js + ASP.NET Core), such as an OCR annotation tool that reduced batch processing time from 1 hour to 5 minutes per 100+ documents, increasing efficiency by 80%',
      'Mobile Approval App Development: Developed a Flutter-based BPM mobile app tailored for executive signing flows, with custom responsive UI, push notifications, and light/dark modes. Delivered dual-platform support and entered pre-commercial pilot stage with multiple clients',
      'Tool & Workflow Integration: Introduced Figma to replace traditional design handoffs, enabling interactive wireframes and standardized UI components. Promoted and implemented a unified design-development workflow across business units'
    ],
  },
];

const educations: ExperienceType[] = [
  {
    company: 'Chang Gung University',
    role: 'Graduate Institute of Information Management',
    date: 'Sep 2017 – Aug 2019',
    website: 'https://www.cgu.edu.tw/en',
    points: [
      'Industry-Academia Collaboration: Developed a React Native kindergarten communication app',
      'Thesis: Design of a Secure Mechanism for Industrial IoT Based on Private Blockchain Technology'
        ],
  },
  {
    company: 'Chang Gung University',
    role: 'Department of Information Management',
    date: 'Sep 2013 – Jun 2017',
    website: 'https://www.cgu.edu.tw/en',
    points: [
    ],
  },
];

const Experience: React.FC = () => {
  return (
    <section
      id="experience"
      className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 md:px-8 lg:px-20 py-10 bg-[#000006] text-white"
    >
      <GlobalTitle title="Experience" />
      <div className='my-10' />
      <ExperienceInfo jobs={jobs} />
      <div className='my-10' />
      <ExperienceInfo jobs={educations} />
      <div className='my-10' />
    </section>
  );
};

export default Experience;