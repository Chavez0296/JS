var employeeData = [{
    id: 1,
    name: "Andy Miller",
    email: "amiller@yahoo.com",
    password: "miller123",
    street: "13356 Eldridge Ave",
    city: "Sylmar",
    state: "CA",
    zip: "91342",
    phone: "818-333-7777"
  }, {
    id: 2,
    name: "Joy Holiday",
    email: "jholiday@gmail.com",
    password: "holiday123",
    street: "123 Main St.",
    city: "Los Angeles",
    state: "CA",
    zip: "91321",
    phone: "111-222-3333"
  }, {
    id: 3,
    name: "April May",
    email: "amay@outlook.com",
    password: "may123",
    street: "321 34th Ave.",
    city: "Dallas",
    state: "TX",
    zip: "95001",
    phone: "555-555-5555"
  }];

  var keyIndex = 4;

  function getEmployees() {
    return employeeData;
  }

  function getEmployee(empID) {
    return employeeData.find( ({ id }) => id === empID );
  }

  function authenticateEmployee(emailAddr, password) {
    let emp = employeeData.find( ({ email }) => email === emailAddr );
    if (emp) {
      if (emp.password === password) {
        return emp;
      }
    }
    return null;
  }

  function addEmployee(data) {
    var newEmpl = {
      id: keyIndex++,
      name: data.name,
      email: data.email,
      password: data.password,
      street: data.street,
      city: data.city,
      state: data.state,
      zip: data.zip,
      phone: data.phone
    };

    employeeData.push(newEmpl);
    return newEmpl;
  }

  function updateEmployee(empID, data) {
    var emp = employeeData.find( ({ id }) => id === empID );

    if (emp) {
      if (data.name != undefined)
        emp.name = data.name;
      if (data.email != undefined)
        emp.email = data.email;
      if (data.street != undefined)
        emp.street = data.street;
      if (data.city != undefined)
        emp.city = data.city;
      if (data.state != undefined)
        emp.state = data.state;
      if (data.zip != undefined)
        emp.zip = data.zip;
      if (data.phone != undefined)
        emp.phone = data.phone;
      return emp;
    }
    return null;
  }

  function deleteEmployee(empID) {
    for(var i = 0; i < employeeData.length; i++) {
      if (employeeData[i].id === empID) {
        var x = employeeData.splice(i, 1);
        return x;
      }
    }
    return null;
  }

  function deleteAllEmployees() {
    employeeData = [];
  }

  module.exports.addEmployee = addEmployee;
  module.exports.updateEmployee = updateEmployee;
  module.exports.getEmployees = getEmployees;
  module.exports.getEmployee = getEmployee;
  module.exports.deleteEmployee = deleteEmployee;
  module.exports.deleteAllEmployees = deleteAllEmployees;
  module.exports.authenticateEmployee = authenticateEmployee;