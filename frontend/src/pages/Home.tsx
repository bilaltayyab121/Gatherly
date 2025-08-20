

import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Button from "../components/common/Button";
import {
  Calendar,
  Users,
  Plus,
  Shield,
  CheckCircle,
  Star,
  ArrowRight,
} from "lucide-react";

export default function Home() {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-1/2">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Discover & Create{" "}
              <span className="text-primary-600">Amazing Events</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Whether you're hosting or attending, EventHub makes event
              management seamless. Create stunning events, connect with
              participants, and make every gathering memorable.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              {isAuthenticated ? (
                <>
                  <Link to="/events">
                    <Button size="lg" className="flex items-center group">
                      Browse Events
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  {(user?.role === "ADMIN" || user?.role === "ORGANIZER") && (
                    <Link to="/events/create">
                      <Button
                        variant="secondary"
                        size="lg"
                        className="flex items-center"
                      >
                        <Plus className="mr-2 h-5 w-5" />
                        Create Event
                      </Button>
                    </Link>
                  )}
                </>
              ) : (
                <>
                  <Link to="/register">
                    <Button size="lg" className="flex items-center group">
                      Get Started Free
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Link to="/events">
                    <Button variant="secondary" size="lg">
                      Explore Events
                    </Button>
                  </Link>
                </>
              )}
            </div>

            <div className="mt-10 flex items-center space-x-6">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-primary-100 border-2 border-white flex items-center justify-center"
                  >
                    <span className="text-xs font-bold text-primary-600">
                      U{i}
                    </span>
                  </div>
                ))}
              </div>
              <div className="text-gray-600">
                <p className="font-medium">Join 5,000+ users</p>
                <div className="flex items-center mt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="w-4 h-4 text-yellow-400 fill-current"
                    />
                  ))}
                  <span className="ml-2 text-sm">4.9/5 rating</span>
                </div>
              </div>
            </div>
          </div>

          <div className="md:w-1/2">
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 transform rotate-2">
                <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl p-4 mb-4">
                  <h3 className="font-bold text-lg">Tech Conference 2023</h3>
                  <p className="text-sm opacity-90">
                    October 15-16, 2023 • San Francisco
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Type</span>
                    <span className="font-medium">Hybrid Event</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Attendees</span>
                    <span className="font-medium">245/300 Registered</span>
                  </div>
                  <div className="pt-4">
                    <div className="bg-gray-100 rounded-full h-2">
                      <div className="bg-primary-500 h-2 rounded-full w-4/5"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-lg p-4 border border-gray-100 transform -rotate-2 z-10">
                <div className="flex items-center">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium">Event Created</p>
                    <p className="text-xs text-gray-500">2 minutes ago</p>
                  </div>
                </div>
              </div>

              <div className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-lg p-4 border border-gray-100 transform rotate-3 z-10">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium">+24 Registered</p>
                    <p className="text-xs text-gray-500">In past hour</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for Successful Events
            </h2>
            <p className="text-xl text-gray-600">
              Our platform provides all the tools to create, manage, and attend
              events with ease
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 transition-all hover:shadow-lg hover:-translate-y-1">
              <div className="bg-primary-600 text-white p-3 rounded-xl w-12 h-12 flex items-center justify-center mb-6">
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

            <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-8 transition-all hover:shadow-lg hover:-translate-y-1">
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

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 transition-all hover:shadow-lg hover:-translate-y-1">
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
      <section className="py-16 md:py-24 bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Trusted by Thousands of Event Organizers
            </h2>
            <p className="text-xl text-primary-100">
              Join our growing community of event professionals and enthusiasts
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
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

          <div className="mt-16 bg-white/10 backdrop-blur-sm rounded-2xl p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-2">
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
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600">
              Don't just take our word for it - hear from our community
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
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
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-bold">
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

      {/* Footer CTA */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Start Creating Amazing Events Today
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of event organizers who trust EventHub to power their
            events
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isAuthenticated ? (
              <Link to="/events/create">
                <Button
                  size="lg"
                  className="bg-primary-600 hover:bg-primary-700"
                >
                  Create Your First Event
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/register">
                  <Button
                    size="lg"
                    className="bg-primary-600 hover:bg-primary-700"
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
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 py-2">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="bg-primary-600 text-white p-2 rounded-lg">
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

          <div className="py-4 border-t border-gray-700 text-center text-sm">
            <p>© {new Date().getFullYear()} Gatherly. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
