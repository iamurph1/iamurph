# Cloudflare Pages Template

This repository contains a template to create a dynamic site on Cloudflare Pages using Pages Functions..

## Static site content

The `public/` directory contains:

- `index.html` – main page with a map, webcam embed, newsletter form, age check, and a **Murph Miles** Web3 loyalty section.
- `privacy.html`, `terms.html`, `disclaimer.html` – basic pages for required legal and privacy notices.

## Functions

Pages functions live in the `functions/` directory.

- `subscribe.js` handles newsletter sign‑ups (POST requests to `/subscribe`). It validates input and stores emails in a D1 database or forwards them to an external email service.
- `age-check.js` validates age parameters (GET requests to `/age-check?age=NUMBER`).
- `murph-miles.js` awards Murph Miles to connected wallets via Web3 and can store points in D1 or interact with a smart contract.
- `ai-chat.js` demonstrates how to call Workers AI via REST API to build AI endpoints; it requires an `AI_API_TOKEN` secret and your `CLOUDFLARE_ACCOUNT_ID`.

## Deployment

- Add the following secrets in your GitHub repository settings under **Secrets and variables → Actions**:
  - `CLOUDFLARE_API_TOKEN` – API token with Pages edit permissions.
  - `CLOUDFLARE_ACCOUNT_ID` – your Cloudflare account ID.
  - `TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY` – if using Cloudflare Turnstile.
  - `AI_API_TOKEN` – optional API token for Cloudflare Workers AI if using `ai-chat.js`.

  - The `.github/workflows/deploy.yml` file is already configured to deploy to the `iamurph` project. If you change the project name later, update the `--project-name` argument accordingly.

  - Push to the `main` branch and GitHub Actions will build and deploy your static site and functions to Cloudflare Pages.

## Additional features

This template demonstrates several emerging technologies:

- **Murph Miles loyalty program**: Connect a Web3 wallet with MetaMask on the main page and award loyalty points via the `/murph-miles` function. Points can be stored in D1 or integrated with a smart contract.
- **AI chat endpoint**: The `/ai-chat` function shows how to call Cloudflare Workers AI to generate responses.
- **Customizations**: You can replace the webcam embed, adjust the map location, integrate a real newsletter provider, or add more pages (e.g. marketplace, profile creation) under `public/` and their corresponding functions under `functions/`.
