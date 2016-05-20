    var code;
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
    var app1 = angular.module("app1", []);
    app1.factory("factory1",function($http,$q) {
        var obj = {};
        obj.getResponse = function (data) {
            var myPromise = $q.defer();
            var username = auth;
            var password = '';


            function make_base_auth(user, password) {
                var tok = user + ':' + password;
                var hash = btoa(tok);
                return "Basic " + hash;
            }

            $http({
                method: 'POST',
                url: 'http://127.0.0.1:8000/api/v1/create_session',
                data: JSON.stringify(data),
                headers: {
                    'Authorization': make_base_auth(username, password),
                    'Content-Type': 'application/json'
                }
            })
                    .success(function (data, status, headers, config) {
                        myPromise.resolve(data);
                    })
                    .error(function (data, status, header, config) {
                        myPromise.resolve(data);
                    });
            return ( myPromise.promise);

        };
        return obj;
    });

    app1.controller("HttpGetController1", function ($scope, factory1) {

        $scope.SendData1 = function () {
            var data = ({
                pid: PID
            });
            factory1.getResponse(data).then(function(data){
                code=data.session_code;
            });
        };
    });

// angular.bootstrap(document.getElementById("App1"), ['app1']);

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



$('#body').ready(function() {
  angular.bootstrap($('#body'), ['app1']);
});

function g() {
    alert(code);
}

function f(){
    alert(presentation[0].title)
}
