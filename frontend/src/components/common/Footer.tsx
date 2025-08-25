// global imports
import { Calendar } from 'lucide-react'
import { Link } from 'react-router-dom';

// local imports
import Button from './Button';
import { useAuth } from '../../context/AuthContext';


const Footer = () => {
    const { isAuthenticated } = useAuth();

  return (
    <>
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
    </>
  )
}

export default Footer