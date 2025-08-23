import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import type { RegisterData } from "../../types/types";
import RegisterForm from "../../components/auth/RegisterForm";
import Alert from "../../components/common/Alert";
import Card from "../../components/common/Card";
import { Calendar } from "lucide-react";

export default function Register() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { register, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (data: RegisterData) => {
    try {
      setIsLoading(true);
      setError("");
      await register(data);
    } catch (err: unknown) {
      if (typeof err === "object" && err !== null && "response" in err) {
        const response = (err as { response?: { data?: { message?: string } } })
          .response;
        setError(response?.data?.message || "Registration failed");
      } else {
        setError("Registration failed");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard/user");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Calendar className="h-12 w-12 text-primary-600" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{" "}
          <Link
            to="/login"
            className="font-medium text-primary-600 hover:text-primary-500"
          >
            sign in to existing account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card>
          {error && (
            <Alert
              variant="danger"
              message={error}
              onClose={() => setError("")}
            />
          )}
          <RegisterForm onSubmit={handleSubmit} isLoading={isLoading} />
        </Card>
      </div>
    </div>
  );
}
