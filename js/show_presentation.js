/**
 * Created by samane on 13/05/2016.
 */

//---------------------------------------get presentation and session ID------------------------------------------------
// var presentation;
// var PID = 1;
//
// function getURLParameter(name) {
//  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
// }
//
// var presentationID = getURLParameter('presentationID');
//
// function getCookie(cname) {
//     var name = cname + "=";
//     var ca = document.cookie.split(';');
//     for(var i = 0; i <ca.length; i++) {
//         var c = ca[i];
//         while (c.charAt(0)==' ') {
//             c = c.substring(1);
//         }
//         if (c.indexOf(name) == 0) {
//             return c.substring(name.length,c.length);
//         }
//     }
//     return "";
// }
//
// var auth = getCookie('auth');
//
// var app = angular.module("app", []);
//
// app.factory("factoryName",function($http,$q){
//     var obj={};
//     obj.getResponse = function(index){
//         var myPromise = $q.defer();
//         var username = auth;
//         var password = '';
//
//         function make_base_auth(user, password) {
//             var tok = user + ':' + password;
//             var hash = btoa(tok);
//             return "Basic " + hash;
//         };
//         $http({
//             method: 'GET', url: 'http://127.0.0.1:8000/api/v1/get_presentation/' + index, headers: {
//                 'Authorization': make_base_auth(username, password)
//             }
//         })
//                 .success(function (data, status, headers, config) {
//                     myPromise.resolve(data);
//                 })
//                 .error(function (data, status) {
//                     myPromise.resolve(data);
//                 });
//         return ( myPromise.promise);
//     }
//     return obj;
// });
//
// app.controller("HttpGetController", function ($scope,factoryName) {
//     $scope.SendData = function () {
//         factoryName.getResponse(PID).then(function(data){
//             presentation=data.slides;
//         });
//     };
// });
//
// function f() {
//     alert(presentation[0].title);
// }



//----------------------------------------------------------------------------------------------------------------------

//pak shavad
var presentation = [{"id":0,"title":"a","tmp":1,"imageUrl":"img/pear.jpg","videoUrl":"","hyperText":"","listItems":[],"listItemsNum":0},{"id":1,"title":"b","tmp":4,"imageUrl":"","videoUrl":"","hyperText":"","listItems":['a',undefined,'c'],"listItemsNum":2}];
//
var current = -1;

    var slidesNum = presentation.length;
    var curTmp;
    function nxtFunc() {
        current++;
        slide = presentation[current];
        curTmp = slide.tmp;
        //frestadane current ba socket
        document.getElementById("prv").disabled = false;
        if (current == slidesNum - 1) document.getElementById("nxt").disabled = true;
        createSlide();
    }

    function prvFunc() {
        current--;
        //frestadane current ba socket
        document.getElementById("nxt").disabled = false;
        if (current == -1) document.getElementById("prv").disabled = true;
        else{
            slide = presentation[current];
            curTmp = slide.tmp;
        }
        createSlide();
    }

window.onload = function() {
    createSlide();
};

//document.addEventListener("DOMContentLoaded", function() {
//    createSlide();
//});
function createSlide(){
    var body = document.getElementsByClassName('body');
    for (i = 0; i < body.length; i++) {
        //body[i].style.backgroundColor="red";
    }

    if(current == -1){
        //namayeshe safheye aval(safheye aghaye taheri k code namayesh dade mishe)
    }

    else if(curTmp == 0){
        //namayeshe axe slide i k up shode
    }

    else{
        //namayeshe title

        if (curTmp == 1){ //image slide
            //var image_slide = document.createElement('div');
            //image_slide.className="image col-lg-8 col-sm-8 col-md-8 col-xs-8";

            var image = document.createElement('img');
            image.className="picture col-lg-10 col-sm-10 col-xs-10 col-md-10";
            image.setAttribute('src', slide.imageUrl);
            // image_slide.appendChild(image);

            for (i = 0; i < body.length; i++) {
                body[i].appendChild(image);
            }

        }
        else  if (curTmp==2){ //video slide
            var video = document.createElement('div');
            video.className="video col-lg-10 col-sm-10 col-md-10 col-xs-10";
            //body.appendChild(video);
            for (i = 0; i < body.length; i++) {
                body[i].appendChild(video);
            }
        }

        else  if (curTmp==3) { //text slide
            var text_slide = document.createElement('div');
            text_slide.className = "text_slide col-lg-10 col-sm-10 col-md-10 col-xs-10";

            for (i = 0; i < body.length; i++) {
                body[i].appendChild(text_slide);
            }

            var text = document.createElement('p');
            text.innerHTML=slide.hyperText;
            text.className="text";

        }

        else  if (curTmp==4) { //list slide
            var list_slide = document.createElement('div');
            list_slide.className = "list_slide col-lg-10 col-sm-10 col-md-10 col-xs-10";

            for (i = 0; i < body.length; i++) {
                body[i].appendChild(list_slide);
            }

            var list = document.createElement('ul');
            list.className = "ul";
            list_slide.appendChild(list);

            var listItemsNum = slide.listItemsNum;
            var listItemsLength = slide.listItems.length;
            var i = 0;
            var j = 0;
            while (i<listItemsNum) {
                if(slide.listItems[j]!=null){
                    var list_item = document.createElement('p');
                    list_item.innerHTML = slide.listItems[j];
                    list.appendChild(list_item);
                    i++;
                }
                j++;
            }


        }


    }
}
