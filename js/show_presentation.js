/**
 * Created by samane on 13/05/2016.
 */
// var presentation = [{"id":0,"title":"a","tmp":1,"imageUrl":"img/pear.jpg","videoUrl":"","hyperText":"","listItems":[],"listItemsNum":0},{"id":1,"title":"b","tmp":4,"imageUrl":"","videoUrl":"","hyperText":"","listItems":['a',undefined,'c'],"listItemsNum":3}];
//----------------------------------------------get presetation and session code--------------------------------------//


///////////////////////////socket initialization
try {
    var socket = io.connect('http://localhost:8000/presentation');
}
catch (err) {
    console.log(err);
}
///////////////////////////socket initialization


function joinRoom(roomName) {
    socket.emit('join', {room: roomName}, function (result) {

        if (result == 1) {
            // do what is needed in view when join session is not successful
            alert("join session finished properly");

            return false;

        } else if (result == 0) {
            // do what is needed in view when join session is not successful
            alert("join session not finished properly");

            return true;
        }


    });
}


var PID = getURLParameter("presentationID");
var auth = getCookie('auth');
var sessionCode;
var presentation;
var preLength;
var first;
var last;

function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

var app1 = angular.module("app1", []);
app1.factory("factory1", function ($http, $q) {
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
        factory1.getResponse(data).then(function (data) {
            sessionCode = data.session_code;
            alert(sessionCode);
            joinRoom(sessionCode);
            createSlide();
        });
    };
});

var app = angular.module("app", []);
app.factory("factoryName", function ($http, $q) {
    var obj = {};
    obj.getResponse = function (index) {
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

app.controller("HttpGetController", function ($scope, factoryName) {
    $scope.SendData = function () {
        factoryName.getResponse(PID).then(function (data) {
            presentation = data.slides;
            preLength = presentation.length;
            var findFirst = 0;
            for (i = 0; i < preLength; i++) {
                if (presentation[i] != null) {
                    if (!findFirst) {
                        findFirst = 1;
                        first = i;
                    }
                    last = i;
                }
            }
        });
    }
});


$('#body').ready(function () {
    angular.bootstrap($('#body'), ['app1']);
});

//____________________________________________________________________________________________________________________//

var current = -1;
var curTmp;


function nxtFunc() {
    current++;

    slide = presentation[current];

    while (slide == null) {
        current++;
        slide = presentation[current];
    }

    curTmp = slide.tmp;
    if (current == last) document.getElementById("nxt").disabled = true;
    socket.emit('change page', {page: current, room_name: sessionCode});
    document.getElementById("prv").disabled = false;
    createSlide();
}

function prvFunc() {
    if (current == first) current = -1;
    else if (current != -1) {
        current--;
        slide = presentation[current];
        while (slide == null) {
            current--;
            slide = presentation[current];
        }
        curTmp = slide.tmp;
    }

    if (current == -1) document.getElementById("prv").disabled = true;
    document.getElementById("nxt").disabled = false;

    socket.emit('change page', {page: current, room_name: sessionCode});


    createSlide();
}


function createSlide() {

    var body = document.getElementsByClassName('body');
    for (i = 0; i < body.length; i++) {
        //body[i].style.backgroundColor="red";
    }
    var slide_blue = document.getElementById("slide-blue");
    if (current == -1) {//

        var code_dive = document.getElementById("code");

        // alert(code_dive.childElementCount);
        if (code_dive.childElementCount > 0) {

            var lastChild = code_dive.lastElementChild;
            lastChild.parentNode.removeChild(lastChild);
        }

        var body_code = document.getElementById("body");
        // alert(body_code.childElementCount);
        if (body_code.childElementCount > 0) {

            var lastChild_body_code = body_code.lastElementChild;
            lastChild_body_code.parentNode.removeChild(lastChild_body_code);
        }

        var title_code = document.getElementById("title");
        //alert(title_title.childElementCount);
        if (title_code.childElementCount > 0) {

            var lastChild_code_title = title_code.lastElementChild;
            lastChild_code_title.parentNode.removeChild(lastChild_code_title);
        }

        slide_blue.style.backgroundColor = "#2C4141";
        //for (i = 0; i < slide_blue.length; i++) {
        //    slide_blue[i].style.backgroundColor="#2C4141";
        //}

        var alpha_join = document.createElement("div");
        alpha_join.className = "col-xs-9 col-md-7 lo-alpha_join";
        code_dive.appendChild(alpha_join);
        //for (i = 0; i < slide_blue.length; i++) {
        //        slide_blue[i].appendChild(alpha_join);
        //    }
//
//         bdy.appendchild(alpha_join);

        var alpha_step = document.createElement("div");
        alpha_step.className = "alpha-step";
        alpha_join.appendChild(alpha_step);

        var code = document.createElement("p");
        code.className = "alpha-pa1";
        code.innerHTML = sessionCode;
        alpha_step.appendChild(code);

    }


    else if (curTmp == 0) {
        //namayeshe axe slide i k up shode
    }

    else {
        slide_blue.style.backgroundColor = "#ffffff";

        //namayeshe title
        var code_title = document.getElementById("code");
        //alert(code_title.childElementCount);
        if (code_title.childElementCount > 0) {
            var lastChild_title_code = code_title.lastElementChild;
            lastChild_title_code.parentNode.removeChild(lastChild_title_code);
        }

        var title_title = document.getElementById("title");
        //alert(title_title.childElementCount);
        if (title_title.childElementCount > 0) {

            var lastChild_title_title = title_title.lastElementChild;
            lastChild_title_title.parentNode.removeChild(lastChild_title_title);
        }

        var bdy = document.getElementById("title");

        var title = document.createElement("div");
        title.className = "title col-lg-10 col-sm-10 col-xs-10 col-md-10 ";
        bdy.appendChild(title);
        //for (i = 0; i < bdy.length; i++) {
        //    bdy[i].appendChild(title);
        //}

        var title_text = document.createElement("p");
        if (slide.hasTitle) title_text.innerHTML = slide.title;
        else title_text.innerHTML = "";
        title.appendChild(title_text);


        if (curTmp == 1) { //image slide
            var code_img = document.getElementById("code");
            // alert(code_img.childElementCount);
            if (code_img.childElementCount > 0) {

                var lastChild_img_code = code_img.lastElementChild;
                lastChild_img_code.parentNode.removeChild(lastChild_img_code);
            }

            var body_id = document.getElementById("body");
            // alert(body_id.childElementCount);
            if (body_id.childElementCount > 0) {

                var lastChild_body = body_id.lastElementChild;
                lastChild_body.parentNode.removeChild(lastChild_body);
            }

            var image = document.createElement('img');
            image.className = "picture col-lg-10 col-sm-10 col-xs-10 col-md-10";
            image.setAttribute('src', slide.imageUrl);
            // image_slide.appendChild(image);

            for (i = 0; i < body.length; i++) {
                body[i].appendChild(image);
            }

        }
        else if (curTmp == 2) { //video slide
            var code_video = document.getElementById("code");
            // alert(code_video.childElementCount);
            if (code_video.childElementCount > 0) {

                var lastChild_video_code = code_video.lastElementChild;
                lastChild_video_code.parentNode.removeChild(lastChild_video_code);
            }

            var body_video = document.getElementById("body");
            // alert(body_video.childElementCount);
            if (body_video.childElementCount > 0) {

                var lastChild_body_video = body_video.lastElementChild;
                lastChild_body_video.parentNode.removeChild(lastChild_body_video);
            }
            var video = document.createElement('div');
            video.className = "video col-lg-10 col-sm-10 col-md-10 col-xs-10";
            //body.appendChild(video);
            for (i = 0; i < body.length; i++) {
                body[i].appendChild(video);
            }
        }

        else if (curTmp == 3) { //text slide

            var code_text = document.getElementById("code");
            // alert(code_text.childElementCount);
            if (code_text.childElementCount > 0) {

                var lastChild_text_code = code_text.lastElementChild;
                lastChild_text_code.parentNode.removeChild(lastChild_text_code);
            }

            var body_text = document.getElementById("body");
            // alert(body_text.childElementCount);
            if (body_text.childElementCount > 0) {

                var lastChild_body_text = body_text.lastElementChild;
                lastChild_body_text.parentNode.removeChild(lastChild_body_text);
            }
            var text_slide = document.createElement('div');
            text_slide.className = "text_slide col-lg-10 col-sm-10 col-md-10 col-xs-10";

            for (i = 0; i < body.length; i++) {
                body[i].appendChild(text_slide);
            }

            var text = document.createElement('p');
            text.innerHTML = slide.hyperText;
            text.className = "text";
            text_slide.appendChild(text);

        }

        else if (curTmp == 4) { //list slide
            var code_list = document.getElementById("code");
            // alert(code_list.childElementCount);
            if (code_list.childElementCount > 0) {

                var lastChild_list_code = code_list.lastElementChild;
                lastChild_list_code.parentNode.removeChild(lastChild_list_code);
            }

            var body_list = document.getElementById("body");
            // alert(body_list.childElementCount);
            if (body_list.childElementCount > 0) {

                var lastChild_body_list = body_list.lastElementChild;
                lastChild_body_list.parentNode.removeChild(lastChild_body_list);
            }
            var list_slide = document.createElement('div');
            list_slide.className = "list_slide col-lg-10 col-sm-10 col-md-10 col-xs-10";

            for (i = 0; i < body.length; i++) {
                body[i].appendChild(list_slide);
            }

            var list = document.createElement('ul');
            list.className = "ul";
            list_slide.appendChild(list);

            var listItemsNum = slide.listItemsNum;
            var i = 0;
            var j = 0;
            while (i < listItemsNum) {
                if (slide.listItems[j] != null) {
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
