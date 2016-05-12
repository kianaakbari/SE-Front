/**
 * Created by kiana on 5/12/16.
 */
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

var presentationID = -1;

function updateQueryStringParameter(uri, key, value) {
  var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
  var separator = uri.indexOf('?') !== -1 ? "&" : "?";
  if (uri.match(re)) {
    return uri.replace(re, '$1' + key + "=" + value + '$2');
  }
  else {
    return uri + separator + key + "=" + value;
  }
}

function onEditClick(editBtn){
    var url=updateQueryStringParameter(updateQueryStringParameter("create slide.html",'mode',1),'presentationID',presentationID); //0 stands for edit
    window.location=url;
}

var app = angular.module("app", []);
app.controller("HttpGetController", function ($scope, $http, $log, $window) {

    $scope.SendData = function () {
        var username = auth;
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
                    presentations = data;
                    var presentationsNum = Object.keys(presentations).length;
                       for(i=0; i<presentationsNum; i++) {
                           var presentationsList = document.getElementById("some");
                           var num = presentationsList.childElementCount;
                           var li = document.createElement("li");
                           li.setAttribute('class', "preview col-xs-12 col-sm-6 col-md-4");

                           var div = document.createElement('div');
                           div.setAttribute('class',"image");

                           var img = document.createElement('img');
                           img.src = '#';
                           img.id = presentations[i].id;
                           // img.onclick = onPresentationImgClick;
                           img.addEventListener("click", function(event) {
                                presentationID = presentationImgID.id;
                                event.preventDefault();
                            });
                           
                           var p = document.createElement('p');
                           p.innerHTML = presentations[i].name;

                           div.appendChild(img);
                           li.appendChild(div);
                           li.appendChild(p);
                           presentationsList.appendChild(li);
                       }
                })
                .error(function(data,status){
                });
    }
});




