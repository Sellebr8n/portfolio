import classNames from 'classnames';
import { HiMiniChevronDown } from 'react-icons/hi2';
import ScrollIntoView from './shared/components/client.ScrollIntoView';
import Links from './shared/components/server.Links';
import Paragraph from './shared/components/server.Paragraph';

const Landing = () => {
  return (
    <section
      id="landing"
      className={classNames(
        'relative min-h-screen flex flex-col justify-center items-center',
        'bg-gradient-to-b from-slate-100 to-pink-200',
        'dark:bg-gradient-to-b dark:from-slate-900 dark:to-indigo-900'
      )}>
      <div className="p-24">
        <h1 className="text-center text-5xl md:text-6xl font-bold mb-6">Hi, I&rsquo;m Ludvig!</h1>

        <Paragraph>
          I&rsquo;m a software engineer based in Stockholm. I love to build things, learn new
          technologies and share my knowledge with others. <br />
          <br /> I&rsquo;m currently working at{' '}
          <a className="text-orange-500" target="_blank" href="https://www.laget.se">
            laget.se
          </a>{' '}
          where I build and maintain the platform that thousands of sports clubs use to manage their
          teams, players and games.
        </Paragraph>
      </div>
      <Links />
      <div className="mt-auto">
        <ScrollIntoView id="about">
          About me <HiMiniChevronDown />
        </ScrollIntoView>
      </div>
    </section>
  );
};

export default Landing;
