import Image from 'next/image';
import Link from 'next/link';

const links = [
  {
    title: 'Lights Out',
    description: 'A simple game where you turn off all the lights',
    link: '/projects/lightsout',
    image: '/images/lights-out.png',
  },
  {
    title: 'Drum Machine',
    description: 'A drum machine',
    link: '/projects/drum-maschine',
    image: '/images/drum-machine.png',
  },
  {
    title: 'SharpTypes',
    description: 'A project that generates TypeScript types from C# classes',
    link: 'https://github.com/Sellebr8n/SharpTypes',
    image: '/images/ts-love-dotnet.webp',
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
];

export default function Projects() {
  return (
    <section className="py-16 bg-gray-50 h-full">
      <h2 className="text-3xl font-bold text-center text-gray-800">Some of my projects</h2>
      <div className="grid md:grid-cols-2 gap-8 mt-12 max-w-5xl mx-auto">
        {links.map((link) => (
          <Link href={link.link} key={link.title} className="bg-white shadow-md rounded-lg p-6">
            <Image
              width={200}
              height={200}
              src={link.image || '/images/dotnet.png'}
              alt="Laget.se"
              className="w-full h-40 object-cover rounded-t-lg"
            />
            <h3 className="mt-4 text-xl font-semibold text-gray-800">{link.title}</h3>
            <p className="text-gray-500 mt-2">{link.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
