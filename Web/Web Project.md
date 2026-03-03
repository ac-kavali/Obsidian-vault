### The Idea

[Full Idea and Structure](https://claude.ai/chat/e67c404a-2dad-42d1-aec2-6b18168f8545)

---
### Steps

**1. Project Setup** Create the folder structure: `server.js` at the root, and a `public/` folder containing `index.html`.

**2. Get a Free API Key** Sign up at openweathermap.org → go to your API Keys tab → copy it.

**3. Build the Server (`server.js`)**

- Install Express with `npm install express`
- Serve the `public/` folder as static files
- Create one route: `GET /weather?city=London`
- Inside that route, use Node's built-in `https` module to call OpenWeatherMap with your secret API key
- Extract only the useful data (temp, humidity, etc.) and send it back as JSON

**4. Build the Frontend (`index.html`)**

- A text input for the city name and a search button
- When clicked, use `fetch('/weather?city=...')` to call YOUR server
- Wait for the JSON response with `async/await`
- Inject the data into the page (temperature, description, icon, etc.)
- Handle errors gracefully (city not found, server offline)

**5. Run & Test**

- Start the server: `node server.js`
- Open `http://localhost:3000` in your browser
- Search for any city and watch the full request cycle happen

---

### Key concepts you'll practice

- **HTTP GET requests** with query parameters
- **fetch() + async/await** on the client
- **Express routing** and `req.query` on the server
- **JSON** as the language between client and server
- **Why hide API keys** on the server instead of the browser