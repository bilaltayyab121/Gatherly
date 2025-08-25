import { Calendar, MapPin, MessageCircle, Users } from "lucide-react";

const events = [
  {
    icon: <MessageCircle className="h-8 w-8 text-blue-600" />,
    title: "Conferences",
    description: "Professional gatherings with speakers and workshops",
  },
  {
    icon: <Users className="h-8 w-8 text-green-600" />,
    title: "Meetups",
    description: "Casual gatherings for networking and socializing",
  },
  {
    icon: <Calendar className="h-8 w-8 text-purple-600" />,
    title: "Workshops",
    description: "Hands-on learning experiences with experts",
  },
  {
    icon: <MapPin className="h-8 w-8 text-red-600" />,
    title: "Virtual Events",
    description: "Online gatherings accessible from anywhere",
  },
];

const EventsTypes = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Events for Every Occasion
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            From small meetups to large conferences, we've got you covered
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.map((type, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-50 rounded-full mb-4">
                {type.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {type.title}
              </h3>
              <p className="text-gray-600 text-sm">{type.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsTypes;
