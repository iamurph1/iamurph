// AI chat endpoint
// This endpoint demonstrates how to call Cloudflare Workers AI or another AI service.
// To use this function, bind an environment variable `AI_API_TOKEN` and your
// `CLOUDFLARE_ACCOUNT_ID` in the Pages project settings. Then, you can send
// POST requests with a JSON body containing a `prompt` field.

export async function onRequestPost({ request, env }) {
  const { prompt } = await request.json();
  if (!prompt) {
    return new Response('Missing prompt', { status: 400 });
  }
  try {
    // Call the Cloudflare Workers AI model using the REST API. Replace the model
    // identifier below with any supported model. See the Cloudflare Workers AI docs
    // for available models: https://developers.cloudflare.com/workers-ai/.
    const aiResponse = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${env.CLOUDFLARE_ACCOUNT_ID}/ai/run/@cf/meta/llama-3.1-8b-instruct`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${env.AI_API_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt })
      }
    );
    const aiJson = await aiResponse.json();
    return Response.json(aiJson);
  } catch (err) {
    console.error(err);
    return new Response('AI request failed', { status: 500 });
  }
}
