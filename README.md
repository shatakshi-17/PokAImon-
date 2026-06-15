# PokAImon

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Google Gemini](https://img.shields.io/badge/Google_Gemini-8E75B2?style=for-the-badge&logo=google-gemini&logoColor=white)
![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)

Draw a creature, export your sketch, and let AI turn it into Pokemon-style flashcards.

**Live demo:** [https://6a2ff0d99c5e7c4f2271dd05--ubiquitous-cascaron-fee516.netlify.app/](https://6a2ff0d99c5e7c4f2271dd05--ubiquitous-cascaron-fee516.netlify.app/)
## What it does

PokAImon is a browser-based  React sketching app that uses Google's Gemini vision model to analyze your drawing and generate Pokemon-inspired flashcards. Each card includes a name, type, species, description, signature move, abilities, and habitat.

Works on desktop and mobile — draw with a mouse or your finger on a touch screen.

## Demo

![PokAImon home screen](docs/screenshots/home.png)

*Draw your creature on the canvas, then export the sketch.*

![Exported sketch preview](docs/screenshots/drawing.png)

*After exporting, analyze the sketch to generate Pokemon-style flashcards.*

![Generated Pokemon flashcards](docs/screenshots/results.png)

## Local development

1. Clone the repo and install dependencies:

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env` and add your [Gemini API key](https://aistudio.google.com/apikey):

   ```bash
   cp .env.example .env
   ```

3. Start the dev server:

   ```bash
   npm run dev
   ```

## Tech stack

Built with React, Vite, Tailwind CSS, the Google Gemini API, and deployed on Netlify.