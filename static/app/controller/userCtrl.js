app.controller('userCtrl', ['$scope','httpq', function($scope,httpq){
    var responsiveHelper = undefined;
    var breakpointDefinition = {tablet: 1024,phone: 480};
    $('#show-modal').click(function() {
        $('#addNewAppModal').modal('show');
    });
    $scope.getUserfn = function(){
    	httpq.get('/getuser')
		  .then(function(data) {
		    $scope.form_elements = data;
		    console.log(data);
		  })
		  .catch(function(data, status) {
		    console.error('Gists error', response.status, response.data);
		  })
		  .finally(function() {
		    console.log("finally finished gists");
		  });
    }
    $scope.getUserfn();
    $scope.newuser = "";
    $scope.submit = function(){
    	console.log($scope.newuser);
    	httpq.post('/createuser',$scope.newuser)
		  .then(function(data) {
		    //$scope.form_elements = data;
            $('#addNewAppModal').modal('hide');
           	$scope.getUserfn();
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
			httpq.post('/deleteuser',x)
			  .then(function(data) {
	           	$scope.getUserfn();
			  })
			  .catch(function(data, status) {
			    console.error('Gists error', response.status, response.data);
			  })
			  .finally(function() {
			    console.log("finally finished gists");
			  });    
		} 
    }
    $scope.edit = function(x){
    	$('#editNewAppModal').modal('show');
    	$scope.edituser = {
    		"enum_id" : x.enum_id,
			"email_id" : x.email_id,
			"user_name" : x.user_name,
			"linux_id" : x.linux_id,
			"chassis_detail" : x.chassis_detail,
    	} 
    }
    $scope.esubmit = function(){
    	console.log($scope.edituser);
    	httpq.post('/edituser',$scope.edituser)
		  .then(function(data) {
		    //$scope.form_elements = data;
            $('#editNewAppModal').modal('hide');
           	$scope.getUserfn();
		  })
		  .catch(function(data, status) {
		    console.error('Gists error', response.status, response.data);
		  })
		  .finally(function() {
		    console.log("finally finished gists");
		  });
    }
    $scope.cancel = function(){
    	$('#editNewAppModal').modal('hide');
    	$('#addNewAppModal').modal('hide');
    }
}]);