
    var app = angular.module("registerApp", []);
    app.controller("registerAppController", function ($scope, $http) {

        $scope.SendData = function () {
            // use $.param jQuery function to serialize data from JSON

            var data = ({
                email: $scope.email,
                firstname: $scope.firstname,
                lastname: $scope.lastname,
                password: $scope.password,
                is_audience: $scope.is_audience
            });

            var config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            $http.post('http://127.0.0.1:8000/api/v1/register', (data), config)
                    .success(function (data, status, headers, config) {
                        $scope.PostDataResponse = data;
                        $scope.PostStatusResponse = status;
                    })
                    .error(function (data, status, header, config) {
                        $scope.PostDataResponse = data;
                        $scope.PostStatusResponse = status;
                    });
        };

    });
