export async function onRequestGet(context) {
  const value = await context.env.STUDY_STATE.get('state');
  return new Response(value || '{}', {
    headers: { 'Content-Type': 'application/json' }
  });
}

export async function onRequestPost(context) {
  const body = await context.request.text();
  try {
    JSON.parse(body);
  } catch(e) {
    return new Response('Invalid JSON', { status: 400 });
  }
  await context.env.STUDY_STATE.put('state', body);
  return new Response('ok');
}
