type EventProps = {
  title: string;
  description: string;
  achievements?: {
    icon?: React.ReactNode;
    description: string;
  }[];
};

type Props = {
  events: EventProps[];
  heading: string;
};

const TimeLineEvent = ({
  title,
  description,
  achievements,
  isLastItem,
}: EventProps & { isLastItem: boolean }) => {
  return (
    <div className="relative pl-4">
      {!isLastItem && <div className="absolute w-1 h-[calc(100%-.05rem)] top-5 bg-pink-300" />}
      <div className="absolute w-3 h-3 top-[0.35em] left-3 rounded-full bg-pink-400" />
      <div className="pl-6">
        <p className="my-4 font-bold">{title}</p>
        <p className="text-sm">{description}</p>
        {achievements && (
          <ul className="text-sm py-3">
            {achievements.map((achievement, index) => (
              <li key={index} className="flex items-center">
                {achievement.icon}
                <p className="pl-2 font-bold">{achievement.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

const Timeline = ({ events, heading }: Props) => {
  return (
    <section className="p-4">
      <h3 className="text-2xl font-bold mb-8">{heading}</h3>
      {events.map((event, index) => (
        <TimeLineEvent
          key={index}
          title={event.title}
          description={event.description}
          achievements={event.achievements}
          isLastItem={index === events.length - 1}
        />
      ))}
    </section>
  );
};

export default Timeline;
