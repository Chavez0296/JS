wikiApp.controller("displayController", function($scope, $http, $routeParams, $sce) {
  // Controller for display view
  
  wikiApp.controller("displayController", function($scope, $http, $routeParams, $sce) {
  //alert($routeParams.urlName);
  console.log("/api/wiki/" + $routeParams.urlName);
  $http.get("/api/wiki/" + $routeParams.urlName)
    .then(function(result) { // call was a success (status of 2xx)
      $scope.title = result.data.title;
      $scope.authorId = result.data._userid;
      console.log("display controller, authorId=" + $scope.authorId);
      $scope.category = result.data.category; 
      console.log("category " + $scope.category);
      $scope.published = result.data.published;
      $scope.updated = result.data.updated;
      $scope.pageViews = result.data.pageViews;
      $scope.html = result.data.wikiContent;
      $scope.urlName = $routeParams.urlName;
      // need to retrieve the author's name
      $http.get("/api/user/" + $scope.authorId) 
        .then(function(result) {
        $scope.author = result.data.fullName;
        if ($scope.authorId == sessionStorage.getItem("userId")){
          $scope.authorLoggedIn = true;
        }
        else{
          //alert ("author not logged in; authorId=" + $scope.authorId + " ; logged in user=" + sessionStorage.getItem("userId"));
          $scope.authorLoggedIn = false;
        }
        })
        .catch(function(error){
          alert("in display controller error retrieving author fullName");
        });
      })
    .catch(function(error) { // call failed (4xx, 5xx)
      alert("in display controller no result from " + "/api/wiki/" + $routeParams.urlName);
    });



 
$scope.editPost = function(urlName) {
  window.location = "#!/post/" + $scope.urlName;
}


if ((sessionStorage.getItem("jwt") === null)){
  console.log("display: no jwt found");
  $scope.authorLoggedIn = false;
} 
else if ($scope.authorId == sessionStorage.getItem("_id")){
  $scope.authorLoggedIn = true;
}

});

   // this will be the urlName for your page

  // Notes:
  // Make an GET ajax call to endpoint and pass in the urlName
  // The result will contain the html that should get assigned to $scope.html
  // $scope.title = response.data.title
  // $scope.html = response.data.html
  // ..

});