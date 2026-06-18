import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../hooks/useAuth';
import { FcGoogle } from 'react-icons/fc';
import { motion } from 'framer-motion';

export default function LoginScreen() {
  const { login, googleLogin, loading } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState('');

  const onSubmit = async (data: any) => {
    try {
      await login(data.email, data.password);
      navigate('/');
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <div className="min-h-screen max-w-mobile mx-auto bg-primary dark:bg-dark flex flex-col justify-center px-6">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
        <div className="w-16 h-16 rounded-full bg-accent mx-auto flex items-center justify-center mb-4">
          <span className="text-white text-2xl font-bold">MR</span>
        </div>
        <h1 className="text-2xl font-bold text-accent dark:text-white">Welcome Back</h1>
        <p className="text-gray-500">Sign in to your MurgaRam account</p>
      </motion.div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register('email', { required: true })}
          type="email"
          placeholder="Email"
          className="w-full p-4 rounded-4xl neo-card bg-secondary dark:bg-dark-light outline-none focus:ring-2 ring-accent"
        />
        <input
          {...register('password', { required: true })}
          type="password"
          placeholder="Password"
          className="w-full p-4 rounded-4xl neo-card bg-secondary dark:bg-dark-light outline-none focus:ring-2 ring-accent"
        />
        {errors.email && <span className="text-red-500 text-sm">Email is required</span>}
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-accent text-white rounded-4xl font-semibold shadow-lg active:scale-95 transition-transform"
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
      <div className="flex items-center my-6">
        <div className="flex-1 h-px bg-gray-300" />
        <span className="px-4 text-gray-400">or</span>
        <div className="flex-1 h-px bg-gray-300" />
      </div>
      <button
        onClick={() => googleLogin().then(() => navigate('/'))}
        className="w-full py-4 border-2 border-gray-200 dark:border-gray-700 rounded-4xl flex items-center justify-center space-x-2 font-semibold bg-white dark:bg-dark-light"
      >
        <FcGoogle className="text-2xl" />
        <span>Continue with Google</span>
      </button>
      <div className="mt-6 text-center">
        <Link to="/signup" className="text-accent font-medium">Don't have an account? Sign Up</Link>
      </div>
    </div>
  );
}