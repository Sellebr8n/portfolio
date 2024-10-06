import { Button } from '@/components/ui/button';
import { GitHubLogoIcon, LinkedInLogoIcon, OpenInNewWindowIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import Link from 'next/link';
import DownloadButton from './components/DownloadButton';

export default function Landing() {
  return (
    <>
      <section className="p-8 bg-gradient-to-t from-indigo-800 to-primary min-h-screen flex flex-col justify-center items-center text-center">
        <div className="flex gap-4 mb-8">
          <Link href="https://github.com/Sellebr8n" target="_blank">
            <GitHubLogoIcon className="h-12 w-12 text-white" />
          </Link>
          <Link href="https://linkedin.com/in/ludvig-sellebraten" target="_blank">
            <LinkedInLogoIcon className="h-12 w-12 text-white" />
          </Link>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-white">
          Hi, I&apos;m Ludvig Sellebråten
        </h1>
        <br />
        <h3 className="text-4xl md:text-3xl font-bold text-white">
          Let&apos;s Build the Future Together!
        </h3>
        <p className="text-lg md:text-xl text-white mt-4">
          Fullstack Developer | Problem Solver | Tech Enthusiast
        </p>
        <div className="flex gap-2"></div>
        <a
          href="#contact"
          className="mt-8 inline-block bg-green-500 hover:bg-green-400 text-white font-semibold py-3 px-8 rounded-lg transition-all">
          Let&apos;s Talk!
        </a>
      </section>

      <section className="py-16 bg-white">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          I Build Powerful Solutions for the Digital Age
        </h2>
        <p className="text-center text-gray-500 mt-2">
          From user interfaces to backend systems, I’ve got you covered.
        </p>
        <div className="grid md:grid-cols-3 gap-8 mt-12 max-w-5xl mx-auto">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 text-blue-500 rounded-full flex justify-center items-center">
              <span className="text-2xl">🖥️</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800">Frontend Development</h3>
            <p className="text-gray-500 mt-2">
              Building beautiful, responsive web interfaces with React, NextJS, and more.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-green-100 text-green-500 rounded-full flex justify-center items-center">
              <span className="text-2xl">📱</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800">Mobile App Development</h3>
            <p className="text-gray-500 mt-2">
              Developing high-performance mobile apps with React Native.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 text-purple-500 rounded-full flex justify-center items-center">
              <span className="text-2xl">⚙️</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800">Backend Solutions</h3>
            <p className="text-gray-500 mt-2">
              Creating scalable backend systems with Dotnet, NodeJS, and more.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <h2 className="text-3xl font-bold text-center text-gray-800">The Tools I Use</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-4xl mx-auto">
          <Image
            width={64}
            height={64}
            src="/images/React-icon.png"
            alt="React"
            className="mx-auto"
          />
          <Image
            width={64}
            height={64}
            src="/images/next-js.svg"
            alt="NextJS"
            className="mx-auto"
          />
          <Image width={64} height={64} src="/images/dotnet.png" alt="Dotnet" className="mx-auto" />
          <Image
            width={64}
            height={64}
            src="/images/Microsoft_Azure.png"
            alt="Azure"
            className="mx-auto"
          />
          <Image width={64} height={64} src="/images/expo.png" alt="Expo" className="mx-auto" />
          <Image width={64} height={64} src="/images/ts.svg" alt="Typescript" className="mx-auto" />
          <Image
            width={64}
            height={64}
            src="/images/Logo_C_sharp.png"
            alt="Typescript"
            className="mx-auto"
          />
          <Image
            width={64}
            height={64}
            src="/images/microsoft-sql-server-logo.svg"
            alt="Typescript"
            className="mx-auto"
          />
        </div>
      </section>

      <section id="about" className="py-16 bg-white">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <div className="relative w-48 h-48 overflow-hidden rounded-full bg-primary object-cover mb-8 md:mb-0 md:mr-8">
            <Image
              width={192}
              height={192}
              src="/images/sprite.webp"
              alt="Ludvig Sellebråten"
              className="object-cover top-3 absolute"
            />
          </div>
          <div className="p-4">
            <h2 className="text-3xl font-bold text-gray-800">About Me</h2>
            <p className="mt-4 text-gray-600">
              I am a Fullstack Developer with a deep love for coding and a diverse background,
              including experience in the broadcast industry. My journey in tech has led me to
              specialize in frontend development, though I also have a strong grasp of backend
              technologies. I thrive on solving complex challenges and am always eager to learn new
              technologies and methodologies to deliver high-quality solutions.
            </p>

            <p className="mt-4 text-gray-600">
              Currently, I work at{' '}
              <Link className="text-orange-500" href="www.laget.se">
                laget.se
              </Link>
              , a platform that helps sports clubs manage their members, teams, and finances. My
              role involves developing new features, maintaining the codebase, and leading the
              mobile app development using React Native. My experience spans from web app
              development with React and NextJS to API development with Dotnet Core, alongside a
              variety of backend tools like MS SQL Server and MongoDB.
            </p>

            <p className="mt-4 text-gray-600">
              Prior to my work at laget.se, I contributed as a Frontend Developer at Eyevinn
              Technology, focusing on streaming solutions for media companies. I’ve also been part
              of the team at Viaplay, where I took on the role of Team Lead and contributed to
              broadcast operations.
            </p>

            <p className="mt-4 text-gray-600">
              With a prestigeless approach to teamwork, I believe that adaptability, collaboration,
              and a commitment to continuous learning are key to success. I am constantly evolving
              as a developer, and my goal is to help businesses build innovative solutions that meet
              their users needs.
            </p>

            <p className="mt-4 text-gray-600">
              In my spare time, you can find me coding personal projects, playing guitar, or
              enjoying time with friends and family.
            </p>
          </div>
          <div className="flex items-center gap-4 mt-8">
            <Button variant={'outline'} className="text-primary">
              <Link href="/resume" target="_blank">
                Check out my CV
              </Link>
              <OpenInNewWindowIcon className="ml-1" />
            </Button>
            <div>or</div>
            <DownloadButton />
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <h2 className="text-3xl font-bold text-center text-gray-800">Were I've worked</h2>
        <div className="grid md:grid-cols-2 gap-8 mt-12 max-w-5xl mx-auto">
          <div className="bg-white shadow-md rounded-lg p-6">
            <Link href="https://www.laget.se" target="_blank">
              <Image
                width={200}
                height={200}
                src="/images/lagetse.png"
                alt="Laget.se"
                className="w-full h-40 object-cover rounded-t-lg"
              />
            </Link>
            <h3 className="mt-4 text-xl font-semibold text-gray-800">Laget.se</h3>
            <p className="text-gray-500 mt-2">
              A platform for sports clubs to manage teams and finances.
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <Link href="https://www.eyevinntechnology.se/" target="_blank">
              <Image
                width={200}
                height={200}
                src="/images/eyevinn.png"
                alt="Eyevinn Technology"
                className="w-full h-40 object-cover rounded-t-lg"
              />
            </Link>
            <h3 className="mt-4 text-xl font-semibold text-gray-800">Eyevinn Technology</h3>
            <p className="text-gray-500 mt-2">Streaming solutions for media companies.</p>
          </div>
        </div>
      </section>

      <section id="contact" className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto text-center borde bg-white border-gray-200 p-8 shadow-lg rounded-lg">
          <h2 className="text-4xl font-bold">Let’s Connect</h2>
          <p className="mt-4 text-lg">
            Ready to bring your ideas to life? Get in touch, and let’s chat about how I can help!
          </p>
          <form action="#" method="POST" className="mt-8">
            <div className="grid grid-cols-1 gap-6">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-4 rounded-md text-gray-800"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-4 rounded-md text-gray-800"
              />
              <textarea
                placeholder="Your Message"
                rows={5}
                className="w-full p-4 rounded-md text-gray-800"></textarea>
            </div>
            <button
              type="submit"
              className="mt-6 bg-green-500 hover:bg-green-400 text-white py-3 px-8 rounded-lg transition-all">
              Send Message
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
