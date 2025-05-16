wikiApp.controller("homeController", function($scope, $http) {
  // Controller for home view
if (sessionStorage.getItem("jwt") === null){
    $scope.showUserWikis = false;
    $scope.showSearchHeader = true;
    $scope.loggedInUser = false;
  }
  else{
    $scope.showUserWikis = true;
    $scope.showSearchHeader = false;
    $scope.loggedInUser = true;
    $scope.userId = sessionStorage.getItem("userId");
    $scope.fullName = sessionStorage.getItem("fullName");
    $http.get("/api/wiki/userLanding/" + $scope.userId)
      .then(function(result) {
        if (result){
          $scope.numSearchResults = result.data.length;
          console.log(result.data.length + " results");
          $scope.searchResults = result.data;
        }
        
      });
  }

  $scope.showUserPosts = function() {
    $scope.showUserWikis = true;
    $scope.showSearchHeader = false;
    $scope.userId = sessionStorage.getItem("userId");
    $scope.fullName = sessionStorage.getItem("fullName");
    $http.get("/api/wiki/userLanding/" + $scope.userId)
      .then(function(result) {
        if (result){
          $scope.numSearchResults = result.data.length;
          console.log(result.data.length + " results");
          $scope.searchResults = result.data;
        }
        
      });
  };
  
  $scope.search = function() { 
    if ($scope.searchForm.$valid) {
      //alert("search for" + $scope.searchTerm);
      $http.get("/api/wiki/search/" + $scope.searchTerm)
      .then(function(result) {
        if (result){
          $scope.numSearchResults = result.data.length;
          //console.log(result.data.length + " results");
          $scope.searchResults = result.data;
          $scope.showSearchHeader = true;
          $scope.showUserWikis = false;
          for (let i=0; i<result.data.length; i++){
            $http.get("/api/user/" + result.data[i]._userid) 
            .then(function(userResult) {
              $scope.searchResults[i].author = userResult.data.fullName;
              //alert("id=" + result.data[i]._userid + "; fullName= " + $scope.searchResults[i].author);
            })
          .catch(function(error){
            alert("in home controller error retrieving author fullName. id=" + result.data[i]._userid);
          });
          }

        }  //end if search results returned
        else
        {
          $scope.numSearchResults = 0;
        }
      });  // end search
    }  //end valid search form
  }



  $scope.viewPage = function(url) {
    //window.location = "/api/wiki/" + url;
    window.location = "#!/" + url;
  }
  // event handler for the search button
  // $http.get() to your search endpoint
  // the result will be an array of objects, assign this to a scope var
  // $scope.searchResults = ...
});