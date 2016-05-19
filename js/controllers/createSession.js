/**
 * Created by kiana on 5/19/16.
 */
function getURLParameter(name) {
 	 return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
	}
	var presentationID = getURLParameter('presentationID');
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
                pid: presentationID
            });

            $http({
                method: 'POST', url: 'http://127.0.0.1:8000/api/v1/create_session',data: JSON.stringify(data), headers: {
                    'Authorization': make_base_auth(username,password),
                    'Content-Type': 'application/json'
                }
            })
                    .success(function (data, status, headers, config) {
                        $scope.PostDataResponse = data.session_code;
                    })
                    .error(function (data, status, header, config) {
                        $scope.PostDataResponse = data;
                    });
        };


    });