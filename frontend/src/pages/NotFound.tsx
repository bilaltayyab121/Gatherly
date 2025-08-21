import { Link } from "react-router-dom";
import Button from "../components/common/Button";
import { Calendar, Home, ArrowLeft, Search, Map, Wifi } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col">
      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* Message */}
          <div className="max-w-2xl mx-auto mb-10">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Oops! Lost in the event space?
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              The page you're looking for seems to have left the venue. Maybe
              it's at another event or perhaps it never existed.
            </p>
            <p className="text-gray-500">
              Don't worry though - there are plenty of amazing events waiting
              for you!
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              onClick={() => window.history.back()}
              className="flex items-center justify-center group"
              size="lg"
            >
              <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              Go Back
            </Button>
            <Link to="/">
              <Button
                className="flex items-center justify-center group"
                size="lg"
              >
                <Home className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                Go Home
              </Button>
            </Link>
          </div>

          {/* Quick Links */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 max-w-2xl mx-auto">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">
              Quick Links
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link
                to="/events"
                className="flex flex-col items-center p-4 rounded-xl bg-gray-50 hover:bg-primary-50 transition-colors group"
              >
                <Calendar className="h-6 w-6 text-primary-600 mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-gray-700">
                  All Events
                </span>
              </Link>
              <Link
                to="/events?type=online"
                className="flex flex-col items-center p-4 rounded-xl bg-gray-50 hover:bg-primary-50 transition-colors group"
              >
                <Wifi className="h-6 w-6 text-primary-600 mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-gray-700">
                  Online Events
                </span>
              </Link>
              <Link
                to="/events?type=onsite"
                className="flex flex-col items-center p-4 rounded-xl bg-gray-50 hover:bg-primary-50 transition-colors group"
              >
                <Map className="h-6 w-6 text-primary-600 mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-gray-700">
                  Venue Events
                </span>
              </Link>
            </div>
          </div>

          {/* Search Suggestion */}
          <div className="mt-10 bg-primary-50 rounded-2xl p-6 max-w-2xl mx-auto">
            <div className="flex items-center justify-center">
              <Search className="h-5 w-5 text-primary-600 mr-3" />
              <p className="text-primary-800">
                Can't find what you're looking for? Try searching for events
                instead.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p>© {new Date().getFullYear()} Gatherly. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
