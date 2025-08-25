import { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, ArrowLeft } from "lucide-react";

import Card from "../../components/common/Card";
import Alert from "../../components/common/Alert";

export default function ForgotPassword() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [resetSent, setResetSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setError("Please enter your email address");
      return;
    }
    
    try {
      setIsLoading(true);
      setError("");
      // This would call your forgotPassword API function
      // await forgotPassword(email);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setResetSent(true);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to send reset instructions");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <div className="bg-indigo-600 p-3 rounded-full">
              <Calendar className="h-12 w-12 text-white" />
            </div>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Reset Your Password
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Enter your email to receive reset instructions
          </p>
        </div>

        <Card className="p-8 shadow-xl border-0">
          {error && (
            <Alert
              variant="danger"
              message={error}
              onClose={() => setError("")}
            //   className="mb-6"
            />
          )}
          
          {resetSent ? (
            <div className="text-center py-6">
              <div className="rounded-full bg-green-100 p-3 inline-flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Check Your Email</h3>
              <p className="text-gray-600 mb-6">
                We've sent password reset instructions to your email address.
              </p>
              <Link
                to="/login"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              >
                Return to Login
              </Link>
            </div>
          ) : (
            <>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Enter your email"
                  />
                </div>
                
                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-colors"
                  >
                    {isLoading ? "Sending..." : "Send Reset Link"}
                  </button>
                </div>
              </form>
              
              <div className="mt-4 text-center">
                <Link
                  to="/login"
                  className="text-sm text-indigo-600 hover:text-indigo-500 flex items-center justify-center transition-colors"
                >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back to login
                </Link>
              </div>
            </>
          )}
        </Card>
        
        <p className="text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} EventHub. All rights reserved.
        </p>
      </div>
    </div>
  );
}