import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

interface ContactFormProps {
  isPersian?: boolean;
}

export const ContactForm: React.FC<ContactFormProps> = ({ isPersian = false }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const { error: submitError } = await supabase
        .from('contacts')
        .insert([
          {
            name,
            email,
            message,
            user_id: user?.id || null
          }
        ]);

      if (submitError) throw submitError;

      setSuccess(true);
      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      console.error('Error submitting contact form:', err);
      setError(isPersian ? 'خطا در ارسال پیام. لطفا دوباره تلاش کنید.' : 'Error submitting message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {success && (
        <div className="bg-green-500/10 border border-green-500 text-green-500 rounded-lg px-4 py-3 text-center">
          {isPersian
            ? 'پیام شما با موفقیت ارسال شد. به زودی با شما تماس خواهیم گرفت.'
            : 'Your message has been sent successfully. We will contact you soon.'}
        </div>
      )}

      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-500 rounded-lg px-4 py-3 text-center">
          {error}
        </div>
      )}

      <div>
        <label className="block text-white mb-2">
          {isPersian ? 'نام' : 'Name'}
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
          disabled={loading}
        />
      </div>

      <div>
        <label className="block text-white mb-2">
          {isPersian ? 'ایمیل' : 'Email'}
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
          disabled={loading}
        />
      </div>

      <div>
        <label className="block text-white mb-2">
          {isPersian ? 'پیام' : 'Message'}
        </label>
        <textarea
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
          disabled={loading}
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="glow-button w-full disabled:opacity-50"
      >
        {loading
          ? (isPersian ? 'در حال ارسال...' : 'Sending...')
          : (isPersian ? 'ارسال پیام' : 'Send Message')}
      </button>
    </form>
  );
};