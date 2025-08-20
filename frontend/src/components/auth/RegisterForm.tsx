import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import type { RegisterData } from '../../types/types';
import Input from '../common/Input';
import Button from '../common/Button';
import Select from '../common/Select';

interface RegisterFormProps {
  onSubmit: (data: RegisterData) => void;
  isLoading?: boolean;
}

export default function RegisterForm({ onSubmit, isLoading }: RegisterFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Name"
        {...register('name', {
          required: 'Name is required',
          minLength: {
            value: 2,
            message: 'Name must be at least 2 characters',
          },
        })}
        error={errors.name?.message}
      />

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

      <Select
        label="Role"
        {...register('role')}
        options={[
          { value: 'PARTICIPANT', label: 'Participant' },
          { value: 'ORGANIZER', label: 'Organizer' },
        ]}
      />

      <Button type="submit" isLoading={isLoading} className="w-full">
        Register
      </Button>

      <div className="text-center text-sm text-gray-600">
        Already have an account?{' '}
        <Link to="/login" className="text-primary-600 hover:underline">
          Login here
        </Link>
      </div>
    </form>
  );
}