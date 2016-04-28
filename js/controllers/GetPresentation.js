/**
 * Created by Mehdi on 4/28/2016.
 */

var app = angular.module("app", []);
app.controller("HttpGetControllerGetPresentation", function ($scope, $http) {

    $scope.SendData = function () {
        //token in user name for authorization
        var username = 'eyJpYXQiOjE0NjE3NjUwODEsImV4cCI6MTQ2MTc2ODY4MSwiYWxnIjoiSFMyNTYifQ.eyJ1c2VyX2lkIjoyfQ.DCbrjtBel4dPAOpLxTm6TsLHZ5_WW3k0qrHXScTvVYA';
        var password = '';


        function make_base_auth(user, password) {
            var tok = user + ':' + password;
            var hash = btoa(tok);
            return "Basic " + hash;
        };

        $http({
            method: 'GET', url: 'http://127.0.0.1:8000/api/v1/get_presentation/'+$scope.id, headers: {
                'Authorization': make_base_auth(username,password)
            }
        })
            .success(function (data, status, headers, config) {
                $scope.PostDataResponse = data;
            })
            .error(function(data,status){
                $scope.PostDataResponse = data;

            });

    }
});



