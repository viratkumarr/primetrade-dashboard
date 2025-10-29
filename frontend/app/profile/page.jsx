'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';

export default function ProfilePage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [prevEmail, setPrevEmail] = useState('');
  const [prevName, setPrevName] = useState('');
  const [p1, setP1] = useState('');
  const [p2, setP2] = useState('');
  const [p3, setP3] = useState('');
  const [sp1, setSp1] = useState(false);
  const [sp2, setSp2] = useState(false);
  const [sp3, setSp3] = useState(false);
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const p = await api.get('/api/profile');
        setName(p.data.name || '');
        setEmail(p.data.email || '');
        setPrevName(p.data.name || '');
        setPrevEmail(p.data.email || '');
        setLoading(false);
      } catch {
        router.replace('/login');
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateProfile = async (e) => {
    e.preventDefault(); setMsg(''); setErr('');
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) { setErr('Enter a valid email'); return; }
    try {
      const res = await api.put('/api/profile', { name, email });
      setName(res.data.name || ''); setEmail(res.data.email || '');
      const emailChanged = prevEmail && prevEmail !== res.data.email;
      const nameChangedOnly = prevName !== res.data.name && !emailChanged;
      if (emailChanged) {
        await api.post('/api/auth/logout');
        router.replace('/login');
        return;
      }
      if (nameChangedOnly) {
        router.push('/dashboard');
        return;
      }
      setMsg('Profile updated');
    } catch (e) {
      setErr(e?.response?.data?.message || 'Update failed');
    }
  };

  const changePassword = async (e) => {
    e.preventDefault(); setMsg(''); setErr('');
    if (!p1 || !p2 || p2.length < 6) { setErr('Enter current and new password (>= 6 chars)'); return; }
    if (p2 !== p3) { setErr('New password and confirm password must match'); return; }
    try {
      await api.put('/api/profile/password', { currentPassword: p1, newPassword: p2 });
      setP1(''); setP2(''); setP3('');
      await api.post('/api/auth/logout');
      router.replace('/login');
    } catch (e) {
      setErr(e?.response?.data?.message || 'Password update failed');
    }
  };

  if (loading) return <div className="p-6">Loading…</div>;

  return (
    <div className="min-h-screen flex flex-col">
      <header className="py-6 text-center">
        <h1 className="text-3xl font-bold">Profile</h1>
      </header>
      <main className="flex-1">
        <div className="mx-auto max-w-2xl p-4">
          <div className="mb-4 flex items-center justify-end">
            <button onClick={()=>router.push('/dashboard')} className="rounded border px-3 py-1 text-sm">Back to Dashboard</button>
          </div>
          {msg && <p className="mb-3 rounded bg-green-50 p-2 text-sm text-green-700">{msg}</p>}
          {err && <p className="mb-3 rounded bg-red-50 p-2 text-sm text-red-700">{err}</p>}

          <div className="grid gap-8 md:grid-cols-2">
            <form onSubmit={updateProfile} className="rounded-xl border bg-white p-4 shadow-sm">
              <h2 className="mb-3 font-semibold text-black">Profile Info</h2>
              <div className="mb-3">
                <label className="mb-1 block text-sm text-zinc-700">Name</label>
                <input className="w-full rounded border border-zinc-400 bg-white px-3 py-2 text-zinc-900 placeholder-zinc-600" value={name} onChange={e=>setName(e.target.value)} />
              </div>
              <div className="mb-4">
                <label className="mb-1 block text-sm text-zinc-700">Email</label>
                <input className="w-full rounded border border-zinc-400 bg-white px-3 py-2 text-zinc-900 placeholder-zinc-600" type="email" value={email} onChange={e=>setEmail(e.target.value)} />
              </div>
              <button className="w-full sm:w-auto rounded bg-blue-600 px-3 py-2 text-white">Save</button>
            </form>

            <form onSubmit={changePassword} className="rounded-xl border bg-white p-4 shadow-sm">
              <h2 className="mb-3 font-semibold text-black">Change Password</h2>
              <div className="mb-3">
            <label className="mb-1 block text-sm text-zinc-700">Current password</label>
            <div className="relative">
              <input className="w-full rounded border border-zinc-400 bg-white px-3 py-2 pr-10 text-zinc-900 placeholder-zinc-600" type={sp1 ? 'text' : 'password'} value={p1} onChange={e=>setP1(e.target.value)} />
              <button type="button" onClick={()=>setSp1(!sp1)} className="absolute right-3 top-2.5 text-zinc-500">{sp1 ? '🙈' : '👁️'}</button>
            </div>
          </div>
          <div className="mb-3">
            <label className="mb-1 block text-sm text-zinc-700">New password</label>
            <div className="relative">
              <input className="w-full rounded border border-zinc-400 bg-white px-3 py-2 pr-10 text-zinc-900 placeholder-zinc-600" type={sp2 ? 'text' : 'password'} value={p2} onChange={e=>setP2(e.target.value)} />
              <button type="button" onClick={()=>setSp2(!sp2)} className="absolute right-3 top-2.5 text-zinc-500">{sp2 ? '🙈' : '👁️'}</button>
            </div>
          </div>
          <div className="mb-4">
            <label className="mb-1 block text-sm text-zinc-700">Confirm password</label>
            <div className="relative">
              <input className="w-full rounded border border-zinc-400 bg-white px-3 py-2 pr-10 text-zinc-900 placeholder-zinc-600" type={sp3 ? 'text' : 'password'} value={p3} onChange={e=>setP3(e.target.value)} />
              <button type="button" onClick={()=>setSp3(!sp3)} className="absolute right-3 top-2.5 text-zinc-500">{sp3 ? '🙈' : '👁️'}</button>
            </div>
          </div>
              <button className="w-full sm:w-auto rounded bg-blue-600 px-3 py-2 text-white">Update</button>
            </form>
          </div>
        </div>
      </main>
      <footer className="py-6 text-center text-xs text-zinc-500">
        <p>© 2025 Virat Kumar. All rights reserved.</p>
        <p>Made with ❤️ by VIRAT</p>
      </footer>
    </div>
  );
}
