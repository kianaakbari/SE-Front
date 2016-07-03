
    var app = angular.module("registerApp", []);
    app.controller("registerAppController", function ($scope, $http) {

        $scope.SendData = function () {
            var data = ({
                email: $scope.email,
                firstname: $scope.firstname,
                lastname: $scope.lastname,
                password: $scope.password,
                is_audience: 0
            });

            var config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            $http.post('http://154.16.156.58:8000/api/v1/register', (data), config)
                    .success(function (data, status, headers, config) {
                    })
                    .error(function (data, status, header, config) {
                         if(status==406) {$scope.errtext = "شما قبلا در سایت عضو شده اید";}
                         else if(status==401) {$scope.errtext = "ایمیل تایید ارسال نشد";}
                    });
        };

    });
