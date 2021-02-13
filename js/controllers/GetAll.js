/**
 * Created by Mehdi on 4/28/2016.
 */
var app = angular.module("app", []);
app.controller("HttpGetControllerGetAll", function ($scope, $http) {

    $scope.SendData = function () {
        //token in user name for authorization
        var username = 'eyJpYXQiOjE0NjE3NTc0NDIsImFsZyI6IkhTMjU2IiwiZXhwIjoxNDYxNzYxMDQyfQ.eyJ1c2VyX2lkIjoyfQ.iqRZPeTgujfsgDcMaUQsOJg70AUF_K-UWZ6z_Zh8iiM';
        var password = '';


        function make_base_auth(user, password) {
            var tok = user + ':' + password;
            var hash = btoa(tok);
            return "Basic " + hash;
        };

        $http({
            method: 'GET', url: 'http://127.0.0.1:8000/api/v1/get_all_presentations/', headers: {
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
