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

                    //-------------------------------------------------
                    // var presentationID = -1;
                    // presenter
                    var modal = document.getElementById("myModal");

                    var modalImg = document.getElementById("img01");

                    var span = document.getElementsByClassName("close")[0];
                    //end presenter

                    //upload

                    var modal_1 = document.getElementById("myModal_1");

                    var upbtn = document.getElementById("clk_upload");
                    
                    var span1 = document.getElementById("close1");
                    
                    
                    upbtn.onclick = function(){
                        modal_1.style.display = "block";
                    }
                    
                    span1.onclick = function(){
                        modal_1.style.display = "none";    
                    }



                    //When the user clicks on <span> (x), close the modal
                    span.onclick = function() {
                        modal.style.display = "none";
                    }

                    // When the user clicks anywhere outside of the modal, close it
                    window.onclick = function(event) {
                        if (event.target == modal) {
                            modal.style.display = "none";
                        }
                    }

                    //-------------------------------------------------
                    presentations = data;
                    var presentationsNum = Object.keys(presentations).length;
                       for(i=0; i<presentationsNum; i++) {
                           var presentationsList = document.getElementById("some");
                           var num = presentationsList.childElementCount;
                           var li = document.createElement("li");
                           li.setAttribute('class', "blocking preview col-xs-12 col-sm-6 col-md-4");

                           var div = document.createElement('div');
                           div.setAttribute('class',"image");

                           var img = document.createElement('img');
                           img.src = 'img/education.jpg';
                           img.id = presentations[i].id;
                           img.setAttribute('class', "presentationImg");
                           // img.onclick = onPresentationImgClick;
                           img.addEventListener("click", function(event) {
                                presentationID= this.id;
                                modal.style.display = "block";
                                modalImg.src = this.src;
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


function onEditClick(editBtn){
    var url=updateQueryStringParameter("editSlide.html",'presentationID',presentationID);
    window.location=url;
}

function onPrsntClick(editBtn){
    var url=updateQueryStringParameter("show_presentation.html",'presentationID',presentationID);
    window.location=url;
}






