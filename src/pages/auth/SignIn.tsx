import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import amazonLogo from '../../assets/amazon_logo.png';

export const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle sign in logic here
    console.log('Sign in attempt:', { email, password });
    // After successful sign in, redirect to home
    navigate('/');
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

      {/* Sign In Form */}
      <div className="max-w-[350px] mx-auto">
        <div className="border border-gray-300 rounded-lg p-6">
          <h1 className="text-[28px] font-normal mb-4">Sign in</h1>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-[13px] font-bold mb-2">
                Email or mobile phone number
              </label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-2 py-1.5 border border-gray-400 rounded focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 text-[13px]"
                required
              />
            </div>

            <div className="mb-2">
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="password" className="text-[13px] font-bold">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-[13px] text-blue-600 hover:text-orange-600 hover:underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-2 py-1.5 pr-10 border border-gray-400 rounded focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 text-[13px]"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[13px] text-gray-600 hover:text-gray-800"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#FFD814] border border-[#FCD200] rounded-lg py-2 text-[13px] font-normal mt-4 cursor-pointer hover:bg-[#F7CA00] transition-colors"
            >
              Sign in
            </button>

            <div className="mt-4">
              <label className="flex items-start cursor-pointer">
                <input
                  type="checkbox"
                  checked={keepSignedIn}
                  onChange={(e) => setKeepSignedIn(e.target.checked)}
                  className="mt-1 mr-2"
                />
                <span className="text-[13px]">Keep me signed in.
                  <button
                    type="button"
                    className="text-blue-600 hover:text-orange-600 hover:underline ml-1"
                    onClick={(e) => {
                      e.preventDefault();
                      alert('Checking "Keep me signed in" reduces the number of times you\'re asked to Sign-In on this device. To keep your account secure, use this option only on your personal devices.');
                    }}
                  >
                    Details
                  </button>
                </span>
              </label>
            </div>
          </form>

          <div className="mt-6 text-[12px] text-gray-600">
            <p>
              By continuing, you agree to Amazon's{' '}
              <Link to="/conditions" className="text-blue-600 hover:text-orange-600 hover:underline">
                Conditions of Use
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="text-blue-600 hover:text-orange-600 hover:underline">
                Privacy Notice
              </Link>.
            </p>
          </div>

          <div className="mt-4">
            <details className="cursor-pointer">
              <summary className="text-[13px] text-gray-700 hover:text-orange-600 hover:underline">
                ▸ Need help?
              </summary>
              <div className="mt-2 ml-4 space-y-2">
                <Link to="/forgot-password" className="block text-[13px] text-blue-600 hover:text-orange-600 hover:underline">
                  Forgot your password?
                </Link>
                <Link to="/account-issues" className="block text-[13px] text-blue-600 hover:text-orange-600 hover:underline">
                  Other issues with Sign-In
                </Link>
              </div>
            </details>
          </div>
        </div>

        {/* New to Amazon section */}
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-2 text-[12px] text-gray-600">New to Amazon?</span>
            </div>
          </div>

          <Link to="/signup">
            <button className="w-full bg-white border border-gray-300 rounded-lg py-2 text-[13px] font-normal mt-4 cursor-pointer hover:bg-gray-50 transition-colors">
              Create your Amazon account
            </button>
          </Link>
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
