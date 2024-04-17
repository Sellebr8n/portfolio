import Link from 'next/link';


const links = [
  {
    title: 'Lights Out',
    description: 'A simple game where you turn off all the lights',
    link: '/projects/lightsout',
  },
  {
    title: 'Weather App',
    description: 'A simple weather app using OpenWeatherMap API',
    link: '/projects/weather',
  },
  {
    title: 'Markdown Previewer',
    description: 'A markdown previewer',
    link: '/projects/markdown',
  },
  {
    title: 'Drum Machine',
    description: 'A drum machine',
    link: '/projects/drum',
  },
  {
    title: 'Pomodoro Clock',
    description: 'A pomodoro clock',
    link: '/projects/pomodoro',
  },
];

const Card = ({
  title,
  description,
  link,
}: {
  title: string;
  description: string;
  link: string;
}) => (
  <div className="bg-white shadow-md rounded-lg p-4">
    <h2 className="text-xl font-bold">{title}</h2>
    <p>{description}</p>
    <Link href={link}>Go to {title}</Link>
  </div>
);

export default function Projects() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 text-center">
      <h1 className="text-4xl font-bold mb-8">Some of my projects</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {links.map((link) => (
          <Card
            key={link.title}
            title={link.title}
            description={link.description}
            link={link.link}
          />
        ))}
      </div>
    </main>
  );
}
