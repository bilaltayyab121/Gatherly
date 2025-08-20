import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-primary-600">404</h1>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Page not found</h2>
        <p className="text-gray-600 mb-8 max-w-md">
          Sorry, we couldn't find the page you're looking for. Perhaps you've mistyped the URL?
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button className="flex items-center">
              <Home className="h-4 w-4 mr-2" />
              Go Home
            </Button>
          </Link>
          <Button variant="secondary" onClick={() => window.history.back()} className="flex items-center">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}