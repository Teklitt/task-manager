var express = require("express");
const cors = require("cors");
var Mongoclient = require("mongodb").MongoClient;
const multer = require("multer");
const { Task } = require("./models/task_model");
const bodyParser = require("body-parser"); // Import body-parser

//const CONNECTION_STRING = process.env.MONGODB_URI;
const DATABASE_NAME = "task_manager";

var database;

// Initializes and sets up an Express application which which you can use to define routes, handle HTTP requests, and more.
const app = express();

// gives/blocks access to making requests for security reasons
app.use(cors());
app.use(bodyParser.json()); // Use body-parser to parse JSON requests

// Starts the Express app and listen to the request coming from localhost 4200
app.listen(3000, () => {
  // Instantiate Mongodb client
  console.log(process.env.MONGODB_URI);
  Mongoclient.connect(process.env.MONGODB_URI, (error, client) => {
    if (error) {
      console.error("MongoDB connection error:", error);
      return;
    }
    // Allows you to connect to a specific database bc you could have multiple databases.
    database = client.db(DATABASE_NAME);
    console.log("Mongo DB Connection Successful");
  });
});

app.get("/api/toDoApp/GetToDo", (request, response) => {
  console.log("GET request entered the route handler.");
  database
    .collection("task")
    .find({})
    .toArray((error, result) => {
      if (error) {
        response.status(500).send("Internal Server Error");
      } else {
        response.send(result);
      }
    });
});

app.post("/api/toDoApp/AddToDo", async (request, response) => {
  try {
    const collection = database.collection("task");
    const title = request.body.title;

    const newTask = new Task({
      title,
    });

    const savedTask = await collection.insertOne(newTask);

    //response.status(201).json.stringify(savedTask); // Respond with a 201 status and the saved task
    response.send(savedTask).status(204);
  } catch (error) {
    console.error("Error saving task:", error);
    response.status(500).send("Internal Server Error");
  }
});

app.delete("/api/toDoApp/DeleteToDo", (request, response) => {
  database.collection("toDoData").deleteOne(
    {
      _id: request.query._id,
    },
    (error) => {
      if (error) {
        response.status(500).json("Internal Server Error");
      } else {
        response.json("Delete Successfully");
      }
    }
  );
});
