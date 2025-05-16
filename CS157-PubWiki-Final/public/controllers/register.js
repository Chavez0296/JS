wikiApp.controller("registerController", function($scope, $http) {
  // Controller for registration view (extra credit)
  $scope.Register = function(){
    $scope.newUser = {
      fullName: $scope.fullName,
      email: $scope.email,
      username: $scope.username,
      password: $scope.password
    }
    $http.post("/api/user/register", JSON.stringify($scope.newUser))
      .then(function(result) {
        $scope.regError = "";
        $scope.regSuccess = true;
      }).catch(function(error) { 
        console.log(error.message);
        $scope.regError = "Registration Failed";
        $scope.regSuccess = false;
      })
  };
});