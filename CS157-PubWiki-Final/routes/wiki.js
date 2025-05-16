const Wiki = require("../models/wiki.js");
const express = require("express");
const authUser = require("../middleware/authUser.js");
const router = express.Router();

// Endpoint handlers



// /api/wiki/:pageUrl
// This handler should do two things, update the hit counter and return the results
router.get("/:pageUrl", (req, res) => {

  // find the page based on the pageUrl
  // if the page is found, update the hits
  console.log("routes/wiki get pageUrl=" + req.params.pageUrl);
  Wiki.findOne({urlName: req.params.pageUrl})
      .exec(function(err, result) {
        //if (err) console.log(err);
        if (!err) {
          if (result){
            result.pageViews++;
            result.save(function(err, result) {
              if (err) {
                res.status(400).send("Database Error");
              }
              else{
                res.status(200).send(result);
              }
            })
          }
        } else {
          res.status(400).send("no page found: " + req.params.pageUrl);
        }
    })
  
})

router.put("/:pageUrl", authUser, (req, res) => {
    Wiki.findOne({urlName: req.params.pageUrl})
      .exec(function(err, result) {
        if (!err) {
          if (result){
              result.title = req.body.title;
              result.category = req.body.category;
              result.wikiContent = req.body.wikiContent;
              if (result._userid == req.user._id){
                  result.save(function(err, result) {
                    if (err){
                      console.log("update error" + err.message);
                      res.status(400).send("Update Error");
                    }
                    else{
                      res.status(200).send(result);
                    } 
                  })
              }
              else {
                res.status(400).send("Update Failed, User does not own this wiki");
              }
          }
          else{
            res.status(400).send("Page not found at server");
          }
        }
        else{
          res.status(400).send("Server Error Retrieving Page");
        }

      })
});


// 1) Search Endpoint

router.get("/search/:term", (req, res) => {
  console.log("search for " + req.params.term);
  var filter = {
    $or: [
      { title: { $regex: req.params.term, $options: "i" } },
      { wikiContent: { $regex: req.params.term, $options: "i" } }
    ]
  }

  Wiki.find(filter)
  .exec(function(err, result) {
    if (err) {
      console.log("search term not found " + err.message);
      res.status(400).send(err);  
    } else {
      if (result) {
        //console.log("result found: " + JSON.stringify(result));
        res.status(200).send(result);
      }
      else{
        res.status(404).send("no matches found");
      }
    }
  });
      
})



// 3 Create new wiki page POST /api/wiki/

router.post("/", (req, res) => {
  // 1) create the new wiki object new Wiki(req.body)
  // 2) You save the wiki .save() and return the 
  
  newWiki = new Wiki(req.body);
  //console.log("password = " + req.body.password);

  newWiki.save(function(err, result) {
    if (!err) {
      res.status(200).send(result);
    } else {
      res.status(400).send(err);
    }
  })
})



// 5 Delete a wiki page DELETE /api/wiki/:urlName
router.delete("/:urlName", (req, res) => {
  
  console.log("delete: req.params.urlName= " + req.params.urlName);
  Wiki.findOne({ urlName: req.params.urlName }, (err, result) => {
    if (err){
      console.log("error finding wiki to delete:" + req.params.urlName );
      res.status(404).send("Cannot find wiki to delete");
    }
    else {
      if (result) { 
          Wiki.findByIdAndDelete(result._id, function(err, doc){
            if (err){
              console.log("delete db error: " + err.mesage);
              res.status(400).send("error deleting " + req.params.urlName);
            }
            else{
              console.log("delete successful");
              res.status(200).send("post " + req.params.urlName + "successfully deleted");
            }
          });
      }
    }

  })
})

//api/wiki/:id  retrieve list of posts authored by user
router.get("/userLanding/:id", (req, res) => {
  console.log("get list of posts for user id=" + req.params.id);
  Wiki.find({ _userid: req.params.id }, (err, result) => {
    if (!err) {
      res.status(200).send(result);
    } else {
      console.log(" error in get userLanding" + err.message);
      res.status(400).send(err);
    }
  })
});

module.exports = router;