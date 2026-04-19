export async function onRequestGet(context) {
  const key = new URL(context.request.url).searchParams.get('key') || 'state';
  if (!['state','plan'].includes(key)) return new Response('Invalid key', {status:400});
  const value = await context.env.STUDY_STATE.get(key);
  return new Response(value || 'null', {headers:{'Content-Type':'application/json'}});
}

export async function onRequestPost(context) {
  const key = new URL(context.request.url).searchParams.get('key') || 'state';
  if (!['state','plan'].includes(key)) return new Response('Invalid key', {status:400});
  const body = await context.request.text();
  try { JSON.parse(body); } catch(e) { return new Response('Invalid JSON', {status:400}); }
  await context.env.STUDY_STATE.put(key, body);
  return new Response('ok');
}
