const mongoose = require("mongoose");

mongoose.connect(

  "mongodb+srv://cs157:<password>@cs157.j1ymg.mongodb.net/WikiAppAuth?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Connected to MongoDB...");
    }
  }
);