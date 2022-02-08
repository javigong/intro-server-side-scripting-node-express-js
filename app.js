// * Task 1: Setup

let express = require("express"); // import express
let app = express(); // create the express application

app.set("port", process.env.PORT || 8080); // create a setting called ' port', with value either equal to 9090, or whatever the PORT environment variable is on the server.

// Express's Static Middleware to serve pages from public folder
app.use(express.static("public"));

let server = app.listen(app.settings.port, () =>
  console.log("listening on", app.settings.port)
); // create the server and start it up. Print a message to the console letting us know it's working

// install Nodemon: npm install nodemon --save-dev
// add to package.json scripts: "dev": "nodemon app.js"
// now we can run Nodemon easily with: npm run dev

// * Task 2: A very basic application

app.get("/", (req, res) => {
  res.send("Hello Express world!");
});

// * Task 3: About.html

// app.get("/about", (req, res) => {
//   res.sendFile("/public/pages/about.html", { root: __dirname }); // the second parameter passes an option that sets sendFile's root folder to the containing folder, which is stored by Node in the __dirname global variable.
// });

// is better to use Note Path library
let path = require("path");

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "pages", "about.html"));
});

// we can also let user to access a public folder using an Express middleware called static (see line 4)

// * Task 4: Other Pages

// Single route to the application that maps the paths "/contact" and "/contact-us" to the public/pages/contact.html:
app.get(["/contact", "/contact-us"], (req, res) => {
  res.sendFile(path.join(__dirname, "public", "pages", "contact.html"));
});

// Have '/home.html' redirect to 'index.html'. Figure out how to do a redirect using the 301 HTTP status code to indicate a permanently-moved file.

app.get("/home.html", (req, res) => {
  res.redirect(301, "/index.html");
});

// * Task 5

app.get("/characters/:type", (req, res, next) => {
  let characters = {
    coworkers: ["Ed", "Kelly", "Gordon", "Bortus", "Alara"],
    friends: {
      Paul: {
        type: "atreides",
        description: "Duke's son",
      },
      Ramallo: {
        type: "fremen",
        description: "Fremen Reverend Mother",
      },
      Vladimir: {
        type: "harkonnen",
        description: "head of House Harkonnen",
      },
    },
  };

  characters[req.params.type]
    ? res.json(characters[req.params.type])
    : next("route");
});

// Any URL that isn't covered by the above routes,  send a 404.html page with a 404 "Not Found" status code.
app.get("*", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "public", "pages", "404.html"));
});
