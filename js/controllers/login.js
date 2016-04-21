
var app = angular.module("loginApp", []);

function make_base_auth(user, password) {
var tok = user + ':' + password;
var hash = btoa(tok);
return "Basic " + hash;
}

app.controller("loginAppController", function ($scope, $http) {

        $scope.SendData1 = function () {

            var config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': make_base_auth($scope.username, $scope.password)
                }
            };

            $http.get('http://127.0.0.1:8000/get-auth-token', config)
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

