// Murph Miles loyalty program endpoint
// This function receives a wallet address and awards Murph Miles (loyalty points).
// You can adapt this logic to call a smart contract via an SDK like ethers.js
// or write to a D1 database. Adjust the logic as needed for your use case.

export async function onRequestPost({ request, env }) {
  const { address } = await request.json();
  if (!address) {
    return new Response('Missing address', { status: 400 });
  }
  try {
    // Example: update a D1 table `loyalty` with the user's address and increment points.
    // If the table does not exist, create it with: CREATE TABLE loyalty (address TEXT PRIMARY KEY, points INTEGER);
    if (env.DB) {
      await env.DB.prepare(
        `INSERT INTO loyalty (address, points) VALUES (?, 10)
         ON CONFLICT(address) DO UPDATE SET points = points + 10;`
      ).bind(address).run();
    }
    // You could also interact with a blockchain contract here using ethers.js (server-side) if needed.
    return Response.json({ ok: true, message: 'Murph Miles awarded' });
  } catch (err) {
    console.error(err);
    return new Response('Error awarding Murph Miles', { status: 500 });
  }
}
