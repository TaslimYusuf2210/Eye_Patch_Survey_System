import { useState } from 'react';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import type { LoginFormData } from '@/types/auth';
import { useLogin } from '@/hooks/useMutation';
import { toast } from "sonner"
import { MutationOverlay } from '@/components/ui/mutation-overlay'

const loginSchema = yup.object().shape({
    email: yup.string().email('Invalid email format').required('Email is required'),
    password: yup.string().required('Password is required'),
});

function Login() {
    const [showPassword, setShowPassword] = useState(false)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: yupResolver(loginSchema),
    });

    const navigate = useNavigate()
    const loginMutation = useLogin();

    const onSubmit = async (data: LoginFormData) => {
        try {
            const response = await loginMutation.mutateAsync(data);
            const token = response.data.data.token;
            sessionStorage.setItem('token', token);
            toast.success("Login successful! Redirecting to dashboard...");
            navigate("/dashboard/")
        } catch (error: any) {
            const message = error.userMessage || error.response?.data?.message || error.message
            toast.error(message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 font-poppins h-screen">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                <div className="relative flex items-center mb-6">
                    <Link to="/" className="absolute left-0 text-gray-600 hover:text-black transition-colors cursor-pointer">
                        <ArrowLeft size={20} />
                    </Link>
                    <h2 className="text-2xl font-bold text-center text-gray-800 w-full">Login</h2>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            {...register('email')}
                            className={`w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all`}
                            placeholder="your@email.com"
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                {...register('password')}
                                className={`w-full px-4 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all pr-10`}
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 cursor-pointer"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                    </div>

                    <button
                        disabled={loginMutation.isPending}
                        className={`w-full bg-black text-white px-4 py-2 rounded-full text-sm font-medium border border-gray-200 shadow-sm hover:bg-gray-950 transition-all duration-400 mt-2 cursor-pointer ${loginMutation.isPending ? "cursor-not-allowed opacity-40" : ""}`}
                    >
                        {loginMutation.isPending ? "Loading..." : "Login"}
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-600">
                    Don't have an account?{' '}
                    <Link to="/signup" className="font-medium text-black hover:underline">
                        Sign up
                    </Link>
                </div>
            </div>
            <MutationOverlay isPending={loginMutation.isPending} message="Signing in..." />
        </div>
    );
}

export default Login;