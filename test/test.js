
    var presentation;
    var PID = 1;
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
    app.factory("factoryName",function($http,$q){
        var obj={};
        obj.getResponse = function(index){
            var myPromise = $q.defer();
            var username = auth;
            var password = '';

            function make_base_auth(user, password) {
                var tok = user + ':' + password;
                var hash = btoa(tok);
                return "Basic " + hash;
            };
            $http({
                method: 'GET', url: 'http://127.0.0.1:8000/api/v1/get_presentation/' + index, headers: {
                    'Authorization': make_base_auth(username, password)
                }
            })
                    .success(function (data, status, headers, config) {
                        myPromise.resolve(data);
                    })
                    .error(function (data, status) {
                        myPromise.resolve(data);
                    });
            return ( myPromise.promise);
        }
        return obj;
    });

    app.controller("HttpGetController", function ($scope,factoryName) {
        $scope.SendData = function () {
            factoryName.getResponse(PID).then(function(data){
                presentation=data.slides;
            });
        };
    });

    function f() {
        alert(presentation[0].title);
    }

