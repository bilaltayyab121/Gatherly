// global imports
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Plus, Star, Users } from "lucide-react";

// local imports
import Button from "./Button";
import { useAuth } from "../../context/AuthContext";

const Hero = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="md:w-1/2">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
            Discover & Create{" "}
            <span className="text-primary-600">Amazing Events</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
            Whether you're hosting or attending, EventHub makes event management
            seamless. Create stunning events, connect with participants, and
            make every gathering memorable.
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

            <div className="absolute -bottom-6 -left-4 md:-left-6 bg-white rounded-2xl shadow-lg p-4 border border-gray-100 transform -rotate-2 z-10">
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

            <div className="absolute -top-6 -right-4 md:-right-6 bg-white rounded-2xl shadow-lg p-4 border border-gray-100 transform rotate-3 z-10">
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
  );
};

export default Hero;
