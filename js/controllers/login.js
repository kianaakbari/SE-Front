
var app = angular.module("loginApp", []);

function make_base_auth(user, password) {
var tok = user + ':' + password;
var hash = btoa(tok);
return "Basic " + hash;
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

app.controller("loginAppController", function ($scope, $http) {

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

//------------------------------------teacher login-------------------------------------//

        $scope.SendData1 = function () {
            $scope.errtext="";
            var config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': make_base_auth($scope.username, $scope.password)
                }
            };
            $http.get('http://154.16.156.58:8000/get-auth-token', config)
                    .success(function (data, status, headers, config) {
                        setCookie('auth', data.token, 365);
                        setCookie('user_id',data.user_id, 365);
                        window.location="Presenter Page.html";

                    })
                    .error(function (data, status, header, config) {
                         if(status==404) {$scope.errtext = "نام کاربری معتبر نمیباشد";}
                         else if(status==403) {$scope.errtext = "حساب کاربری فعال نمیباشد";}
                         else if(status==400) {$scope.errtext = "رمز وارد شده صحیح نمیباشد";}
                    });
        };


//------------------------------------student login-------------------------------------//

        $scope.SendData2 = function () {
            $scope.errtext="";
            var config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': make_base_auth($scope.username, $scope.password)
                }
            };

            $http.get('http://154.16.156.58:8000/get-auth-token', config)
                    .success(function (data, status, headers, config) {
                        setCookie('auth', data.token, 365);
                        setCookie('user_id',data.user_id, 365);
                        window.location="authedjoin.html";
                    })
                    .error(function (data, status, header, config) {
                         if(status==404) {$scope.errtext = "نام کاربری معتبر نمیباشد";}
                         else if(status==403) {$scope.errtext = "حساب کاربری فعال نمیباشد";}
                         else if(status==400) {$scope.errtext = "رمز وارد شده صحیح نمیباشد";}
                    });
        };

    });

