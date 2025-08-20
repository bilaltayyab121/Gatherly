import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import type { LoginData } from '../../types/types';
import Input from '../common/Input';
import Button from '../common/Button';

interface LoginFormProps {
  onSubmit: (data: LoginData) => void;
  isLoading?: boolean;
}

export default function LoginForm({ onSubmit, isLoading }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Email"
        type="email"
        {...register('email', {
          required: 'Email is required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email address',
          },
        })}
        error={errors.email?.message}
      />

      <Input
        label="Password"
        type="password"
        {...register('password', {
          required: 'Password is required',
          minLength: {
            value: 6,
            message: 'Password must be at least 6 characters',
          },
        })}
        error={errors.password?.message}
      />

      <Button type="submit" isLoading={isLoading} className="w-full">
        Login
      </Button>

      <div className="text-center text-sm text-gray-600">
        Don't have an account?{' '}
        <Link to="/register" className="text-primary-600 hover:underline">
          Register here
        </Link>
      </div>
    </form>
  );
}