app.controller('podCtrl', ['$scope','httpq', function($scope,httpq){
    var responsiveHelper = undefined;
    var breakpointDefinition = {tablet: 1024,phone: 480};
    $('#show-modal').click(function() {
        $('#addNewAppModal').modal('show');
    });
    $scope.getPodfn = function(){
    	httpq.get('/getpod')
		  .then(function(data) {
		    $scope.pod_list = data;
		    console.log(data);
		  })
		  .catch(function(data, status) {
		    console.error('Gists error', response.status, response.data);
		  })
		  .finally(function() {
		    console.log("finally finished gists");
		  });
    }
    $scope.getPodfn();
    $scope.newPod = "";
    $scope.submit = function(){
    	console.log($scope.newuser);
    	httpq.post('/createpod',$scope.newuser)
		  .then(function(data) {
		    //$scope.form_elements = data;
            $('#addNewAppModal').modal('hide');
           	$scope.getPodfn();
		  })
		  .catch(function(data, status) {
		    console.error('Gists error', response.status, response.data);
		  })
		  .finally(function() {
		    console.log("finally finished gists");
		  });
    }
    $scope.delete = function(x){
    	var r = confirm("Do you Want to Delete");
		if (r == true) {
			httpq.post('/deletepod',x)
			  .then(function(data) {
	           	$scope.getPodfn();
			  })
			  .catch(function(data, status) {
			    console.error('Gists error', response.status, response.data);
			  })
			  .finally(function() {
			    console.log("finally finished gists");
			  });    
		} 
    }
    $scope.cancel = function(){
    	$('#editNewAppModal').modal('hide');
    	$('#addNewAppModal').modal('hide');
    }
}]);