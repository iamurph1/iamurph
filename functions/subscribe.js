export async function onRequestPost({ request, env }) {
  const data = await request.json();
  // Validate the email payload
  if (!data.email || typeof data.email !== 'string') {
    return new Response('Invalid request', { status: 400 });
  }
  try {
    // Store the email in a D1 database bound as env.DB. You must create
    // a table `subscribers` with a TEXT column `email` beforehand.
    if (env.DB) {
      await env.DB.prepare('INSERT INTO subscribers (email) VALUES (?);').bind(data.email).run();
    }
    // Optionally, send the email to an external newsletter service here.
    return Response.json({ ok: true });
  } catch (err) {
    console.error(err);
    return new Response('Failed to subscribe', { status: 500 });
  }
}
