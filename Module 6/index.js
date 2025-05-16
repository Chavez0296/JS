const express = require('express');
const employeeDatabase = require("./employeeDatabase.js");

const app = express();

app.use(express.json());
app.use(express.static('public'));

app.post("/api/employees/login", (req, res) => {
  let emp = employeeDatabase.authenticateEmployee(req.body.email, req.body.password);

  if(emp) {
    return res.status(200).send(emp);
  } else {
    return res.status(400).send("Invalid username/password.");
  }
});


app.put("/api/employees/:id", (req, res) => {
  let id = parseInt(req.params.id, 10);

  if (!isNaN(id)) {
    let emp = employeeDatabase.updateEmployee(id, req.body);
    if (emp) {
      res.status(200).send(emp);
    } else {
      res.status(404).send("Employee Not Found.");
    }
  } else {
    res.status(400).send("Invalid Employee ID.")
  }

});


/*
  PART 4 EXTRA CREDIT 
  DELETE /api/employees/:id handler here use the employeeDatabase.deleteEmployee(id)
  function to delete the employee from the database.
*/


app.listen(3000, () => console.log('server started'));
