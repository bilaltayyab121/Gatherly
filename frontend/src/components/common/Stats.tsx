// global imports
import { Link } from "react-router-dom";

// local imports
import Button from "./Button";
import { useAuth } from "../../context/AuthContext";

const Stats = () => {
  const { isAuthenticated } = useAuth();

  return (
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
  );
};

export default Stats;
