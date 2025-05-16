wikiApp.controller("signinController", function($scope, $http) {
  // Controller for signin view (extra credit)
  $scope.Signin = function() {
    $scope.userData = {
      email: $scope.email,
      password: $scope.password
    }
    console.log(JSON.stringify($scope.userData));
    $http.post("/api/user/login", JSON.stringify($scope.userData))
      .then(function(result) {
        sessionStorage.setItem("jwt", result.data.jwt);
        sessionStorage.setItem("fullName", result.data.fullName);
        sessionStorage.setItem("userId", result.data.userId);
        console.log("set sessionStorage userId=" + result.data.userId);
        //sessionStorage.setItem("username", result.data.username);
        $scope.signinError = "";
        window.location = "#!"
        //window.location = "#!/user/" + result.data.userId;
      }).catch(function(error) { 
        //console.log(error.message);
        $scope.signinError = "Signin Failed";
      })
  }
});