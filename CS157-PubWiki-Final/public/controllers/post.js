wikiApp.controller("postController", function($scope, $http, $routeParams) {
  // Controller for post view
if (sessionStorage.getItem("jwt") === null){
    window.location = "#!/signin";
  }
  else{
    $scope.author = sessionStorage.getItem("fullName");
    $scope.userId = sessionStorage.getItem("userId");
    console.log("post contr userId=" + $scope.userId);
    console.log("setting author=" + $scope.author);
  }
  //determine if this is a new post or an edit. 
 
  if ($routeParams.urlName){
    $scope.urlName = $routeParams.urlName;
    $scope.newPost = false;
  }
  else {
    $scope.newPost = true;
  }



  $scope.saveWiki = function(){
    $scope.wiki = {
        urlName: $scope.urlName, 
        title: $scope.title,
        author: $scope.author,
        password: $scope.password,
        wikiContent: getHtml(),
        category: $scope.category,
        _userid: $scope.userId
      }
    if ($scope.newPost){ //new Post 
      //console.log("provided password = " + $scope.wiki.password);
      $http.post("/api/wiki/", JSON.stringify($scope.wiki),
        {
          withCredentials: true,
          headers:{ 'Authorization':  'Bearer ' + sessionStorage.getItem('jwt')}
        }
      )
      .then(function(result) {
        window.location = "/#!/" + $scope.urlName;
      }).catch(function(error) { // call failed (4xx, 5xx)
        alert(error.statusText);
        $scope.postErrorMsg = error.data;
      //alert("error updating post: " + $scope.urlName + " " + $scope.postErrorMsg);
    
      });

    }  // end new Post
    else {  // update post
      $http.put("/api/wiki/" + $scope.urlName, JSON.stringify($scope.wiki),
        {
          withCredentials: true,
          headers:{ 'Authorization':  'Bearer ' + sessionStorage.getItem('jwt')}
        }  
      )
      .then(function(result) { 
        $scope.postErrorMsg = "";
        window.location = "/#!/" + $scope.urlName;
      }).catch(function(error) { // call failed (4xx, 5xx)
        $scope.postErrorMsg = error.data;
      //alert("error updating post: " + $scope.urlName);
      });
    }
  }

  $scope.deleteWiki = function() { //must send jwt
    $http.delete("/api/wiki/" + $scope.urlName, 
      {
          withCredentials: true,
          headers:{ 'Authorization':  'Bearer ' + sessionStorage.getItem('jwt')}
      } 
    )
    .then(function(result) { 
       window.location = "/";
      }).catch(function(error) { // call failed (4xx, 5xx)
        $scope.postErrorMsg = error.statusText;
      alert("error updating post: " + $scope.urlName);
      });
  }

  // CKEditor
  ClassicEditor.create(document.querySelector('#editor'), {
    toolbar: {
      items: ['heading', 'fontSize', 'fontColor', 'fontBackgroundColor', 'highlight', 'removeFormat', '|', 'bold', 'italic', 'underline', 'link', 'bulletedList', 'numberedList', 'todoList', '|', 'outdent', 'indent', 'alignment', '|', 'blockQuote', 'insertTable', 'imageInsert', 'mediaEmbed', 'undo', 'redo', '|', 'code', 'codeBlock', 'htmlEmbed', 'MathType', 'ChemType', 'strikethrough', 'subscript', 'superscript', 'horizontalLine'],
      shouldNotGroupWhenFull: true
    },
    mediaEmbed: {
      previewsInData: true
    },
    language: 'en',
    image: {
      toolbar: ['imageTextAlternative', 'imageStyle:full', 'imageStyle:side']
    },
    table: {
      contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableCellProperties', 'tableProperties']
    },
    licenseKey: '',
  })
  .then(editor => {
    window.editor = editor;
    editorReady();
  })
  .catch( error => {
    console.error('Oops, something went wrong!');
    console.error('Please, report the following error on https://github.com/ckeditor/ckeditor5/issues with the build id and the error stack trace:');
    console.warn('Build id: bojh7pnw6nnm-dfpekd22znn5');
    console.error(error);
  });

  // This function is called when the editor is ready (Your GET logic should go here)
  function editorReady(editor) {
  

  if (!$scope.newPost){
      $http.get("/api/wiki/" + $routeParams.urlName)
    .then(function(result) { // call was a success (status of 2xx)
      $scope.title = result.data.title;
      $scope.category = result.data.category; 
      $scope.published = result.data.published;
      $scope.updated = result.data.updated;
      $scope.pageViews = result.data.pageViews;
      $scope.html = result.data.wikiContent;
      $scope.urlName = $routeParams.urlName;
      $scope.passwordRE = "/^" + result.data.password + "$/";
      window.editor.setData($scope.html);
    }).catch(function(error) { // call failed (4xx, 5xx)
      $scope.postErrorMsg = error.statusText;
      alert("in post/edit controller no result from " + "/api/wiki/" + $routeParams.urlName);
    });
  }
  else{

    window.editor.setData("");
  }
    
  }

  // This function returns the HTML contents of the editor (Call this during your POST/PUT operations)
  function getHtml() {
    return window.editor.getData();
  }

  // For your save logic, you will have two concerns
  // 1. Saving an existing wiki (use $routeParams.urlName to check) and do a PUT
  //    request passing in the data items. call getHtml() to get the HTML of CKEditor
  // 2. Saving a new wiki, do a POST request

});