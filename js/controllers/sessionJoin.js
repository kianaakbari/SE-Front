/**
* Created by kiana on 6/2/16.
*/
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
}

var auth = getCookie('auth');
var app = angular.module("app", []);
app.controller("HttpGetController", function ($scope, $http) {

    $scope.SendData = function a() {
        var username = auth;
        var password = '';


        function make_base_auth(user, password) {
            var tok = user + ':' + password;
            var hash = btoa(tok);
            return "Basic " + hash;
        };

        var data = ({
            code: $scope.code
        });

        $http({
            method: 'POST', url: 'http://154.16.156.58:8000/api/v1/join_session',data: JSON.stringify(data), headers: {
                'Authorization': make_base_auth(username,password),
                'Content-Type': 'application/json'
            }
        })
                .success(function (data, status, headers, config) {
                    setCookie('sessionCode', $scope.code);
                    window.location="student_view.html";
                })
                .error(function (data, status, header, config) {
                    // setCookie('sessionCode', $scope.code);
                    // window.location="student_view.html";
                });
    };
});
