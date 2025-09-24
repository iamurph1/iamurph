export default {
  async fetch(request, env, ctx) {
    if (request.method === 'POST') {
      const contentType = request.headers.get('content-type') || '';
      let formData;
      if (contentType.includes('application/json')) {
        const jsonBody = await request.json();
        formData = new Map(Object.entries(jsonBody));
      } else if (contentType.includes('application/x-www-form-urlencoded')) {
        const text = await request.text();
        formData = new URLSearchParams(text);
      } else {
        formData = await request.formData();
      }

      const token = formData.get('cf-turnstile-response');
      if (!token) {
        return new Response('Turnstile token missing', { status: 400 });
      }

      const ip = request.headers.get('CF-Connecting-IP') || '';

      const secret = env.TURNSTILE_SECRET;
      const body = `secret=${encodeURIComponent(secret)}&response=${encodeURIComponent(token)}&remoteip=${encodeURIComponent(ip)}`;

      const verify = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
      });

      const outcome = await verify.json();
      if (!outcome.success) {
        return new Response('Verification failed', { status: 403 });
      }

      return new Response('Verification passed');
    }

    return new Response('Hello from iamurph Worker!');
  }
};
