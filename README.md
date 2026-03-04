# AI Movie Insight

AI Movie Insight is a small web app where users can enter an IMDb movie ID and see movie details along with an AI-generated prediction of audience sentiment based on the movie plot.

The movie information is fetched from the OMDb API, and the sentiment analysis is generated using Google Gemini AI.

## Setup Instructions

1. Clone the repository
  ```bash
  git clone https://github.com/Gaurang-Pandey/AI-Movie-Insight.git
  cd AI-Movie-Insight
  ```

2.Install dependencies
  ```bash
  npm install
  ```

3.Create a .env.local file in the root folder and add:
  ```bash
  OMDB_KEY=your_omdb_api_key
  GEMINI_KEY=your_gemini_api_key
  ```

4.Run the project
  ```bash
  npm run dev
  ```

5.Then open:
  ```bash
  http://localhost:3000
  ```

## Tech Stack Rationale

**Next.js:** Used for building the frontend and API routes in a single framework.

**Tailwind CSS:** Used for styling because it allows quick UI development and keeps the styles consistent.

**OMDb API:** Used to fetch movie details like title, poster, rating, cast, and plot.

**Google Gemini AI:** Used to analyze the movie plot and generate a predicted audience sentiment.

## Assumptions

- Users will enter a valid IMDb ID (for example: tt0133093).
- The AI sentiment prediction is based only on the movie plot, not real audience reviews.
- If the AI or API fails, the app shows a fallback message instead of crashing.

## Testing

Basic unit tests are included using Jest.

Run tests with:
    ```bash
    npm test
    ```

## Deployment

The project is deployed on Vercel.

Live link:
https://ai-movie-insight-eta.vercel.app/
