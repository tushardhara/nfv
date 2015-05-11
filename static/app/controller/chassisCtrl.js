app.controller('chassisCtrl', ['$scope','httpq', function($scope,httpq){
	var responsiveHelper = undefined;
    var breakpointDefinition = {tablet: 1024,phone: 480};
    $('#show-modal').click(function() {
        $('#addNewAppModal').modal('show');
    });
	$scope.getUserfn = function(){
    	httpq.get('/getuser')
		  .then(function(data) {
		    $scope.user_list = data;
		    $("#select-user").select2({
			  placeholder: "Select a Tenent",
			  allowClear: true
			});
		    console.log(data);
		  })
		  .catch(function(data, status) {
		    console.error('Gists error', response.status, response.data);
		  })
		  .finally(function() {
		    console.log("finally finished gists");
		  });
    }
    $scope.getChassisfn = function(){
    	httpq.get('/getchassis')
		  .then(function(data) {
		    $scope.chassis_list = data;
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
    $scope.getChassisfn();
    $scope.submit = function(){
    	console.log($scope.newchassis);
    	httpq.post('/createchassis',$scope.newchassis)
		  .then(function(data) {
		    //$scope.form_elements = data;
            $('#addNewAppModal').modal('hide');
           	$scope.getChassisfn();
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
			httpq.post('/deletechassis',x)
			  .then(function(data) {
	           	$scope.getChassisfn();
			  })
			  .catch(function(data, status) {
			    console.error('Gists error', response.status, response.data);
			  })
			  .finally(function() {
			    console.log("finally finished gists");
			  });    
		} 
    }
}]);