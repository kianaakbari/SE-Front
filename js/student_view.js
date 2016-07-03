/**
 * Created by samane on 13/05/2016.
 */
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
//----------------------------------------------get presetation and session code--------------------------------------//


//ehsan
//in ghesmat ha marbut b namayeshe safheye avale. fk konam kolesh bayad tu y chizi shabihe onload neveshte bshe.
var sessionCode = getCookie('sessionCode');
var userID = getCookie('user_id');
var codePage = 1;
// alert(sessionCode);
// code e session tu moteghayere sessionCode gharar dare.

///////////////////////////socket initialization
try {
    var socket = io.connect('http://localhost:8000/presentation');
}
catch (err) {
    alert(err);
}
///////////////////////////socket initialization


/////////////////////////////////////////////socket functions



function leaveRoom(roomName) {
    socket.emit('leave', {room: roomName}, function (result) {
        if (result == 1) {

            // do what is needed in view when leave session in successful
            alert("leave session finished properly");
            return true;
        } else if (result == 0) {
            alert("leave session not finished properly");
            return false;
        }

    });

    return false;
}

//user_id and presentation_id and room are hardcoded.
function sendAnswer(answerText, pageNumber, roomName, userId, sessionCode) {
    // alert("giving answer");
    socket.emit('send answer', {
        answer: answerText,
        page: pageNumber,
        user_id: userId,
        session_id: sessionCode,
        room: roomName
    },function (result) {
        if (result == 1) {
                        console.log("1");
                        return false;

                    } else if (result == 0) {
                        console.log("0");

                        return true;
                    }
    });
}


/////////////////////////////////////////////socket functions

var current;
var slide;
var curTmp;
var questionTmp;
var presentation;

//var data = {"slides":[{"id":0,"hasTitle":0,"title":"","tmp":1,"imageUrl":"img/education.jpg","videoUrl":"","hyperText":"","listItems":["a","b"],"listItemsNum":2,"anstmp":2,"choicesList":["1","",null,"3"],"choicesNum":3},{"id":1,"hasTitle":1,"title":"df","tmp":3,"imageUrl":"","videoUrl":"","hyperText":"sdfv","listItems":[],"listItemsNum":0,"anstmp":0,"choicesList":[],"choicesNum":0}]};
// var presentation = data.slides;
// var start = 0;
// current = start;
// slide = presentation[current];
// curTmp = slide.tmp;
// questionTmp = slide.anstmp;
// window.onload = function () {
//     createSlide();
// };
//-----

//ehsan
//har dafe k presenter slide ro avaz mikone in meghdar ha b ruz mishan va tabe create slide seda zade mishe:
// current = shomare slide
// slide = presentation[current];
// curTmp = slide.tmp;
// questionTmp = slide.anstmp;
//-----
//done


//------------------------------------------------------------


function createSlide() {

    var body = document.getElementsByClassName('body');
    var slide_blue = document.getElementById("slide-blue");
    // alert('dovomi: '+codePage);

    if (codePage) {
        var title_code = document.getElementById("title");
        if (title_code.childElementCount > 0) {

            var lastChild_code_title = title_code.lastElementChild;
            lastChild_code_title.parentNode.removeChild(lastChild_code_title);
        }
        
         var body_text = document.getElementById("body");
        // alert(body_text.childElementCount);
         if(body_text.childElementCount>0){

             var lastChild_body_text =body_text.lastElementChild;
             lastChild_body_text.parentNode.removeChild(lastChild_body_text);
         }

         var text_slide = document.createElement('div');
         text_slide.className = "text_slide col-lg-10 col-sm-10 col-md-10 col-xs-10";

         for (i = 0; i < body.length; i++) {
             body[i].appendChild(text_slide);
         }

         var text = document.createElement('p');
         text.innerHTML="ارایه هنوز آغاز نشده است";//slide.hyperText
         text.className="text";
         text_slide.appendChild(text);
    }

    else {
        if (curTmp == 0) {
            //namayeshe axe slide i k up shode
        }

        else {
            slide_blue.style.backgroundColor = "#ffffff";

            //namayeshe title

            var title_title = document.getElementById("title");
            if (title_title.childElementCount > 0) {

                var lastChild_title_title = title_title.lastElementChild;
                lastChild_title_title.parentNode.removeChild(lastChild_title_title);
            }

            var bdy = document.getElementById("title");

            var title = document.createElement("div");
            title.className = "title col-lg-10 col-sm-10 col-xs-10 col-md-10 ";
            bdy.appendChild(title);

            var title_text = document.createElement("p");
            if (slide.hasTitle) title_text.innerHTML = slide.title;
            else title_text.innerHTML = "";
            title.appendChild(title_text);

            //here

            if (questionTmp == 0) { //long answer
                var body_answer_long = document.getElementById("body");
                if (body_answer_long.childElementCount > 0) {

                    var lastChild_body_long = body_answer_long.lastElementChild;
                    lastChild_body_long.parentNode.removeChild(lastChild_body_long);
                }
                var answer_long_slide = document.createElement('div');
                answer_long_slide.className = "row";

                for (i = 0; i < body.length; i++) {
                    body[i].appendChild(answer_long_slide);
                }

                var textArea = document.createElement("textarea");
                textArea.id = "std_long_ans_input";
                textArea.className = "col-lg-6 col-sm-10 col-md-8 col-xs-8";
                answer_long_slide.appendChild(textArea);

                var button = document.createElement("button");
                button.id = "accept_qst";
                button.className = "col-lg-1 col-sm-4";
                button.innerHTML = "تایید";
                button.addEventListener("click", function (event) {
                    // alert(textArea.value);
                    //ehsan
                    //textArea.value javab ro nshun mide
                    //current ham shomareye slide e
                    //------
                    sendAnswer(textArea.value, current, sessionCode, userID, sessionCode);

                    this.disabled = true;
                    event.preventDefault();
                });
                answer_long_slide.appendChild(button);

            }

            else if (questionTmp == 1) { //short answer
                var body_answer_short = document.getElementById("body");
                if (body_answer_short.childElementCount > 0) {

                    var lastChild_body_short = body_answer_short.lastElementChild;
                    lastChild_body_short.parentNode.removeChild(lastChild_body_short);
                }
                var answer_short_slide = document.createElement('div');
                answer_short_slide.className = "row";

                for (i = 0; i < body.length; i++) {
                    body[i].appendChild(answer_short_slide);
                }

                var input = document.createElement("input");
                input.id = "std_short_ans_input";
                input.className = "col-lg-6 col-sm-10 col-md-8 col-xs-8 ";
                answer_short_slide.appendChild(input);

                var btn = document.createElement("button");
                btn.id = "accept_qst";
                btn.className = "col-lg-1 col-sm-4";
                btn.innerHTML = "تایید";
                btn.addEventListener("click", function (event) {
                    // alert(input.value);
                    //ehsan
                    //input.value javab ro nshun mide
                    //current ham shomareye slide e
                    //------
                    sendAnswer(input.value, current, sessionCode, userID, sessionCode);

                    this.disabled = true;
                    event.preventDefault();
                });
                answer_short_slide.appendChild(btn);
            }

            else if (questionTmp == 2) { //multichoice answer
                var body_answer_multiChice = document.getElementById("body");
                if (body_answer_multiChice.childElementCount > 0) {
                    var lastChild_body_multiChoice = body_answer_multiChice.lastElementChild;
                    lastChild_body_multiChoice.parentNode.removeChild(lastChild_body_multiChoice);
                }

                var answer_multiChoice_slide = document.createElement('div');
                answer_multiChoice_slide.className = "row";

                for (i = 0; i < body.length; i++) {
                    body[i].appendChild(answer_multiChoice_slide);
                }

                var multiChoice = document.createElement("div");
                multiChoice.id = "multipleChoice";
                multiChoice.className = "col-lg-6 col-sm-5";

                var list_answers = document.createElement('ul');
                list_answers.className = "ul col-lg-12";

                var choicesNum = slide.choicesNum;
                var i = 0;
                var j = 0;
                while (i < choicesNum) {
                    if (slide.choicesList[j] != null) {
                        var answer = document.createElement('li');
                        answer.className = "col-lg-12";

                        list_answers.appendChild(answer);

                        var answer_div = document.createElement('div');
                        answer_div.className = "choice-divv col-lg-12";
                        answer.appendChild(answer_div);

                        var answer_input = document.createElement("input");
                        answer_input.className = "radio-btn";
                        answer_input.type = "radio";
                        answer_input.value = "male";
                        answer_input.name = "gender";
                        answer_div.appendChild(answer_input);

                        var answer_input_p = document.createElement("p");
                        answer_input_p.innerHTML = slide.choicesList[j];//slide.listItems[j];
                        answer_div.appendChild(answer_input_p);
                        i++;
                    }
                    j++;
                }

                multiChoice.appendChild(list_answers);
                answer_multiChoice_slide.appendChild(multiChoice);

                var button = document.createElement("button");
                button.id = "accept_qst";
                button.className = "col-lg-1 col-sm-4";
                button.innerHTML = "تایید";
                button.addEventListener("click", function (event) {
                    var childs = list_answers.childNodes;
                    var n = childs.length;
                    for (z = 0; z < n; z++) {
                        if (childs[z].childNodes[0].childNodes[0].checked) {
                            // alert(z);
                            //ehsan
                            // z index e gozine i k entekhab shodaro nshun mide
                            //current ham shomareye slide e
                            //-----
                            sendAnswer(z, current, sessionCode, userID, sessionCode);


                            return
                        }
                    }
                    this.disabled = true;
                    event.preventDefault();
                });
                answer_multiChoice_slide.appendChild(button);
            }

            else if (curTmp == 1) { //image slide
                var body_id = document.getElementById("body");
                if (body_id.childElementCount > 0) {

                    var lastChild_body = body_id.lastElementChild;
                    lastChild_body.parentNode.removeChild(lastChild_body);
                }

                var image = document.createElement('img');
                image.className = "picture col-lg-10 col-sm-10 col-xs-10 col-md-10";
                image.setAttribute('src', slide.imageUrl);

                for (i = 0; i < body.length; i++) {
                    body[i].appendChild(image);
                }

            }

            else if (curTmp == 2) { //video slide

                var body_video = document.getElementById("body");
                if (body_video.childElementCount > 0) {

                    var lastChild_body_video = body_video.lastElementChild;
                    lastChild_body_video.parentNode.removeChild(lastChild_body_video);
                }
                var video = document.createElement('div');
                video.style.margin="0% auto";
                video.style.width="75%";
                //video.className = "video col-lg-10 col-sm-10 col-md-10 col-xs-10";
                videoData = slide.videoUrl;
                //alert(videoData);
                video.id=videoData;
                //body.appendChild(video);
                for (i = 0; i < body.length; i++) {
                    body[i].appendChild(video);
                }

                var video_script = document.createElement("script");//taghiir
                video_script.type="text/JavaScript";//taghiir
                video_script.src="https://www.aparat.com/embed/"+videoData+"?data[rnddiv]="+videoData+"&data[responsive]=yes";

                video.appendChild(video_script);//taghiir
            }

            else if (curTmp == 3) { //text slide
                var body_text = document.getElementById("body");
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

                var body_list = document.getElementById("body");
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
}




