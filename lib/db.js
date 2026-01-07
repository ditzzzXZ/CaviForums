import { kv } from '@vercel/kv';

export async function getForums() {
  const forums = await kv.get('cavi_forums');
  return forums || [];
}

export async function createForum(forum) {
  const forums = await getForums();
  await kv.set('cavi_forums', [forum, ...forums]);
}

export async function addReply(forumId, reply) {
  const forums = await getForums();
  const updated = forums.map(f => {
    if (f.id === forumId) {
      return { ...f, replies: [...(f.replies || []), reply] };
    }
    return f;
  });
  await kv.set('cavi_forums', updated);
}
