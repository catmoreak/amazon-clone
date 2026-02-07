import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import amazonLogo from '../../assets/amazon_logo.png';

export const SignUp: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev: any) => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: any = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Enter your name';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Enter your email or mobile phone number';
    } else if (!/\S+@\S+\.\S+/.test(formData.email) && !/^\d{10}$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address or mobile number';
    }

    if (!formData.password) {
      newErrors.password = 'Enter your password';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Passwords must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Type your password again';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords must match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Sign up attempt:', formData);
      // After successful sign up, redirect to sign in or home
      navigate('/signin');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header with Logo */}
      <div className="flex justify-center py-4 mb-4">
        <Link to="/">
          <img
            src={amazonLogo}
            alt="Amazon"
            className="h-10 w-auto object-contain cursor-pointer"
          />
        </Link>
      </div>

      {/* Sign Up Form */}
      <div className="max-w-[350px] mx-auto">
        <div className="border border-gray-300 rounded-lg p-6">
          <h1 className="text-[28px] font-normal mb-4">Create account</h1>

          <form onSubmit={handleSubmit}>
            {/* Name Field */}
            <div className="mb-4">
              <label htmlFor="name" className="block text-[13px] font-bold mb-2">
                Your name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="First and last name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full px-2 py-1.5 border ${errors.name ? 'border-red-500' : 'border-gray-400'} rounded focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 text-[13px]`}
              />
              {errors.name && (
                <div className="flex items-start mt-1">
                  <span className="text-red-600 text-[12px] mr-1">!</span>
                  <span className="text-[12px] text-red-600">{errors.name}</span>
                </div>
              )}
            </div>

            {/* Email Field */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-[13px] font-bold mb-2">
                Mobile number or email
              </label>
              <input
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-2 py-1.5 border ${errors.email ? 'border-red-500' : 'border-gray-400'} rounded focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 text-[13px]`}
              />
              {errors.email && (
                <div className="flex items-start mt-1">
                  <span className="text-red-600 text-[12px] mr-1">!</span>
                  <span className="text-[12px] text-red-600">{errors.email}</span>
                </div>
              )}
            </div>

            {/* Password Field */}
            <div className="mb-4">
              <label htmlFor="password" className="block text-[13px] font-bold mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="At least 6 characters"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full px-2 py-1.5 pr-10 border ${errors.password ? 'border-red-500' : 'border-gray-400'} rounded focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 text-[13px]`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[13px] text-gray-600 hover:text-gray-800"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              {errors.password && (
                <div className="flex items-start mt-1">
                  <span className="text-red-600 text-[12px] mr-1">!</span>
                  <span className="text-[12px] text-red-600">{errors.password}</span>
                </div>
              )}
              {!errors.password && (
                <div className="mt-1 text-[12px] text-gray-600">
                  <span className="text-blue-600">i</span> Passwords must be at least 6 characters.
                </div>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-[13px] font-bold mb-2">
                Re-enter password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`w-full px-2 py-1.5 pr-10 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-400'} rounded focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 text-[13px]`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[13px] text-gray-600 hover:text-gray-800"
                >
                  {showConfirmPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              {errors.confirmPassword && (
                <div className="flex items-start mt-1">
                  <span className="text-red-600 text-[12px] mr-1">!</span>
                  <span className="text-[12px] text-red-600">{errors.confirmPassword}</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-[#FFD814] border border-[#FCD200] rounded-lg py-2 text-[13px] font-normal mt-4 cursor-pointer hover:bg-[#F7CA00] transition-colors"
            >
              Continue
            </button>

            <div className="mt-6 text-[12px] text-gray-600">
              <p>
                By creating an account, you agree to Amazon's{' '}
                <Link to="/conditions" className="text-blue-600 hover:text-orange-600 hover:underline">
                  Conditions of Use
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-blue-600 hover:text-orange-600 hover:underline">
                  Privacy Notice
                </Link>.
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="text-[13px]">
                <span className="text-gray-700">Already have an account?</span>{' '}
                <Link to="/signin" className="text-blue-600 hover:text-orange-600 hover:underline">
                  Sign in
                </Link>
              </div>
              <div className="text-[13px] mt-2">
                <span className="text-gray-700">Buying for work?</span>{' '}
                <Link to="/business" className="text-blue-600 hover:text-orange-600 hover:underline">
                  Create a free business account
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-8 py-8 bg-gradient-to-b from-white via-white to-gray-100">
        <div className="max-w-[1000px] mx-auto px-4">
          <div className="flex justify-center space-x-6 text-[12px] mb-4">
            <Link to="/conditions" className="text-blue-600 hover:text-orange-600 hover:underline">
              Conditions of Use
            </Link>
            <Link to="/privacy" className="text-blue-600 hover:text-orange-600 hover:underline">
              Privacy Notice
            </Link>
            <Link to="/help" className="text-blue-600 hover:text-orange-600 hover:underline">
              Help
            </Link>
          </div>
          <div className="text-center text-[12px] text-gray-600">
            © 1996-2024, Amazon.com, Inc. or its affiliates
          </div>
        </div>
      </footer>
    </div>
  );
};
