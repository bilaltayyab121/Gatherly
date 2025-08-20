import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import type { LoginData } from '../../types/types';
import LoginForm from '../../components/auth/LoginForm';
import Alert from '../../components/common/Alert';
import Card from '../../components/common/Card';
import { Calendar } from 'lucide-react';

export default function Login() {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (data: LoginData) => {
    try {
      setIsLoading(true);
      setError('');
      await login(data);
      navigate('/dashboard/user');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Calendar className="h-12 w-12 text-primary-600" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <Link to="/register" className="font-medium text-primary-600 hover:text-primary-500">
            create a new account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card>
          {error && (
            <Alert variant="danger" message={error} onClose={() => setError('')} />
          )}
          <LoginForm onSubmit={handleSubmit} isLoading={isLoading} />
        </Card>
      </div>
    </div>
  );
}