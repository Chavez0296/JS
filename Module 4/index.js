const http = require("http");

const fs = require("fs");
const quote = require('./quotegen.js');
const server = http.createServer(function(req, res) {

  /*  PART 1  
      Create an endpoint handler for the root path "/" that reads
      the ./public/index.html file and sends it to the client.

      Step 1: Create the endpoint handler for url "/"
      Step 2. Import (require) the file system module, read the "./public/index.html"
              file and send the file contents to the client as the response.
      Step 3. Start your Node app and refresh the preview page to see the index.html page

      Reference: Combining HTTP with File System Module - https://ilearn.laccd.edu/courses/185123/pages/module-4-nodejs-reference
  */

  // Part 1 Code Here

    if(req.url == "/"){
      res.writeHead(200, {"Content-Type": "text/html"});
      fs.readFile("./public/index.html", function(err, data){
        if(!err){
          res.write(data);
          res.end();
        }
      });
    }


  // Begin Parts 2 to 4 AFTER your Node app is able to load the index.html file from part 1

  /*  PART 2
      Create an endpoint handler for "/hello" and have Node send back a
      text/plain response of "Hello Client!"

      Step 1: Create the endpoint handler for url "/hello" that returns a content-type of text/plain.
      Step 2: Send the client "Hello Client" as the response.

      Reference: HTTP Module - https://ilearn.laccd.edu/courses/185123/pages/module-4-nodejs-reference
  */

  // Part 2 Code Here
    if(req.url == "/hello"){
      res.writeHead(200, {"Content-Type": "text/html"});
      res.write("Hello Client");
      res.end();
    }



  /*  PART 3
      Create an endpoint handler for "/quote" that uses the quotegen
      module provided for you in this project to generate a random quote
      that is sent to the client. The quotegen module has a single function
      called getQuote() that automatically returns a random quote for you.

      Step 1: Create the endpoint handler for "/quote" that returns a content-type of text/html.
      Step 2: Import (require) the quotegen module
      Step 3: Use the getQuote() function to get a random quote from the module
      Step 4: Send the client the quote as the response.

      Reference: Loading Modules - https://ilearn.laccd.edu/courses/185123/pages/module-4-nodejs-reference
  */

  // Part 3 Code Here
    if(req.url == "/getquote"){
      res.writeHead(200, {"Content-Type": "text/html"});
      res.write(quote.getQuote());
      res.end();
    }



  /*  PART 4
      Create an endpoint handler for "/address" that creates a
      random name/address object, stringifys the object into a JSON
      string and send it to the client as an application/json content-type.

      Step 1: Create the endpoint handler for "/address" that returns a content-type of application/json.
      Step 2: Create an object with properties for: name, street, city, state and zip
      Step 3: Stringify the object into a JSON string using JavaScript's JSON function.
      Step 4: Send the client the JSON string as the response.

      Reference: 14. JavaScript Objects - https://ilearn.laccd.edu/courses/185123/pages/module-2-introduction-to-javascript-and-reference
      Reference: JSON - https://ilearn.laccd.edu/courses/185123/pages/module-3-json
  */

  // Part 4 Code Here
    if(req.url == "/getaddress"){
      res.writeHead(200, {"Content-Type": "application/json"});
      let address = {
        name: "Luis",
        street: "Sheldon St",
        city: "Sun Valley",
        state: "CA",
        zip: "91352"
      };
      res.write(JSON.stringify(address));
      res.end();
    }


});

server.listen(3000);