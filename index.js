// Step 1: Import necessary modules.
import express from "express";
import axios from "axios";
// Step 2: Initialize an Express application.
const app = express();
const port = 3000;
// Step 3: Serve static files.
// Configure Express to serve static files (like CSS, JavaScript, images) from a directory named 'public'.
app.use(express.static("public"));
// Step 4: Set the view engine.
// Configure Express to use EJS as the template engine for rendering dynamic web pages
app.set("view engine", "ejs");

// Step 5: Define a route for the home page.
// When a user goes to the root URL ('/'), the server should respond by rendering the 'index.ejs' file.
// app.get("/", async (req, res) => {
//     try {
//         const baseURL = "https://sv443.net/jokeapi/v2";
//         const categories = ["Programming", "Misc", "Pun", "Spooky", "Christmas"];
        
//         // Choose a random category
//         const randomCategory = categories[Math.floor(Math.random() * categories.length)];

//         // Make an HTTP GET request to the API to retrieve a random joke
//         const response = await axios.get(`${baseURL}/joke/${randomCategory}`);
//  // Step 5.2: Render the response.
//       // If the request is successful, render the 'index.ejs' file and pass the secret and user data to it.
//         // Check if the joke is a single or two-part joke
//         if(response.data.type === "single") {
//             // For single-part jokes
//             res.render('index.ejs', { joke: response.data.joke });
//         } else {
//             // For two-part jokes
//             res.render('index.ejs', { joke: `${response.data.setup} ... ${response.data.delivery}` });
//         }
//     } catch (error) {
//         console.error('Error fetching joke:', error);
//         res.render('index', { joke: 'Sorry, could not fetch a joke at this time.' });
//     }
// });

// Step 5: Define a route for the home page.
// handling selecting a joke according to a category
app.get("/", async (req, res) => {
    try {
      const category = req.query.category; // Get the selected category from the form
      const response = await axios.get(`https://sv443.net/jokeapi/v2/joke/${category}`);
      const jokeData = response.data;
  
      let joke;
      if (jokeData.type === 'single') {
        joke = jokeData.joke;
      } else {
        joke = `${jokeData.setup} ... ${jokeData.delivery}`;
      }
  
      res.render("index.ejs", { joke: joke });
    } catch (error) {
      console.error(error);
      res.render("index.ejs", { joke: "Failed to fetch joke." });
    }
  });
  

// Step 6: Start the server.
// Make the server listen on the defined port. This will start the server and make it ready to handle requests.
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
