const mongoose = require("mongoose");

mongoose.connect(
  // STEP 1 - Use your own connection string here. Make sure the database name is AuthApp
  "mongodb+srv://cs157:<password>@cs157.j1ymg.mongodb.net/AuthApp?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  },
  function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Connected to MongoDB...");
    }
  }
);