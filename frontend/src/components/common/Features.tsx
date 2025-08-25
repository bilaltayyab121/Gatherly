import { Calendar, CheckCircle, Shield, Users } from "lucide-react";

const Features = () => {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need for Successful Events
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Our platform provides all the tools to create, manage, and attend
            events with ease
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 md:p-8 transition-all hover:shadow-lg hover:-translate-y-1">
            <div className="bg-[#2563eb] text-white p-3 rounded-xl w-12 h-12 flex items-center justify-center mb-6">
              <Calendar className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Easy Event Creation
            </h3>
            <p className="text-gray-600 mb-4">
              Create beautiful event pages with all the details attendees need.
              Add custom questions, set capacity limits, and more.
            </p>
            <ul className="space-y-2">
              {[
                "Custom registration forms",
                "Multiple ticket types",
                "Payment processing",
                "Automatic confirmations",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center text-sm text-gray-600"
                >
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-6 md:p-8 transition-all hover:shadow-lg hover:-translate-y-1">
            <div className="bg-green-600 text-white p-3 rounded-xl w-12 h-12 flex items-center justify-center mb-6">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Seamless Participation
            </h3>
            <p className="text-gray-600 mb-4">
              Join events with a single click, receive reminders, and get all
              event information in one place.
            </p>
            <ul className="space-y-2">
              {[
                "One-click registration",
                "Calendar integration",
                "Mobile access",
                "Event reminders",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center text-sm text-gray-600"
                >
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 md:p-8 transition-all hover:shadow-lg hover:-translate-y-1">
            <div className="bg-purple-600 text-white p-3 rounded-xl w-12 h-12 flex items-center justify-center mb-6">
              <Shield className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Advanced Management
            </h3>
            <p className="text-gray-600 mb-4">
              Manage attendees, send updates, and track event performance with
              powerful organizer tools.
            </p>
            <ul className="space-y-2">
              {[
                "Attendee management",
                "Email communications",
                "Analytics dashboard",
                "Check-in tools",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center text-sm text-gray-600"
                >
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
