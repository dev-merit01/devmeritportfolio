# devmerit — Merit Ngorima Portfolio

Personal portfolio and contact site for Merit Ngorima. Built with Vite + React + TypeScript and includes a small client-side AI chat assistant (Merit AI Assistant) and a contact form integrated with Web3Forms.

## Features

- Static portfolio sections: Hero, About, Skills, Projects, Hire, Contact
- Contact form (Web3Forms integration)
- Client-side chatbot powered by OpenAI (configurable via env)
- Responsive design with Tailwind CSS
- Reusable UI components under `src/components/ui`

## Tech Stack

- Frontend: React, TypeScript, Vite
- Styling: Tailwind CSS
- Components: lucide-react, sonner (toasts)
- Chatbot: OpenAI Chat Completions (client-side example)

Note: The chatbot demonstrates client-side integration. For production, keep API keys server-side and proxy requests.

## Getting Started

1. Install dependencies

```bash
npm install
```

2. Create a `.env` file in the project root with these variables (do NOT commit `.env`):

```env
VITE_WEB3FORMS_KEY=your_web3forms_access_key
VITE_OPENAI_API_KEY=your_openai_api_key
```

3. Run the dev server

```bash
npm run dev
```

4. Open the site at `http://localhost:5173` (or the address shown by Vite).

## Notes on Secrets and Deployment

- This repository's `.env` must never be committed. Use GitHub Secrets or a server-side endpoint to store API keys for production.
- To secure the chatbot, implement a server-side proxy endpoint that signs requests to the OpenAI API.

## How the Chatbot Works (overview)

- The chatbot builds a system prompt from a preloaded profile about Merit and sends a Chat Completion request to OpenAI.
- If no OpenAI key is present the component falls back to a simulated response.

## Contributing

If you want to suggest changes or file issues, open a GitHub issue or PR in this repository.

## License

This project doesn't include a license file. Add one if you plan to open-source it.

