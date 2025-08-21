import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Button from "../components/common/Button";
import {
  Calendar,
  Users,
  Shield,
  CheckCircle,
  Star,
  MessageCircle,
  MapPin,
} from "lucide-react";
import Hero from "../components/common/Hero";

export default function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
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
                Create beautiful event pages with all the details attendees
                need. Add custom questions, set capacity limits, and more.
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

      {/* Stats Section */}
      {/* 
      <section className="py-16 md:py-24 bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Trusted by Thousands of Event Organizers
            </h2>
            <p className="text-lg md:text-xl text-primary-100 max-w-3xl mx-auto">
              Join our growing community of event professionals and enthusiasts
            </p>
          </div>

          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">1.5K+</div>
              <div className="text-primary-200">Events Created</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">5K+</div>
              <div className="text-primary-200">Happy Users</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">24/7</div>
              <div className="text-primary-200">Support</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">99.9%</div>
              <div className="text-primary-200">Uptime</div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto mt-16 bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h3 className="text-xl md:text-2xl font-bold mb-2">
                  Ready to get started?
                </h3>
                <p className="text-primary-100">
                  Create your first event in minutes
                </p>
              </div>
              <div>
                {isAuthenticated ? (
                  <Link to="/events/create">
                    <Button
                      size="lg"
                      variant="secondary"
                      className="bg-white text-primary-600 hover:bg-gray-100"
                    >
                      Create Event
                    </Button>
                  </Link>
                ) : (
                  <Link to="/register">
                    <Button
                      size="lg"
                      variant="secondary"
                      className="bg-white text-primary-600 hover:bg-gray-100"
                    >
                      Sign Up Free
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section> */}

      <section
        className="py-16 md:py-24 text-white"
        style={{
          background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
        }}
      >
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Trusted by Thousands of Event Organizers
            </h2>
            <p className="text-lg md:text-xl text-primary-100 max-w-3xl mx-auto">
              Join our growing community of event professionals and enthusiasts
            </p>
          </div>

          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">1.5K+</div>
              <div className="text-primary-200">Events Created</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">5K+</div>
              <div className="text-primary-200">Happy Users</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">24/7</div>
              <div className="text-primary-200">Support</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">99.9%</div>
              <div className="text-primary-200">Uptime</div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto mt-16 bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h3 className="text-xl md:text-2xl font-bold mb-2">
                  Ready to get started?
                </h3>
                <p className="text-primary-100">
                  Create your first event in minutes
                </p>
              </div>
              <div>
                {isAuthenticated ? (
                  <Link to="/events/create">
                    <Button
                      size="lg"
                      variant="secondary"
                      className="bg-white text-primary-600 hover:bg-gray-100"
                    >
                      Create Event
                    </Button>
                  </Link>
                ) : (
                  <Link to="/register">
                    <Button
                      size="lg"
                      variant="secondary"
                      className="bg-white text-primary-600 hover:bg-gray-100"
                    >
                      Sign Up Free
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
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
            {[
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
            ].map((testimonial, index) => (
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

      {/* Event Types Section */}
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
            {[
              {
                icon: <MessageCircle className="h-8 w-8 text-blue-600" />,
                title: "Conferences",
                description:
                  "Professional gatherings with speakers and workshops",
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
            ].map((type, index) => (
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

      {/* Footer CTA */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Start Creating Amazing Events Today
            </h2>
            <p className="text-lg md:text-xl text-gray-300 mb-8">
              Join thousands of event organizers who trust Gatherly to power
              their events
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {isAuthenticated ? (
                <Link to="/events/create">
                  <Button
                    size="lg"
                    className="bg-[#2563eb] hover:bg-primary-700"
                  >
                    Create Your First Event
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/register">
                    <Button
                      size="lg"
                      className="bg-[#2563eb] hover:bg-primary-700"
                    >
                      Get Started Free
                    </Button>
                  </Link>
                  <Link to="/events">
                    <Button variant="secondary" size="lg">
                      Browse Events
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 py-12">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="bg-[#2563eb] text-white p-2 rounded-lg">
                <Calendar className="h-6 w-6" />
              </div>
              <span className="text-xl font-bold text-white">Gatherly</span>
            </div>

            <div className="flex space-x-6">
              <a href="#" className="hover:text-white transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Contact
              </a>
            </div>
          </div>

          <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-gray-700 text-center text-sm">
            <p>© {new Date().getFullYear()} EventHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
