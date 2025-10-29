'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';

export default function DashboardPage() {
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);

  // edit state
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const p = await api.get('/api/profile');
        setProfile(p.data);
        await loadNotes('');
      } catch {
        router.replace('/login');
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadNotes = async (query, p = 1, highlight = false) => {
    setLoading(true);
    if (highlight && query) {
      // Load all notes and highlight matches
      const res = await api.get('/api/notes', { params: { page: p, limit: 9 } });
      const allNotes = res.data.items;
      const matches = allNotes.filter(n => 
        n.title.toLowerCase().includes(query.toLowerCase()) || 
        n.content.toLowerCase().includes(query.toLowerCase())
      );
      const others = allNotes.filter(n => 
        !(n.title.toLowerCase().includes(query.toLowerCase()) || 
        n.content.toLowerCase().includes(query.toLowerCase()))
      );
      setNotes([...matches.map(n => ({...n, highlight: true})), ...others]);
      setPage(res.data.page);
      setPages(res.data.pages);
    } else {
      const res = await api.get('/api/notes', { params: { q: query || undefined, page: p, limit: 9 } });
      setNotes(res.data.items.map(n => ({...n, highlight: false})));
      setPage(res.data.page);
      setPages(res.data.pages);
    }
    setLoading(false);
  };

  const addNote = async (e) => {
    e.preventDefault();
    await api.post('/api/notes', { title, content });
    setTitle(''); setContent('');
    await loadNotes(q);
  };

  const delNote = async (id) => {
    await api.delete(`/api/notes/${id}`);
    await loadNotes(q);
  };

  const startEdit = (note) => {
    setEditingId(note._id);
    setEditTitle(note.title);
    setEditContent(note.content || '');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle('');
    setEditContent('');
  };

  const saveEdit = async (e) => {
    e?.preventDefault?.();
    if (!editingId) return;
    await api.put(`/api/notes/${editingId}`, { title: editTitle, content: editContent });
    cancelEdit();
    await loadNotes(q);
  };

  const logout = async () => {
    await api.post('/api/auth/logout');
    router.replace('/login');
  };

  return (
    <div className="min-h-screen p-4 max-w-5xl mx-auto">
      <header className="mb-4 text-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </header>
      <div className="flex justify-end items-center mb-6">
        <button onClick={logout} className="px-3 py-1 bg-gray-800 text-white rounded">Logout</button>
      </div>

      {profile && (
      <div className="mb-6 flex items-center justify-between gap-4 rounded-xl bg-white p-4 shadow">
          <div>
            <h2 className="text-lg font-semibold text-zinc-900">Welcome, {profile.name || profile.email}</h2>
            <p className="text-sm font-medium text-zinc-800">{profile.email}</p>
          </div>
          <a href="/profile" className="text-sm text-blue-600">Edit Profile</a>
        </div>
      )}

      <div className="mb-4 flex flex-col gap-2 sm:flex-row">
        <input className="flex-1 min-w-0 rounded-md border px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500" placeholder="Search notes..." value={q} onChange={e=>{ setQ(e.target.value); }} />
        <div className="flex gap-2 sm:justify-start">
          <button onClick={()=>loadNotes(q, 1, true)} className="w-full sm:w-auto rounded-md bg-blue-600 px-3 py-2 text-white">Highlight</button>
          <button onClick={()=>{setQ(''); loadNotes('', 1, false);}} className="w-full sm:w-auto rounded-md bg-zinc-600 px-3 py-2 text-white">Clear</button>
        </div>
      </div>

      <form onSubmit={addNote} className="mb-6 grid grid-cols-1 gap-2 sm:grid-cols-3">
        <input className="rounded border p-2" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} required />
        <input className="rounded border p-2" placeholder="Content" value={content} onChange={e=>setContent(e.target.value)} />
        <button className="rounded bg-green-600 px-3 text-white sm:w-auto">Add</button>
      </form>

      {loading ? (
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <li key={i} className="h-28 animate-pulse rounded-xl bg-zinc-100" />
          ))}
        </ul>
      ) : (
        <>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {notes.map(n => (
              <li key={n._id} className={`flex flex-col gap-2 rounded-xl p-3 shadow ${
                n.highlight ? 'bg-red-100 border-2 border-red-300' : 'bg-white'
              }`}>
                {editingId === n._id ? (
                  <form onSubmit={saveEdit} className="flex flex-col gap-2">
                    <input className="rounded border px-2 py-2" value={editTitle} onChange={e=>setEditTitle(e.target.value)} required />
                    <input className="rounded border px-2 py-2" value={editContent} onChange={e=>setEditContent(e.target.value)} />
                    <div className="flex gap-2 self-end">
                      <button type="submit" className="rounded bg-blue-600 px-2 py-1 text-sm text-white">Save</button>
                      <button type="button" onClick={cancelEdit} className="rounded bg-zinc-200 px-2 py-1 text-sm">Cancel</button>
                    </div>
                  </form>
                ) : (
                  <>
                    <div className={`font-semibold ${
                      n.highlight ? 'text-red-900' : 'text-zinc-900'
                    }`}>{n.title}</div>
                    <div className={`text-sm ${
                      n.highlight ? 'text-red-800' : 'text-zinc-800'
                    }`}>{n.content}</div>
                    <div className="flex gap-3 self-end">
                      <button onClick={()=>startEdit(n)} className="text-sm text-blue-600">Edit</button>
                      <button onClick={()=>delNote(n._id)} className="text-sm text-red-600">Delete</button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex items-center justify-center gap-3">
            <button disabled={page<=1} onClick={()=>loadNotes(q, page-1)} className="rounded border px-3 py-1 disabled:opacity-50">Prev</button>
            <span className="text-sm text-zinc-600">Page {page} of {pages}</span>
            <button disabled={page>=pages} onClick={()=>loadNotes(q, page+1)} className="rounded border px-3 py-1 disabled:opacity-50">Next</button>
          </div>
        </>
      )}
      <footer className="mt-8 text-center text-xs text-zinc-500">
        <p>© 2025 Virat Kumar. All rights reserved.</p>
        <p>Made with ❤️ by VIRAT</p>
      </footer>
    </div>
  );
}
