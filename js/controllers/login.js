
var app = angular.module("loginApp", []);

function make_base_auth(user, password) {
var tok = user + ':' + password;
var hash = btoa(tok);
return "Basic " + hash;
}

app.controller("loginAppController", function ($scope, $http) {


//------------------------------------teacher login-------------------------------------//

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
                        window.location="Presenter Page.html";

                    })
                    .error(function (data, status, header, config) {
                        $scope.PostDataResponse = data;
                        $scope.PostStatusResponse = status;
                        // if(status==404) {document.getElementById("wrong_password").style.visibility="visible";}
                        // if(status==403) {document.getElementById("wrong_password").style.visibility="visible";}
                        // if(status==400) {document.getElementById("wrong_password").style.visibility="visible";}
                    });
        };


//------------------------------------student login-------------------------------------//

        $scope.SendData2 = function () {

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
                        // window.location="Presenter Page.html";
                    })
                    .error(function (data, status, header, config) {
                        $scope.PostDataResponse = data;
                        $scope.PostStatusResponse = status;
                        // if(status==404) {document.getElementById("wrong_password").style.visibility="visible";}
                        // if(status==403) {document.getElementById("wrong_password").style.visibility="visible";}
                        // if(status==400) {document.getElementById("wrong_password").style.visibility="visible";}
                    });
        };

    });
