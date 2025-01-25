import React, { useState } from 'react';
import { X, Mail, ArrowLeft } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'login' | 'signup';
  isPersian?: boolean;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, mode, isPersian = false }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resetPassword, setResetPassword] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (resetPassword) {
        // Send password reset email
        const { error: resetError } = await supabase.auth.resetPasswordForEmail(
          email,
          {
            redirectTo: `${window.location.origin}/reset-password`,
          }
        );

        if (resetError) throw resetError;

        setResetSent(true);
        setSuccess(
          isPersian
            ? 'لینک بازیابی رمز عبور به ایمیل شما ارسال شد'
            : 'Password reset link has been sent to your email'
        );
      } else if (mode === 'signup') {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        });

        if (signUpError) throw signUpError;

        setSuccess(
          isPersian
            ? 'ثبت نام با موفقیت انجام شد'
            : 'Sign up successful'
        );
        setTimeout(() => onClose(), 2000);
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) throw signInError;

        setSuccess(
          isPersian
            ? 'ورود با موفقیت انجام شد'
            : 'Login successful'
        );
        setTimeout(() => onClose(), 2000);
      }
    } catch (err) {
      console.error('Auth error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setResetPassword(false);
    setResetSent(false);
    setError(null);
    setSuccess(null);
    setEmail('');
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="max-w-[350px] w-full bg-gradient-to-b from-gray-800 to-gray-900 rounded-[40px] p-[25px_35px] border-[5px] border-gray-700 shadow-[0_30px_30px_-20px_rgba(59,130,246,0.3)]">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute -right-4 -top-4 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          
          <h2 className="text-center font-black text-3xl bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text">
            {resetPassword 
              ? (isPersian ? 'بازیابی رمز عبور' : 'Reset Password')
              : mode === 'login' 
                ? (isPersian ? 'ورود' : 'Login')
                : (isPersian ? 'ثبت نام' : 'Sign Up')}
          </h2>
          
          {resetSent ? (
            <div className="mt-6 text-center">
              <div className="flex justify-center mb-4">
                <Mail className="w-16 h-16 text-blue-400" />
              </div>
              <p className="text-gray-300 mb-4">
                {isPersian 
                  ? 'لینک بازیابی رمز عبور به ایمیل شما ارسال شد.'
                  : 'Password reset link has been sent to your email.'}
              </p>
              <button
                onClick={handleBack}
                className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-2 mx-auto"
              >
                <ArrowLeft className="w-4 h-4" />
                {isPersian ? 'بازگشت به ورود' : 'Back to login'}
              </button>
            </div>
          ) : (
            <>
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div className="space-y-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={isPersian ? 'ایمیل' : 'Email'}
                    className="w-full bg-gray-700 border-2 border-transparent px-5 py-4 rounded-[20px] shadow-[0_10px_10px_-5px_rgba(59,130,246,0.2)] focus:outline-none focus:border-blue-500 text-white placeholder-gray-400 transition-all"
                    required
                  />
                  
                  {!resetPassword && (
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={isPersian ? 'رمز عبور' : 'Password'}
                      className="w-full bg-gray-700 border-2 border-transparent px-5 py-4 rounded-[20px] shadow-[0_10px_10px_-5px_rgba(59,130,246,0.2)] focus:outline-none focus:border-blue-500 text-white placeholder-gray-400 transition-all"
                      required
                    />
                  )}
                </div>

                {error && (
                  <div className="text-red-400 text-sm text-center bg-red-400/10 rounded-lg py-2">
                    {error}
                  </div>
                )}

                {success && (
                  <div className="text-green-400 text-sm text-center bg-green-400/10 rounded-lg py-2">
                    {success}
                  </div>
                )}
                
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full font-bold bg-gradient-to-r from-blue-600 to-blue-400 text-white py-4 rounded-[20px] shadow-[0_20px_10px_-15px_rgba(59,130,246,0.5)] border-none transition-all hover:scale-[1.03] hover:shadow-[0_23px_10px_-20px_rgba(59,130,246,0.5)] active:scale-[0.95] active:shadow-[0_15px_10px_-10px_rgba(59,130,246,0.5)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {loading 
                    ? (isPersian ? 'لطفا صبر کنید...' : 'Please wait...')
                    : resetPassword
                      ? (isPersian ? 'ارسال لینک بازیابی' : 'Send Reset Link')
                      : mode === 'login'
                        ? (isPersian ? 'ورود' : 'Login')
                        : (isPersian ? 'ثبت نام' : 'Sign Up')}
                </button>
              </form>

              {mode === 'login' && !resetPassword && (
                <button
                  onClick={() => {
                    setResetPassword(true);
                    setError(null);
                    setSuccess(null);
                    setPassword('');
                  }}
                  className="mt-4 text-sm text-blue-400 hover:text-blue-300 transition-colors w-full text-center"
                >
                  {isPersian ? 'فراموشی رمز عبور؟' : 'Forgot password?'}
                </button>
              )}

              {resetPassword && (
                <button
                  onClick={handleBack}
                  className="mt-4 text-sm text-blue-400 hover:text-blue-300 transition-colors w-full text-center flex items-center gap-2 justify-center"
                >
                  <ArrowLeft className="w-4 h-4" />
                  {isPersian ? 'بازگشت به ورود' : 'Back to login'}
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};