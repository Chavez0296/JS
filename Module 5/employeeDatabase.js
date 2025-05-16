var employeeData = [{
    id: 0,
    name: "Narbeh Minassian",
    email: "minassn@laccd.edu",
    address: "770 Wilshire Blvd. Los Angeles, CA 90017",
    phone: "818-364-7777"
  }];
  
    var keyIndex = 1;
  
    function getEmployees() {
      return employeeData;
    }
  
    function getEmployee(empID) {
      return employeeData.find( ({ id }) => id === empID );
    }
  
    function addEmployee(data) {
      var newEmpl = {
        id: keyIndex++,
        name: data.name,
        email: data.email,
        address: data.address,
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
        if (data.address != undefined)
          emp.address = data.address;
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