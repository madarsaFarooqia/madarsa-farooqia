import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const CATEGORIES = ['news', 'event', 'announcement', 'academic', 'community', 'general'];

export default function BlogPostModal({ post, onClose, onSaved }) {
  const [form, setForm] = useState({
    title: post?.title || '',
    excerpt: post?.excerpt || '',
    content: post?.content || '',
    category: post?.category || 'news',
    status: post?.status || 'draft',
    author: post?.author || '',
    image_url: post?.image_url || '',
    published_at: post?.published_at || '',
    tags: post?.tags?.join(', ') || '',
  });
  const [saving, setSaving] = useState(false);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSave = async () => {
    if (!form.title) return alert('Title is required.');
    setSaving(true);
    const data = { ...form, tags: form.tags ? form.tags.split(',').map(t => t.trim()) : [] };
    if (post?.id) {
      console.log('integrate api');
    } else {
      console.log('integrate api');
    }
    setSaving(false);
    onSaved();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="font-playfair font-bold text-xl text-foreground">{post ? 'Edit Post' : 'New Blog Post'}</h2>
          <button onClick={onClose} className="p-2 hover:bg-secondary rounded-lg"><X size={18} /></button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <Label className="mb-1.5 block text-sm font-medium">Title *</Label>
            <Input value={form.title} onChange={e => set('title', e.target.value)} placeholder="Post title" />
          </div>
          <div>
            <Label className="mb-1.5 block text-sm font-medium">Excerpt (Short Summary)</Label>
            <Input value={form.excerpt} onChange={e => set('excerpt', e.target.value)} placeholder="Brief description..." />
          </div>
          <div>
            <Label className="mb-1.5 block text-sm font-medium">Content *</Label>
            <textarea value={form.content} onChange={e => set('content', e.target.value)}
              className="w-full border border-input bg-transparent rounded-md px-3 py-2 text-sm resize-none h-48 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              placeholder="Full post content..." />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="mb-1.5 block text-sm font-medium">Category</Label>
              <select value={form.category} onChange={e => set('category', e.target.value)} className="w-full border border-input bg-card rounded-md px-3 py-2 text-sm">
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <Label className="mb-1.5 block text-sm font-medium">Status</Label>
              <select value={form.status} onChange={e => set('status', e.target.value)} className="w-full border border-input bg-card rounded-md px-3 py-2 text-sm">
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="scheduled">Scheduled</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="mb-1.5 block text-sm font-medium">Author</Label>
              <Input value={form.author} onChange={e => set('author', e.target.value)} placeholder="Author name" />
            </div>
            <div>
              <Label className="mb-1.5 block text-sm font-medium">Publish Date</Label>
              <Input type="datetime-local" value={form.published_at} onChange={e => set('published_at', e.target.value)} />
            </div>
          </div>
          <div>
            <Label className="mb-1.5 block text-sm font-medium">Image URL</Label>
            <Input value={form.image_url} onChange={e => set('image_url', e.target.value)} placeholder="https://..." />
          </div>
          <div>
            <Label className="mb-1.5 block text-sm font-medium">Tags (comma-separated)</Label>
            <Input value={form.tags} onChange={e => set('tags', e.target.value)} placeholder="education, quran, events" />
          </div>
        </div>
        <div className="flex gap-3 p-6 border-t border-border">
          <Button variant="outline" onClick={onClose} className="flex-1">Cancel</Button>
          <Button onClick={handleSave} disabled={saving} className="flex-1">
            {saving ? 'Saving...' : post ? 'Update Post' : 'Publish Post'}
          </Button>
        </div>
      </div>
    </div>
  );
}