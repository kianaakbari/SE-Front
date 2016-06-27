///////////////////////////socket initialization
try {
    var socket = io.connect('http://localhost:8000/edit_presentation');
}
catch (err) {
    console.log(err);
}
////////////////////////////////////////////////

var PID = getURLParameter("presentationID");
var auth = getCookie('auth');
var presentation = [];
var current = -1;
var counter = -1;
var min = -1;
var max = -1;

function getURLParameter(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
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
            var findFirst = 0 ;
            for(i=0;i<preLength;i++){
                if(presentation[i]!=null){
                    if(!findFirst){
                        findFirst = 1;
                        min = i;
                    }
                    counter = i;
                    createSlide();
                    fillSlide(i,presentation[i]);
                }
            }
             if(min != -1){
                 current = min;
                 document.getElementById("top-content" + min).style.display = "block";
                 max = counter;
                 counter = preLength-1;
                 // var smallDiv = document.getElementById(min);
                 // smallDiv.style.border = "3px solid #337AB7";
                 //----------------------------------------------
                 slide = presentation[current];
                 anstmp = slide.anstmp;
                 //anstitle = slide.title;
                 
                 var choicespar = document.getElementById("choices");
                 choicespar.innerHTML = '';
        
                 if(anstmp == 0){
                     document.getElementById("acc-btn-preview").style.visibility = "visible";
                     document.getElementById("long-answer-preview").style.visibility = "visible";
                     document.getElementById("short-answer-preview").style.visibility = "hidden";
                     document.getElementById("add-choice").style.visibility = "hidden";
                     //document.getElementById("title_preview").innerHTML = title;
                     //document.getElementById("title_preview").innerHTML = title;
                 }
                 else if(anstmp == 1){
                    document.getElementById("long-answer-preview").style.visibility = "hidden";
                    document.getElementById("short-answer-preview").style.visibility = "visible";
                    document.getElementById("acc-btn-preview").style.visibility = "visible";
                    document.getElementById("add-choice").style.visibility = "hidden";
                    //document.getElementById("title_preview").innerHTML = title;
                 }
        
                 else if(anstmp == 2){
                    document.getElementById("acc-btn-preview").style.visibility = "hidden";
                    document.getElementById("short-answer-preview").style.visibility = "hidden";
                    document.getElementById("long-answer-preview").style.visibility = "hidden";
                    document.getElementById("add-choice").style.visibility = "visible";
                    //document.getElementById("title_preview").innerHTML = title;
                    var choices = slide.choicesList;
                    var choicesNum = slide.choicesNum;
                    var i = 0;
                    var j = 0;
                    var choicesdiv = document.getElementById("choices");
                    while (i<choicesNum) {
                        if(choices[j]!=null){
                            //var list_item = document.createElement('p');
                            //list_item.innerHTML = choices[i];
                            //list.appendChild(list_item);
                            //--------------------------------------------------------------------------------------------------------------
                            var input = document.createElement("input");
                            input.className="input-choice col-md-10 col-lg-10 col-sm-8 col-xs-10";
                            input.id = j;
                            var placeHolder = input.id;
                            placeHolder++;
                            input.placeholder="گزینه " + placeHolder;
                            //alert(choices[i]);
                            input.value = choices[j];
                            input.addEventListener("change", function (event) {
                                (slide.choicesList)[input.id] = this.value;
                                event.preventDefault();
                            });
                            //slide.choicesNum++;
                            choicesdiv.appendChild(input);
                            //slide.choicesList.push("");
        
                            var closeChoice = document.createElement("img");
                            closeChoice.setAttribute('src', 'img/VisualEditor_-_Icon_-_Close.svg.png');
                            closeChoice.className="close-choice";
                            closeChoice.id = j;
                            closeChoice.addEventListener('click',function(event){
                                var slide = presentation[current];
                                delete (slide.choicesList)[this.id];
                                slide.choicesNum--;
                                if (slide.choicesNum == 0) {
                                    slide.choicesList = [];
                                }
        
                                var deletedInput = this.previousSibling;
                                deletedInput.parentNode.removeChild(deletedInput);
                                this.parentNode.removeChild(this);
        
                                event.preventDefault();
                            });
                            choicesdiv.appendChild(closeChoice);
                            //--------------------------------------------------------------------------------------------------------------
                            i++;
                        }
                        j++;
                    }
                }
                else{
                    document.getElementById("short-answer-preview").style.visibility = "hidden";
                    document.getElementById("long-answer-preview").style.visibility = "hidden";
                    document.getElementById("add-choice").style.visibility = "hidden";
                    document.getElementById("acc-btn-preview").style.visibility = "hidden";
                    document.getElementById("title_preview").innerHTML = "";
                }
                 //----------------------------------------------
             }

        });
    }
});


function createSlide() {

    var container = document.getElementById("slide-creator");
    divsNum = (container.childElementCount - 1) / 2;

    var div = document.createElement('div');
    div.style.height = "20rem";
    div.style.width = "15rem";
    div.style.paddingTop = "5rem";
    div.style.margin = "5rem auto";
    div.style.backgroundColor = "#ffffff";
    div.id = counter;
    if(counter == min) div.style.border = "3px solid #337AB7";
    container.appendChild(div);

    var oImg = document.createElement("img");
    oImg.setAttribute('src', 'img/close_blue%20(11).png');
    oImg.setAttribute('alt', 'na');
    oImg.setAttribute('height', '20');
    oImg.setAttribute('width', '20');
    oImg.setAttribute('margin-left', '20%');
    oImg.id = counter;

    container.appendChild(oImg);

    div.addEventListener("click",function(event){
        div.style.border = "3px solid #337AB7";
        var border_count =container.childElementCount;
        for(i=1 ;i<border_count+1 ;i=i+2) {
            var child = container.childNodes[i];
            if (this.id != child.id)
                child.style.border = "none";
        }
        document.getElementById("top-content" + current).style.display = "block";
        var pre = document.getElementById("top-content" + current);
        pre.style.display = "none";
        current = this.id;
        var crnt = document.getElementById("top-content" + current);
        crnt.style.display = "block";

        slide = presentation[current];
        anstmp = slide.anstmp;
        //anstitle = slide.title;

        var choicespar = document.getElementById("choices");
        choicespar.innerHTML = '';

        if(anstmp == 0){
            document.getElementById("acc-btn-preview").style.visibility = "visible";
            document.getElementById("long-answer-preview").style.visibility = "visible";
            document.getElementById("short-answer-preview").style.visibility = "hidden";
            document.getElementById("add-choice").style.visibility = "hidden";
            //document.getElementById("title_preview").innerHTML = title;
            //document.getElementById("title_preview").innerHTML = title;
        }
        else if(anstmp == 1){
            document.getElementById("long-answer-preview").style.visibility = "hidden";
            document.getElementById("short-answer-preview").style.visibility = "visible";
            document.getElementById("acc-btn-preview").style.visibility = "visible";
            document.getElementById("add-choice").style.visibility = "hidden";
            //document.getElementById("title_preview").innerHTML = title;
        }

        else if(anstmp == 2){
            document.getElementById("acc-btn-preview").style.visibility = "hidden";
            document.getElementById("short-answer-preview").style.visibility = "hidden";
            document.getElementById("long-answer-preview").style.visibility = "hidden";
            document.getElementById("add-choice").style.visibility = "visible";
            //document.getElementById("title_preview").innerHTML = title;
            var choices = slide.choicesList;
            var choicesNum = slide.choicesNum;
            var i = 0;
            var j = 0;
            var choicesdiv = document.getElementById("choices");
            while (i<choicesNum) {
                if(choices[j]!=null){
                    //var list_item = document.createElement('p');
                    //list_item.innerHTML = choices[i];
                    //list.appendChild(list_item);
                    //--------------------------------------------------------------------------------------------------------------
                    var input = document.createElement("input");
                    input.className="input-choice col-md-10 col-lg-10 col-sm-8 col-xs-10";
                    input.id = j;
                    var placeHolder = input.id;
                    placeHolder++;
                    input.placeholder="گزینه " + placeHolder;
                    //alert(choices[i]);
                    input.value = choices[j];
                    input.addEventListener("change", function (event) {
                        (slide.choicesList)[input.id] = this.value;
                        event.preventDefault();
                    });
                    //slide.choicesNum++;
                    choicesdiv.appendChild(input);
                    //slide.choicesList.push("");

                    var closeChoice = document.createElement("img");
                    closeChoice.setAttribute('src', 'img/VisualEditor_-_Icon_-_Close.svg.png');
                    closeChoice.className="close-choice";
                    closeChoice.id = j;
                    closeChoice.addEventListener('click',function(event){
                        var slide = presentation[current];
                        delete (slide.choicesList)[this.id];
                        slide.choicesNum--;
                        if (slide.choicesNum == 0) {
                            slide.choicesList = [];
                        }

                        var deletedInput = this.previousSibling;
                        deletedInput.parentNode.removeChild(deletedInput);
                        this.parentNode.removeChild(this);

                        //ehsan
                        event.preventDefault();
                    });
                    choicesdiv.appendChild(closeChoice);
                    //--------------------------------------------------------------------------------------------------------------
                    i++;
                }
                j++;
            }
        }
        else{
            document.getElementById("short-answer-preview").style.visibility = "hidden";
            document.getElementById("long-answer-preview").style.visibility = "hidden";
            document.getElementById("add-choice").style.visibility = "hidden";
            document.getElementById("acc-btn-preview").style.visibility = "hidden";
            document.getElementById("title_preview").innerHTML = "";
        }
        event.preventDefault();
    });
    
    oImg.addEventListener("click", function (event) {
        var num = this.id;
        var last = current;
        delete(presentation[num]);
        if (num == min) {
            if (min != max) {
                var tmp1 = this.nextSibling;
                var tmp2 = tmp1.nextSibling;
                min = tmp2.id;
                current = min;
            }
            else {
                current = -1;
            }
        }
        else if (num == max) {
            var tmp1 = this.previousSibling;
            var tmp2 = tmp1.previousSibling;
            max = tmp2.id;
            current = max;
        }
        else {
            current = num - 1;
        }

        var tmp = this.previousSibling;
        del(tmp);
        del(oImg);
        var deletedSlide = document.getElementById("top-content" + tmp.id);
        del(deletedSlide);
        if (current != -1) {
            if (last != num) {
                var pre = document.getElementById("top-content" + last);
                pre.style.display = "none";

            }
            var newSlide = document.getElementById("top-content" + current);
            newSlide.style.display = "block";
        }

        //ehsan
        event.preventDefault();
    });

    function del(deldetedObj) {
        return deldetedObj.parentNode.removeChild(deldetedObj);
    }
}

function fillSlide(i,savedslide) {
    bdy = document.getElementById("center");
    num = counter;
    var tmp = savedslide.tmp;
    var hasTitle = savedslide.hasTitle;
    
    top_content = document.createElement('div');
    top_content.id = "top-content" + num;
    top_content.className="top-content col-lg-12 col-sm-12 col-xs-12 col-md-12";
    top_content.style.display = "none";
    bdy.appendChild(top_content);

    var content = document.createElement('div');
    content.id = "content3";
    content.className = "content col-lg-12 col-sm-12";

    if (num > 2) {
        var cnt = document.getElementsByClassName('content');
        for (i = 0; i < cnt.length; i++) {
            cnt[i].style.margin = '-40rem auto';
        }
    }
    if (num > 2) {
        var cntt = document.getElementsByClassName('content');
        for (i = 0; i < cnt.length; i++) {
            cnt[i].style.top = '49rem';
        }

    }
    top_content.appendChild(content);

    var slide = document.createElement('div');
    slide.className = "slide  col-lg-12 col-sm-10";
    content.appendChild(slide);

    var row_title = document.createElement('div');
    slide.className = "row-title";
    slide.appendChild(row_title);

    var button = document.createElement('button');
    button.className = "bttn title-btn col-lg-2 col-md-2 col-sm-2 ttl";
    button.type = "button";
    button.innerHTML = "عنوان";
    row_title.appendChild(button);

    var title = document.createElement('div');
    title.className = "title";
    row_title.appendChild(title);

    var header_input = document.createElement('textarea');
    header_input.className = "col-lg-10 col-sm-8 title-text header-input ng-pristine ng-valid ng-touched";
    header_input.type = "text";
    header_input.setAttribute('ng-model', 'namein');
    header_input.placeholder = "متن خودرا اینجا بنویسید";
    header_input.ngModel='namein';
    header_input.addEventListener("change", function (event) {
        savedslide.title = this.value;
        //ehsan
        event.preventDefault();
    });
    
    if(hasTitle){
        header_input.innerHTML = savedslide.title;
        title.appendChild(header_input);
        titleFunction(header_input, button);
    }
    else title.appendChild(header_input);

    button.addEventListener("click", function (event) {
        savedslide.hasTitle = 1;
        var parent = this.parentNode.parentNode;//row-title
        var firstChild = parent.childNodes[0]; //
        var hideBtn = firstChild.firstChild;//btn

        var showtitle = firstChild.childNodes[1].firstChild; //add-list
        titleFunction(showtitle, hideBtn);
        //ehsan
        event.preventDefault();
    });

    function titleFunction(node, btn) {
        node.style.visibility = 'visible';
        btn.style.visibility = "hidden";

        var close_title = document.createElement('img');
        close_title.setAttribute('src', 'img/close_blue%20(11).png');
        close_title.setAttribute('alt', 'na');
        close_title.setAttribute('margin-left', '20%');
        close_title.setAttribute('visibility', 'visible');
        close_title.id = "close-title" + counter;
        close_title.className = "close-title";
        title.appendChild(close_title);

        var close = btn.parentNode.childNodes[1].childNodes[1];
        close_title.addEventListener("click", function (event) {
            closeTitleFunction(node, btn,close);
            event.preventDefault();
        });


        function closeTitleFunction(node, btn,close) {
            savedslide.hasTitle = 0;
            node.style.visibility = 'hidden';
            btn.style.visibility = "visible";
            close.style.visibility="hidden";
            //ehsan
        }
    }

    var etc = document.createElement('div');
    etc.className = 'etc row';
    slide.appendChild(etc);

    var img_btn = document.createElement('button');
    img_btn.className = "gp-btn bttn col-lg-3 col-md-3 col-sm-3 col-xs-3 "; //taghiir
    img_btn.id = "add-img" + num;
    img_btn.innerHTML = 'اضافه کردن تصویر';
    img_btn.type = "button";

    img_btn.addEventListener("click", function (event) {
        savedslide.tmp = 1;
        var parent = this.parentNode.parentNode;//row-title
        var hideBtns = parent.childNodes[1]; //etc
        var thirdChild = parent.childNodes[2]; //row (add-image , ..)
        var showImage = thirdChild.firstChild; //add-image
        imgFunction(showImage, hideBtns);
        //ehsan
        event.preventDefault();
    });
    etc.appendChild(img_btn);

    var video_btn = document.createElement('button');
    video_btn.className = "gp-btn bttn col-lg-3 col-md-3 col-sm-3 col-xs-3 ";//taghiir
    video_btn.innerHTML = 'اضافه کردن فیلم';
    video_btn.type = "button";

    video_btn.addEventListener("click", function (event) {
        savedslide.tmp = 2;
        var parent = this.parentNode.parentNode;//row-title
        var hideBtns = parent.childNodes[1]; //etc
        var thirdChild = parent.childNodes[2]; //row (add-image , ..)
        var showvideo = thirdChild.childNodes[1]; //add-video

        videoFunction(showvideo, hideBtns);

        //ehsan
        event.preventDefault();
    });
    etc.appendChild(video_btn);

    var text_btn = document.createElement('button');
    text_btn.className = "gp-btn bttn col-lg-3 col-md-3 col-sm-3 col-xs-3 "; //taghiir
    text_btn.innerHTML = 'اضافه کردن متن';
    text_btn.type = "button";

    text_btn.addEventListener("click", function (event) {
        savedslide.tmp = 3;
        var parent = this.parentNode.parentNode;//row-title
        var hideBtns = parent.childNodes[1]; //etc
        var thirdChild = parent.childNodes[2]; //row (add-image , ..)
        var showText = thirdChild.childNodes[2]; //add-TEXT

        textFunction(showText, hideBtns);
        //ehsan
        event.preventDefault();
    });
    etc.appendChild(text_btn);

    var list_btn = document.createElement('button');
    list_btn.className = "gp-btn bttn col-lg-3 col-md-3 col-sm-3 col-xs-3 "; //taghiir
    list_btn.innerHTML = "اضافه کردن لیست";
    list_btn.type = "button";
    list_btn.addEventListener("click", function (event) {
        savedslide.tmp = 4;
        var parent = this.parentNode.parentNode;//row-title
        var hideBtns = parent.childNodes[1]; //etc
        var thirdChild = parent.childNodes[2]; //row (add-image , ..)
        var showList = thirdChild.childNodes[3]; //add-list

        listFunction(showList, hideBtns);
        //ehsan
        event.preventDefault();
    });
    etc.appendChild(list_btn);

    var close_img = document.createElement('img');
    close_img.className = "close-img";
    close_img.setAttribute('src', 'img/close_blue%20(11).png');
    close_img.addEventListener("click", function (event) {

        var parent=this.parentNode.parentNode;//row-title
        var showBtns =parent.childNodes[1]; //etc
        var thirdChild = parent.childNodes[2]; //row (add-image , ..)

        closeFunction(thirdChild,showBtns,this);
        event.preventDefault();
    });
    etc.appendChild(close_img);



    var row2 = document.createElement('div');
    row2.className = "row";
    slide.appendChild(row2);

    var add_img = document.createElement('div');
    add_img.className = "add-img col-lg-12 col-centered";
    row2.appendChild(add_img);

    var browse = document.createElement('input');
    browse.type='file';
    add_img.appendChild(browse);

    var img_place = document.createElement('img');
    img_place.className="blah";
    img_place.setAttribute('src', '');
    add_img.appendChild(img_place);

    browse.addEventListener("change", function (event) {
        var parent = this. parentNode;//add-img
        var show_image = parent.childNodes[0];//blah

        readURL(this,show_image);
        var slide = presentation[current];
        var fReader = new FileReader();
        fReader.readAsDataURL(browse.files[0]);
        fReader.onloadend = function (event) {
            browse.src = event.target.result;
            socket.emit('save image', {data: browse.src}, function (response) {
            //    //you should use response.data to get url of saved image :)
               slide.imageUrl = response.data;
            });
        };
        //ehsan
        event.preventDefault();
    });

    add_img.appendChild(browse);

    if(tmp == 1){
        // setURL(savedslide.imageUrl,img_place);
        img_place.setAttribute("src", savedslide.imageUrl);
        img_place.style.visibility="visible";
        imgFunction(add_img,etc);
    }
    
    var add_video = document.createElement('div');
    add_video.className = "add-video col-lg-12 col-centered";
    row2.appendChild(add_video);

    var url_input = document.createElement('input');
    url_input.type = "text";
    url_input.className = "video-url";
    add_video.appendChild(url_input);

    var video_url_btn = document.createElement('button');
    video_url_btn.className = "bttn acc-add col-lg-2 col-md-2 col-sm-4 ttl  ";
    video_url_btn.innerHTML = "تایید ادرس";
    video_url_btn.type = "button";
    video_url_btn.addEventListener("click", function (event) {
        var val = this.previousSibling.value;
        savedslide.videoUrl = val;
        //ehsan
        event.preventDefault();
    });
    add_video.appendChild(video_url_btn);

    if(tmp == 2){
        //
        videoFunction(add_video,etc);
    }
    
    var text_area = document.createElement('textarea');
    text_area.type = "text";
    text_area.className = "add-text hyper-text header-input col-lg-11 col-md-11 col-sm-11 ng-pristine ng-valid ng-touched";
    text_area.style.height = "76px";
    text_area.style.overflow = "hidden";
    text_area.addEventListener("change", function (event) {
        savedslide.hyperText = this.value;
        //ehsan
        event.preventDefault();
    });
    row2.appendChild(text_area);

    if(tmp == 3){
        text_area.innerHTML = savedslide.hyperText;
        textFunction(text_area,etc);
    }
    
    var add_list = document.createElement("div");
    add_list.className = "add-list col-lg-12 col-centered";
    row2.appendChild(add_list);

    var row_list = document.createElement('div');
    row_list.className = "row_list";
    add_list.appendChild(row_list);

    var fill_details = document.createElement('button');
    fill_details.className = "bttn add-list-btn col-lg-4 col-md-4 col-sm-6 col-centered";
    fill_details.type = "button";
    fill_details.innerHTML = "افزودن لیست ";
    fill_details.addEventListener("click", function (event) {
        var parent = this.parentNode;//add-list
        var hideBtns = parent.childNodes[1]; //bttn
        var thirdChild = parent.childNodes[2]; //container
        addFields(thirdChild);
        event.preventDefault();
    })
    add_list.appendChild(fill_details);

    var container = document.createElement('div');
    container.className = "container1 col-lg-6 col-md-6 col-sm-6 col-xs-6"; //taghiir

    add_list.appendChild(container);

    if(tmp == 4){
        var listItemsNum = savedslide.listItemsNum;
            var i = 0;
            var j = 0;
            while (i < listItemsNum) {
                if (savedslide.listItems[j] != null) {
                    addListField(container,savedslide.listItems[j],j)
                    i++;
                }
                j++;
            }
        listFunction(add_list,etc);
    }
    
    function imgFunction(node,btn){
        var brows =document.getElementsByClassName("browse");
        for(i=0;i<brows.length;i++) {
           brows[i].style.visibility = "visible";
        }
        for (i = 0; i <4; i++) {
            btn.childNodes[i].style.visibility = 'hidden';
        }
        btn.childNodes[4].style.visibility="visible";
        node.firstChild.style.visibility = "visible";
        node.style.visibility="visible";
    }

    function videoFunction(node, btn) {
        for (i = 0; i < 4; i++) {
            btn.childNodes[i].style.visibility = 'hidden';
        }
        btn.childNodes[4].style.visibility = "visible";
        node.style.visibility = "visible";
    }

    function textFunction(node, btn) {
        for (i = 0; i < 4; i++) {
            btn.childNodes[i].style.visibility = 'hidden';
        }
        btn.childNodes[4].style.visibility = "visible";
        node.style.visibility = "visible";
    }

    function listFunction(node, btn) {
        for (i = 0; i < 4; i++) {
            btn.childNodes[i].style.visibility = 'hidden';
        }
        btn.childNodes[4].style.visibility = "visible";
        node.style.visibility = "visible";

    }

    function closeFunction(node,btns,closeImg) {
        for (i = 0; i <4; i++) {
            btns.childNodes[i].style.visibility = 'visible';
        }
        for (i = 0; i <4; i++) {
            node.childNodes[i].style.visibility = 'hidden';
        }
        btns.childNodes[4].style.visibility="hidden";

        var parent = closeImg.parentNode.parentNode;//row-title
        var thirdChild = parent.childNodes[2]; //row (add-image , ..)
        var add_img = thirdChild.childNodes[0]; //add-image
        var blah = add_img.childNodes[0];//blah

        blah.style.visibility="hidden";
        
        savedslide.tmp = -1;
        //ehsan
    }

    function addFields(node) {
        var count = node.childNodes.length;
        if (count < 10) { //taghiir
            var input = document.createElement("input");
            input.type = "text";
            //input.className="col-lg-12 col-xs-12 col-md-12 col-sm-12" ; //taghiir - ezafe shode
            var id = presentation[current].listItems.length;
            input.id = id;
            input.addEventListener("change", function (event) {
                (presentation[current].listItems)[input.id] = this.value;
                event.preventDefault();
            });
            var oImg = document.createElement("img");
            oImg.setAttribute('src', 'img/close_blue%20(11).png');
            oImg.setAttribute('alt', 'na');
            oImg.setAttribute('height', '20');
            oImg.setAttribute('width', '20');
            oImg.setAttribute('margin-left', '20%');
            oImg.id = id;
            oImg.addEventListener("click", function (event) {
                delete (savedslide.listItems)[this.id];
                savedslide.listItemsNum--;
                if (savedslide.listItemsNum == 0) {
                    savedslide.listItems = [];
                }

                var deletedInput = this.previousSibling;
                deletedInput.parentNode.removeChild(deletedInput);
                this.parentNode.removeChild(this);

                //ehsan
                event.preventDefault();
            });

            node.appendChild(input);
            node.appendChild(oImg);

            savedslide.listItems.push("");
            savedslide.listItemsNum++;
            //ehsan
        }
    }

    function addListField(node,value,j) {
        var input = document.createElement("input");
        input.type = "text";
        // var id = savedslide.listItems.length;
        input.id = j;
        input.addEventListener("change", function (event) {
            (savedslide.listItems)[j] = this.value;
            //ehsan
            event.preventDefault();
        });
        var oImg = document.createElement("img");
        oImg.setAttribute('src', 'img/close_blue%20(11).png');
        oImg.setAttribute('alt', 'na');
        oImg.setAttribute('height', '20');
        oImg.setAttribute('width', '20');
        oImg.setAttribute('margin-left', '20%');
        oImg.id = j;
        oImg.addEventListener("click", function (event) {
            delete (savedslide.listItems)[j];
            savedslide.listItemsNum--;
            if (savedslide.listItemsNum == 0) {
                savedslide.listItems = [];
            }

            var deletedInput = this.previousSibling;
            deletedInput.parentNode.removeChild(deletedInput);
            this.parentNode.removeChild(this);

            //ehsan
            event.preventDefault();
        });
        
        node.appendChild(input);
        node.appendChild(oImg);

        input.value = value;
    }
    
}

//---------

// function setURL(src) {
//         $('.blah')
//             .attr('src',src)
//     var blah =document.getElementsByClassName("blah");
//     for(i=0;i<blah.length;i++) {
//         blah[i].style.visibility = "visible";
//     }
// }

// function setURL(src,image) {
    // if (input.files && input.files[0]) {
    //     var reader = new FileReader();

        // reader.onload = function (e) {
        //     image.setAttribute("src", src);
        //     image.style.visibility="visible";
        // };
        // reader.readAsDataURL(input.files[0]);
    // }
// }

//____________________________________________________________________________________________________________________//

function readURL(input,image) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
           image.setAttribute("src", e.target.result);
            image.style.visibility="visible";
        };
        reader.readAsDataURL(input.files[0]);
    }
}

function addSlide() {

    document.getElementById("short-answer-preview").style.visibility = "hidden";
    document.getElementById("long-answer-preview").style.visibility = "hidden";
    document.getElementById("add-choice").style.visibility = "hidden";
    document.getElementById("acc-btn-preview").style.visibility = "hidden";

    var container = document.getElementById("slide-creator");
    divsNum = (container.childElementCount - 1) / 2;

    var div = document.createElement('div');
    div.style.height = "20rem";
    div.style.width = "15rem";
    div.style.paddingTop = "5rem";
    div.style.margin = "5rem auto";
    div.style.backgroundColor = "#ffffff";
    div.style.border = "3px solid #337AB7";
    var border_count =container.childElementCount;
    for(i=1 ;i<border_count+1 ;i=i+2) {
        var child = container.childNodes[i];
        if (this.id != child.id)
            child.style.border = "none";
    }
    if(current>-1) {
        document.getElementById("top-content" + current).style.display = "none";
    }
    counter++;
    div.id = counter;
    max = counter;
    current = counter;
    if (divsNum == 0) min = counter;

    updateSlide();
    container.appendChild(div);
    document.getElementById("top-content" + current).style.display = "block";

    presentation.push({
        id: current, //mitune hazf she!
        hasTitle : 0,
        title: "",
        tmp: -1,
        // 0 stands for uploaded slides. they only have image url.
        //1 for image slide
        videoUrl: "",//2
        hyperText: "", //3
        listItems: [], //4
        listItemsNum: 0,
        anstmp: -1,
        choicesList: [], // anstmp = 2
        choicesNum: 0
        // anstmp = 0 baraye matn
        //anstmp = 1 baraye adad
    });
    //ehsan

    var oImg = document.createElement("img");
    oImg.setAttribute('src', 'img/close_blue%20(11).png');
    oImg.setAttribute('alt', 'na');
    oImg.setAttribute('height', '20');
    oImg.setAttribute('width', '20');
    oImg.setAttribute('margin-left', '20%');
    oImg.id = counter;

    container.appendChild(oImg);

    var choicespar = document.getElementById("choices");
    choicespar.innerHTML = '';

    div.addEventListener("click",function(event){
        div.style.border = "3px solid #337AB7";
        var border_count =container.childElementCount;
        for(i=1 ;i<border_count+1 ;i=i+2) {
            var child = container.childNodes[i];
            if (this.id != child.id)
                child.style.border = "none";
        }
        document.getElementById("top-content" + current).style.display = "block";
        var pre = document.getElementById("top-content" + current);
        pre.style.display = "none";
        current = this.id;
        var crnt = document.getElementById("top-content" + current);
        crnt.style.display = "block";

        slide = presentation[current];
        anstmp = slide.anstmp;
        //anstitle = slide.title;

        var choicespar = document.getElementById("choices");
        choicespar.innerHTML = '';

        if(anstmp == 0){
            document.getElementById("acc-btn-preview").style.visibility = "visible";
            document.getElementById("long-answer-preview").style.visibility = "visible";
            document.getElementById("short-answer-preview").style.visibility = "hidden";
            document.getElementById("add-choice").style.visibility = "hidden";
            //document.getElementById("title_preview").innerHTML = title;
            //document.getElementById("title_preview").innerHTML = title;
        }
        else if(anstmp == 1){
            document.getElementById("long-answer-preview").style.visibility = "hidden";
            document.getElementById("short-answer-preview").style.visibility = "visible";
            document.getElementById("acc-btn-preview").style.visibility = "visible";
            document.getElementById("add-choice").style.visibility = "hidden";
            //document.getElementById("title_preview").innerHTML = title;
        }

        else if(anstmp == 2){
            document.getElementById("acc-btn-preview").style.visibility = "hidden";
            document.getElementById("short-answer-preview").style.visibility = "hidden";
            document.getElementById("long-answer-preview").style.visibility = "hidden";
            document.getElementById("add-choice").style.visibility = "visible";
            //document.getElementById("title_preview").innerHTML = title;
            var choices = slide.choicesList;
            var choicesNum = slide.choicesNum;
            var i = 0;
            var j = 0;
            var choicesdiv = document.getElementById("choices");
            while (i<choicesNum) {
                if(choices[j]!=null){
                    //var list_item = document.createElement('p');
                    //list_item.innerHTML = choices[i];
                    //list.appendChild(list_item);
                    //--------------------------------------------------------------------------------------------------------------
                    var input = document.createElement("input");
                    input.className="input-choice col-md-10 col-lg-10 col-sm-8 col-xs-10";
                    input.id = j;
                    var placeHolder = input.id;
                    placeHolder++;
                    input.placeholder="گزینه " + placeHolder;
                    //alert(choices[i]);
                    input.value = choices[j];
                    input.addEventListener("change", function (event) {
                        (slide.choicesList)[input.id] = this.value;
                        //ehsan
                        event.preventDefault();
                    });
                    choicesdiv.appendChild(input);

                    var closeChoice = document.createElement("img");
                    closeChoice.setAttribute('src', 'img/VisualEditor_-_Icon_-_Close.svg.png');
                    closeChoice.className="close-choice";
                    closeChoice.id = j;
                    closeChoice.addEventListener('click',function(event){
                        var slide = presentation[current];
                        delete (slide.choicesList)[this.id];
                        slide.choicesNum--;
                        if (slide.choicesNum == 0) {
                            slide.choicesList = [];
                        }

                        var deletedInput = this.previousSibling;
                        deletedInput.parentNode.removeChild(deletedInput);
                        this.parentNode.removeChild(this);
                        //ehsan
                        event.preventDefault();
                    });
                    choicesdiv.appendChild(closeChoice);
                    //--------------------------------------------------------------------------------------------------------------
                    i++;
                }
                j++;
            }
        }
        else{
            document.getElementById("short-answer-preview").style.visibility = "hidden";
            document.getElementById("long-answer-preview").style.visibility = "hidden";
            document.getElementById("add-choice").style.visibility = "hidden";
            document.getElementById("acc-btn-preview").style.visibility = "hidden";
            document.getElementById("title_preview").innerHTML = "";
        }
        event.preventDefault();
    });

    oImg.addEventListener("click", function (event) {
        var num = this.id;
        var last = current;
        delete(presentation[num]);
        if (num == min) {
            if (min != max) {
                var tmp1 = this.nextSibling;
                var tmp2 = tmp1.nextSibling;
                min = tmp2.id;
                current = min;
            }
            else {
                current = -1;
            }
        }
        else if (num == max) {
            var tmp1 = this.previousSibling;
            var tmp2 = tmp1.previousSibling;
            max = tmp2.id;
            current = max;
        }
        else {
            current = num - 1;
        }

        var tmp = this.previousSibling;
        del(tmp);
        del(oImg);
        var deletedSlide = document.getElementById("top-content" + tmp.id);
        del(deletedSlide);
        if (current != -1) {
            if (last != num) {
                var pre = document.getElementById("top-content" + last);
                pre.style.display = "none";

            }
            var newSlide = document.getElementById("top-content" + current);
            newSlide.style.display = "block";
        }
        //ehsan
        event.preventDefault();
    });

    function del(deldetedObj) {
        return deldetedObj.parentNode.removeChild(deldetedObj);
    }
}

function updateSlide() {
    bdy = document.getElementById("center");
    num = counter;
    top_content = document.createElement('div');
    top_content.id = "top-content" + num;
    top_content.className="top-content col-lg-12 col-sm-12 col-xs-12 col-md-12";
    top_content.style.display = "none";
    bdy.appendChild(top_content);

    var content = document.createElement('div');
    content.id = "content3";
    content.className = "content col-lg-12 col-sm-12";

    if (num > 2) {
        var cnt = document.getElementsByClassName('content');
        for (i = 0; i < cnt.length; i++) {
            cnt[i].style.margin = '-40rem auto';
        }
    }
    if (num > 2) {
        var cntt = document.getElementsByClassName('content');
        for (i = 0; i < cnt.length; i++) {
            cnt[i].style.top = '49rem';
        }

    }
    top_content.appendChild(content);

    var slide = document.createElement('div');
    slide.className = "slide  col-lg-12 col-sm-10";
    content.appendChild(slide);

    var row_title = document.createElement('div');
    slide.className = "row-title";
    slide.appendChild(row_title);

    var button = document.createElement('button');
    button.className = "bttn title-btn col-lg-2 col-md-2 col-sm-2 ttl";
    button.type = "button";
    button.innerHTML = "عنوان";
    row_title.appendChild(button);

    var title = document.createElement('div');
    title.className = "title";
    row_title.appendChild(title);

    var header_input = document.createElement('textarea');
    header_input.className = "col-lg-10 col-sm-8 title-text header-input ng-pristine ng-valid ng-touched";
    header_input.type = "text";
    header_input.setAttribute('ng-model', 'namein');
    header_input.placeholder = "متن خودرا اینجا بنویسید";
    header_input.ngModel='namein';
    header_input.addEventListener("change", function (event) {
        var slide = presentation[current];
        slide.title = this.value;
        //ehsan
        event.preventDefault();
    });
    title.appendChild(header_input);

    button.addEventListener("click", function (event) {
        var slide = presentation[current];
        slide.hasTitle = 1;
        var parent = this.parentNode.parentNode;//row-title
        var firstChild = parent.childNodes[0]; //
        var hideBtn = firstChild.firstChild;//btn

        var showtitle = firstChild.childNodes[1].firstChild; //add-list
        titleFunction(showtitle, hideBtn);
        //ehsan
        event.preventDefault();
    });

    function titleFunction(node, btn) {
        node.style.visibility = 'visible';
        btn.style.visibility = "hidden";

        var close_title = document.createElement('img');
        close_title.setAttribute('src', 'img/close_blue%20(11).png');
        close_title.setAttribute('alt', 'na');
        close_title.setAttribute('margin-left', '20%');
        close_title.setAttribute('visibility', 'visible');
        close_title.id = "close-title" + counter;
        close_title.className = "close-title";
        title.appendChild(close_title);

        var close = btn.parentNode.childNodes[1].childNodes[1];
        close_title.addEventListener("click", function (event) {
            closeTitleFunction(node, btn,close);
            event.preventDefault();
        });


        function closeTitleFunction(node, btn,close) {
            var slide = presentation[current];
            slide.hasTitle = 0;
            node.style.visibility = 'hidden';
            btn.style.visibility = "visible";
            close.style.visibility="hidden";

            //ehsan

        }
    }

    var etc = document.createElement('div');
    etc.className = 'etc row';
    slide.appendChild(etc);

    var img_btn = document.createElement('button');
    img_btn.className = "gp-btn bttn col-lg-3 col-md-3 col-sm-3 col-xs-3 "; //taghiir
    img_btn.id = "add-img" + num;
    img_btn.innerHTML = 'اضافه کردن تصویر';
    img_btn.type = "button";

    img_btn.addEventListener("click", function (event) {
        var slide = presentation[current];
        slide.tmp = 1;
        var parent = this.parentNode.parentNode;//row-title
        var hideBtns = parent.childNodes[1]; //etc
        var thirdChild = parent.childNodes[2]; //row (add-image , ..)
        var showImage = thirdChild.firstChild; //add-image
        imgFunction(showImage, hideBtns);
        //ehsan
        event.preventDefault();
    });
    etc.appendChild(img_btn);

    var video_btn = document.createElement('button');
    video_btn.className = "gp-btn bttn col-lg-3 col-md-3 col-sm-3 col-xs-3 ";//taghiir
    video_btn.innerHTML = 'اضافه کردن فیلم';
    video_btn.type = "button";

    video_btn.addEventListener("click", function (event) {
        var slide = presentation[current];
        slide.tmp = 2;
        var parent = this.parentNode.parentNode;//row-title
        var hideBtns = parent.childNodes[1]; //etc
        var thirdChild = parent.childNodes[2]; //row (add-image , ..)
        var showvideo = thirdChild.childNodes[1]; //add-video

        videoFunction(showvideo, hideBtns);
        //ehsan
        event.preventDefault();
    });
    etc.appendChild(video_btn);

    var text_btn = document.createElement('button');
    text_btn.className = "gp-btn bttn col-lg-3 col-md-3 col-sm-3 col-xs-3 "; //taghiir
    text_btn.innerHTML = 'اضافه کردن متن';
    text_btn.type = "button";

    text_btn.addEventListener("click", function (event) {
        var slide = presentation[current];
        slide.tmp = 3;
        var parent = this.parentNode.parentNode;//row-title
        var hideBtns = parent.childNodes[1]; //etc
        var thirdChild = parent.childNodes[2]; //row (add-image , ..)
        var showText = thirdChild.childNodes[2]; //add-TEXT

        textFunction(showText, hideBtns);
        //ehsan
        event.preventDefault();
    });
    etc.appendChild(text_btn);

    var list_btn = document.createElement('button');
    list_btn.className = "gp-btn bttn col-lg-3 col-md-3 col-sm-3 col-xs-3 "; //taghiir
    list_btn.innerHTML = "اضافه کردن لیست";
    list_btn.type = "button";
    list_btn.addEventListener("click", function (event) {
        var slide = presentation[current];
        slide.tmp = 4;
        var parent = this.parentNode.parentNode;//row-title
        var hideBtns = parent.childNodes[1]; //etc
        var thirdChild = parent.childNodes[2]; //row (add-image , ..)
        var showList = thirdChild.childNodes[3]; //add-list

        listFunction(showList, hideBtns);
        //ehsan
        event.preventDefault();
    });
    etc.appendChild(list_btn);

    var close_img = document.createElement('img');
    close_img.className = "close-img";
    close_img.setAttribute('src', 'img/close_blue%20(11).png');
    close_img.addEventListener("click", function (event) {

        var parent=this.parentNode.parentNode;//row-title
        var showBtns =parent.childNodes[1]; //etc
        var thirdChild = parent.childNodes[2]; //row (add-image , ..)
        var hideDives = thirdChild.childNodes; //all childes

        closeFunction(thirdChild,showBtns,this);
        event.preventDefault();
    });
    etc.appendChild(close_img);



    var row2 = document.createElement('div');
    row2.className = "row";
    slide.appendChild(row2);

    var add_img = document.createElement('div');
    add_img.className = "add-img col-lg-12 col-centered";
    row2.appendChild(add_img);

    var browse = document.createElement('input');
    // browse.className = "img";
    browse.type='file';
    add_img.appendChild(browse);

    var img_place = document.createElement('img');
    img_place.className="blah";
    img_place.setAttribute('src', '');
    add_img.appendChild(img_place);

    // var slide = presentation[current];
    // if(slide.imageUrl!=""){
    //     img_place.style.visibility="visible";
    // }

    browse.addEventListener("change", function (event) {

        //var blah =document.getElementsByClassName("blah");
        //for(i=0;i<blah.length;i++) {
        //    blah[i].style.visibility = "visible";
        //}
        var parent = this. parentNode;//add-img
        var show_image = parent.childNodes[0];//blah

        readURL(this,show_image);
        var slide = presentation[current];
        var fReader = new FileReader();
        fReader.readAsDataURL(browse.files[0]);
        fReader.onloadend = function (event) {
            browse.src = event.target.result;
            socket.emit('save image', {data: browse.src}, function (response) {
            //    //you should use response.data to get url of saved image :)
               slide.imageUrl = response.data;
            });
        };
        event.preventDefault();
    });

    add_img.appendChild(browse);

    var add_video = document.createElement('div');
    add_video.className = "add-video col-lg-12 col-centered";
    row2.appendChild(add_video);

    var url_input = document.createElement('input');
    url_input.type = "text";
    url_input.className = "video-url";
    add_video.appendChild(url_input);

    var video_url_btn = document.createElement('button');
    video_url_btn.className = "bttn acc-add col-lg-2 col-md-2 col-sm-4 ttl  ";
    video_url_btn.innerHTML = "تایید ادرس";
    video_url_btn.type = "button";
    video_url_btn.addEventListener("click", function (event) {
        var slide = presentation[current];
        var val = this.previousSibling.value;
        slide.videoUrl = val;
        //ehsan
        event.preventDefault();
    });
    add_video.appendChild(video_url_btn);

    var text_area = document.createElement('textarea');
    text_area.type = "text";
    text_area.className = "add-text hyper-text header-input col-lg-11 col-md-11 col-sm-11 ng-pristine ng-valid ng-touched";
    text_area.style.height = "76px";
    text_area.style.overflow = "hidden";
    text_area.addEventListener("change", function (event) {
        var slide = presentation[current];
        slide.hyperText = this.value;
        //ehsan
        event.preventDefault();
    });
    row2.appendChild(text_area);

    var add_list = document.createElement("div");
    add_list.className = "add-list col-lg-12 col-centered";
    row2.appendChild(add_list);

    var row_list = document.createElement('div');
    row_list.className = "row_list";
    add_list.appendChild(row_list);

    var fill_details = document.createElement('button');
    fill_details.className = "bttn add-list-btn col-lg-4 col-md-4 col-sm-6 col-centered";
    fill_details.type = "button";
    fill_details.innerHTML = "افزودن لیست ";
    fill_details.addEventListener("click", function (event) {
        var parent = this.parentNode;//add-list
        var hideBtns = parent.childNodes[1]; //bttn
        var thirdChild = parent.childNodes[2]; //container
        addFields(thirdChild);
        event.preventDefault();
    })
    add_list.appendChild(fill_details);

    var container = document.createElement('div');
    container.className = "container1 col-lg-6 col-md-6 col-sm-6 col-xs-6"; //taghiir

    add_list.appendChild(container);

    function imgFunction(node,btn){
        var brows =document.getElementsByClassName("browse");
        for(i=0;i<brows.length;i++) {
           brows[i].style.visibility = "visible";
        }
        for (i = 0; i <4; i++) {
            btn.childNodes[i].style.visibility = 'hidden';
        }
        btn.childNodes[4].style.visibility="visible";
        node.firstChild.style.visibility = "visible";
        node.style.visibility="visible";
    }

    function videoFunction(node, btn) {
        for (i = 0; i < 4; i++) {
            btn.childNodes[i].style.visibility = 'hidden';
        }
        btn.childNodes[4].style.visibility = "visible";
        node.style.visibility = "visible";
    }

    function textFunction(node, btn) {
        for (i = 0; i < 4; i++) {
            btn.childNodes[i].style.visibility = 'hidden';
        }
        btn.childNodes[4].style.visibility = "visible";
        node.style.visibility = "visible";
    }

    function listFunction(node, btn) {
        for (i = 0; i < 4; i++) {
            btn.childNodes[i].style.visibility = 'hidden';
        }
        btn.childNodes[4].style.visibility = "visible";
        node.style.visibility = "visible";

    }

    function closeFunction(node,btns,closeImg) {
        for (i = 0; i <4; i++) {
            btns.childNodes[i].style.visibility = 'visible';
        }
        for (i = 0; i <4; i++) {
            node.childNodes[i].style.visibility = 'hidden';
        }
        btns.childNodes[4].style.visibility="hidden";

        var parent = closeImg.parentNode.parentNode;//row-title
        var thirdChild = parent.childNodes[2]; //row (add-image , ..)
        var add_img = thirdChild.childNodes[0]; //add-image
        var blah = add_img.childNodes[0];//blah
        // var file = add_img.childNodes[1];//file
        //blah.src="#";
        //kiana
        blah.style.visibility="hidden";
        //-----
        //file.src="";
        //browse.value="";
        var slide = presentation[current];
        slide.tmp = -1;
        //ehsan
    }

    function addFields(node) {
        var count = node.childNodes.length;
        if (count < 10) { //taghiir
            var input = document.createElement("input");
            input.type = "text";
            //input.className="col-lg-12 col-xs-12 col-md-12 col-sm-12" ; //taghiir - ezafe shode
            var id = presentation[current].listItems.length;
            input.id = id;
            input.addEventListener("change", function (event) {
                (presentation[current].listItems)[input.id] = this.value;
                event.preventDefault();
            });
            var oImg = document.createElement("img");
            oImg.setAttribute('src', 'img/close_blue%20(11).png');
            oImg.setAttribute('alt', 'na');
            oImg.setAttribute('height', '20');
            oImg.setAttribute('width', '20');
            oImg.setAttribute('margin-left', '20%');
            oImg.id = id;
            oImg.addEventListener("click", function (event) {
                var slide = presentation[current];
                delete (slide.listItems)[this.id];
                slide.listItemsNum--;
                if (slide.listItemsNum == 0) {
                    slide.listItems = [];
                }

                var deletedInput = this.previousSibling;
                deletedInput.parentNode.removeChild(deletedInput);
                this.parentNode.removeChild(this);

                //ehsan
                event.preventDefault();
            });

            node.appendChild(input);
            node.appendChild(oImg);

            var slide = presentation[current];
            slide.listItems.push("");
            slide.listItemsNum++;
            //ehsan
        }
    }


}

function activeText() {
    slide = presentation[current];
    slide.anstmp = 0;
    document.getElementById("acc-btn-preview").style.visibility = "visible";
    document.getElementById("long-answer-preview").style.visibility = "visible";
    document.getElementById("short-answer-preview").style.visibility = "hidden";
    document.getElementById("add-choice").style.visibility = "hidden";
    //ehsan
}

function activeNumber() {
    slide = presentation[current];
    slide.anstmp = 1;
    document.getElementById("long-answer-preview").style.visibility = "hidden";
    document.getElementById("short-answer-preview").style.visibility = "visible";
    document.getElementById("acc-btn-preview").style.visibility = "visible";
    document.getElementById("add-choice").style.visibility = "hidden";
    //ehsan
}

function activeMultipleChoice(){
    slide = presentation[current];
    slide.anstmp = 2;
    document.getElementById("acc-btn-preview").style.visibility = "hidden";
    document.getElementById("short-answer-preview").style.visibility = "hidden";
    document.getElementById("long-answer-preview").style.visibility = "hidden";
    document.getElementById("add-choice").style.visibility = "visible";
    //ehsan
}

function addChoice(){
    var slide = presentation[current];
    var choices = document.getElementById("choices");
    var input = document.createElement("input");
    input.className="input-choice col-md-10 col-lg-10 col-sm-8 col-xs-10";
    input.id = slide.choicesList.length;
    var placeHolder = input.id;
    placeHolder++;
    input.placeholder="گزینه " + placeHolder;
    input.addEventListener("change", function (event) {
        (slide.choicesList)[input.id] = this.value;
        //ehsan
        event.preventDefault();
    });
    slide.choicesNum++;
    choices.appendChild(input);

    slide.choicesList.push("");

    var closeChoice = document.createElement("img");
    closeChoice.setAttribute('src', 'img/VisualEditor_-_Icon_-_Close.svg.png');
    closeChoice.className="close-choice";
    closeChoice.id = slide.choicesList.length;
    closeChoice.addEventListener('click',function(event){
        var slide = presentation[current];
        delete (slide.choicesList)[this.id];
        slide.choicesNum--;
        if (slide.choicesNum == 0) {
            slide.choicesList = [];
        }

        var deletedInput = this.previousSibling;
        deletedInput.parentNode.removeChild(deletedInput);
        this.parentNode.removeChild(this);
        //ehsan
        event.preventDefault();
    });
    choices.appendChild(closeChoice);
    //ehsan
}

