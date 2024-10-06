import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Resume Ludvig Sellebråten',
  description: 'Curriculum vitae of Ludvig Sellebråten',
};

const ResumePage = () => {
  return <iframe src="/resume/CV.html" className="w-full h-screen" title="Resume" />;
};

export default ResumePage;
