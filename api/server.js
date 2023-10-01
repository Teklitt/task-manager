

var express = require('express');
const cors = require('cors');
var Mongoclient = require("mongodb").MongoClient;
const multer = require("multer");

const CONNECTION_STRING = "mongodb+srv://task-manager:taskmanager123@cluster0.to1rhj3.mongodb.net/?retryWrites=true&w=majority";
const DATABASE_NAME = "taskManager";


console.log("testing");
//Mongodb client
var database;

// Initializes and sets up an Express application which which you can use to define routes, handle HTTP requests, and more.
const app = express();

// gives/blocks access to making requests for security reasons
app.use(cors());

// Starts the Express app and listen to the request coming from localhost 4200
app.listen(3000, () => {
    // Instantiate Mongodb client
    Mongoclient.connect(CONNECTION_STRING, (error, client)=> {
        if (error) {
            console.error('MongoDB connection error:', error);
            return;
        }
        // Allows you to connect to a specific database bc you could have multiple databases.
        database = client.db(DATABASE_NAME);
        console.log("Mongo DB Connection Successful");
    })
})

app.get('/api/toDoApp/GetToDo', (request, response)=>{
    database.collection("toDoData").find({}).toArray((error, result)=>{
        if(error) {
            response.status(500).send('Internal Server Error');
        } else{
            response.send(result);
        }
    });
})

app.post("/api/toDoApp/AddToDo", multer().none(), (request,response)=>{
    database.collection("toDoData").count({},function(error){
        if (error) {
            response.status(500).send('Internal Server Error');
        } else {
            database.collection("toDoData").insertOne({
                task:request.body.newNotes,
                date:request.body.todaysDate,
                time:request.body.time

            });
            response.json("Added Successfully");
        }
    })
})

app.delete("/api/toDoApp/DeleteToDo", (request, response) => {
    database.collection("toDoData").deleteOne({
        _id: request.query._id
    }, (error) => {
        if (error) {
            response.status(500).json('Internal Server Error');
        } else {
            response.json("Delete Successfully");
        }
    });
});