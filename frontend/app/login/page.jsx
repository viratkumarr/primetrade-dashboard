'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const validate = () => {
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return 'Enter a valid email';
    if (!password || password.length < 6) return 'Password must be at least 6 characters';
    return '';
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const v = validate();
    if (v) { setError(v); return; }
    setLoading(true);
    try {
      await api.post('/api/auth/login', { email, password });
      router.push('/dashboard');
    } catch (err) {
      setError(err?.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50">
      <header className="py-6 text-center">
        <h2 className="text-xl font-semibold text-black">Login / Register</h2>
      </header>
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md rounded-xl border bg-white p-8 shadow-sm">
          <h1 className="mb-6 text-center text-2xl font-semibold text-black">Welcome back</h1>
          {error && <p className="mb-4 rounded bg-red-50 p-2 text-sm text-red-700">{error}</p>}
          <form onSubmit={onSubmit} className="space-y-4">
            <input className="w-full rounded-md border border-zinc-400 bg-white px-3 py-2 text-sm text-zinc-900 placeholder-zinc-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500" placeholder="Email" type="email" value={email} onChange={e=>setEmail(e.target.value)} />
            <div className="relative">
              <input className="w-full rounded-md border border-zinc-400 bg-white px-3 py-2 pr-10 text-sm text-zinc-900 placeholder-zinc-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500" placeholder="Password" type={showPassword ? 'text' : 'password'} value={password} onChange={e=>setPassword(e.target.value)} />
              <button type="button" onClick={()=>setShowPassword(!showPassword)} className="absolute right-3 top-2.5 text-zinc-500">
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
            <button disabled={loading} className="w-full rounded-md bg-blue-600 py-2 text-white transition hover:bg-blue-700 disabled:opacity-50">
              {loading ? 'Signing in…' : 'Login'}
            </button>
          </form>
          <p className="mt-4 text-center text-sm text-zinc-600">No account? <a href="/register" className="text-blue-600">Register</a></p>
        </div>
      </main>
      <footer className="py-6 text-center text-xs text-zinc-500">
        <p>© 2025 Virat Kumar. All rights reserved.</p>
        <p>Made with ❤️ by VIRAT</p>
      </footer>
    </div>
  );
}
