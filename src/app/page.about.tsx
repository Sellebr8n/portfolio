import { HiMiniChevronUp } from 'react-icons/hi2';
import { HiMiniTrophy } from 'react-icons/hi2';
import ScrollIntoView from './shared/components/client.ScrollIntoView';
import Timeline from './shared/components/server.Timeline';

type EventProps = {
  title: string;
  description: string;
  achievements?: {
    icon?: React.ReactNode;
    description: string;
  }[];
};
const events: EventProps[] = [
  {
    title: 'laget.se | 2022-2024',
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus aliquid aspernatur minus dolorem temporibus quibusdam consectetur dolor molestias quisquam veniam ab autem, molestiae, nam ducimus, excepturi veritatis voluptates doloribus architecto!',
  },
  {
    title: 'Eyevinn Technology | 2021-2023',
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus aliquid aspernatur minus dolorem temporibus quibusdam consectetur dolor molestias quisquam veniam ab autem, molestiae, nam ducimus, excepturi veritatis voluptates doloribus architecto! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus aliquid aspernatur minus dolorem temporibus quibusdam consectetur dolor molestias quisquam veniam ab autem, molestiae, nam ducimus, excepturi veritatis voluptates doloribus architecto! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus aliquid aspernatur minus dolorem temporibus quibusdam consectetur dolor molestias quisquam veniam ab autem, molestiae, nam ducimus, excepturi veritatis voluptates doloribus architecto!',
  },
  {
    title: 'Viaplay | 2021-2023',
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus aliquid aspernatur minus dolorem temporibus quibusdam consectetur dolor molestias quisquam veniam ab autem, molestiae, nam ducimus, excepturi veritatis voluptates doloribus architecto! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus aliquid aspernatur minus dolorem temporibus quibusdam consectetur dolor molestias quisquam veniam ab autem, molestiae, nam ducimus, excepturi veritatis voluptates doloribus architecto! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus aliquid aspernatur minus dolorem temporibus quibusdam consectetur dolor molestias quisquam veniam ab autem, molestiae, nam ducimus, excepturi veritatis voluptates doloribus architecto!',
    achievements: [
      {
        icon: <HiMiniTrophy className="text-pink-400" />,
        description: 'Employee of the year 2019',
      },
    ],
  },
];

const About = () => {
  return (
    <section id="about" className="min-h-screen container mx-auto md:p-8 py-4">
      <h2 className="text-2xl font-bold p-4">About me</h2>
      <p className="text-small m-4">
        I&apos;m a passionate fullstack developer with a diverse background in broadcast and a
        relentless drive for innovation. With 8 years of experience in the fast-paced world of
        broadcasting, I&apos;ve seamlessly transitioned into the realm of coding and development to
        pursue my true passion.
      </p>
      <p className="text-small m-4">
        While my expertise lies predominantly in frontend development, I also possess a solid
        foundation in backend technologies including MS SQL Server and .NET. Self-taught and
        continuously evolving, I thrive on challenges and am deeply committed to delivering
        high-quality solutions.
      </p>
      <Timeline heading="Experience" events={events} />
      <div className="flex flex-row justify-center">
        <ScrollIntoView id="landing">
          Go back up <HiMiniChevronUp />
        </ScrollIntoView>
      </div>
    </section>
  );
};

export default About;
