import { Star } from "lucide-react";

const testimonial = [
  {
    name: "Sarah Johnson",
    role: "Event Organizer",
    content:
      "EventHub has transformed how we manage our conferences. The registration process is smooth, and the analytics help us improve every event.",
    avatar: "SJ",
  },
  {
    name: "Michael Chen",
    role: "Marketing Director",
    content:
      "The ability to create custom registration forms has been a game-changer for our team. We're collecting better data and providing better experiences.",
    avatar: "MC",
  },
  {
    name: "Jessica Williams",
    role: "Community Manager",
    content:
      "I love how easy it is to communicate with attendees and keep everyone informed. The reminder system has significantly reduced no-shows.",
    avatar: "JW",
  },
];

const Testimonial = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Users Say
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it - hear from our community
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          {testimonial.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-2xl p-6 border border-gray-100"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-[#dbeafe] rounded-full flex items-center justify-center text-[#2563eb] font-bold">
                  {testimonial.avatar}
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-gray-900">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-600">"{testimonial.content}"</p>
              <div className="flex mt-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="w-4 h-4 text-yellow-400 fill-current"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
