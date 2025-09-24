export async function onRequest({ request }) {
  const url = new URL(request.url);
  const ageParam = url.searchParams.get('age');
  const age = parseInt(ageParam || '0', 10);
  if (age >= 18) {
    return new Response('OK');
  }
  return new Response('Forbidden', { status: 403 });
}
