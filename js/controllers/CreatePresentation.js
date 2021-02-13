/**
 * Created by Mehdi on 4/28/2016.
 */
var app = angular.module("app", []);
app.controller("HttpGetControllerCreatePresentation", function ($scope, $http) {

    $scope.SendData = function () {
        var username = 'eyJpYXQiOjE0NjE4Mzk1NjYsImFsZyI6IkhTMjU2IiwiZXhwIjoxNDYxODQzMTY2fQ.eyJ1c2VyX2lkIjoyfQ.rCFKzs8In5z_pVAhzclrdxuGOI2URPj4Ro_s0G8m8xE';
        var password = '';


        function make_base_auth(user, password) {
            var tok = user + ':' + password;
            var hash = btoa(tok);
            return "Basic " + hash;
        };

        var data = ({
            name: $scope.PresentationName
        });

        $http({
            method: 'POST', url: 'http://127.0.0.1:8000/api/v1/create_presentation',data: JSON.stringify(data), headers: {
                'Authorization': make_base_auth(username,password),
                'Content-Type': 'application/json'
            }
        })
            .success(function (data, status, headers, config) {
                $scope.PostDataResponse = data;
            })
            .error(function (data, status, header, config) {
                $scope.PostDataResponse = data;
            });
    };

});
