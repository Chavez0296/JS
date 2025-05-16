const mongoose = require("mongoose");

// STEP 2 - DEFINE THE SCHEMA

const wikiSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 30
  },
  _userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  category: {
    type: String,
    enum: ["Technology", "history", "art", "technology"],
    default: "Technology",
    required: true
  },
  
  pageViews: {
    type: Number,
    required: true, 
    default: 0
  }, 
  urlName: {
    type: String,
    required: true,
    maxlength: 30,
    match: /^[a-zA-Z0-9-_]+$/,
    index: {unique: true}
  },
  wikiContent:{
    type: String, 
    required: true
  },
  updated: { 
    type: Date, 
    default: Date.now 
  },
  published:  { 
    type: Date, 
    default: Date.now 
  }
});
//{ timestamps: true },     //updatedAt field will be maintained automatically
// STEP 3 - CREATE THE MODEL

module.exports = mongoose.model("Wiki", wikiSchema);
