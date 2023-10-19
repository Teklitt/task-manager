const { MongoClient } = require("mongodb");
const CONNECTION_STRING =
  "mongodb+srv://task-manager:taskmanager123@cluster0.to1rhj3.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let database;

module.exports = {
  connectToDatabase: async function () {
    try {
      await client.connect();
      database = client.db("taskManager");
      console.log("MongoDB connected successfully");
      return database;
    } catch (e) {
      console.error(e);
      throw e; // Re-throw the error so it can be caught by the caller
    }
  },
  getDb: function () {
    return database;
  },
};

//   Mongoclient.connect(CONNECTION_STRING, (error, client) => {
//     if (error) {
//       console.error("MongoDB connection error:", error);
//       return client;
//     }
//     // Allows you to connect to a specific database bc you could have multiple databases.
//     database = client.db(DATABASE_NAME);
//     console.log("Mongo DB Connection Successful");
//   });
// }

// module.exports = { connectToDatabase };
// // Export the database variable separately (after it has been assigned a value)
// }
