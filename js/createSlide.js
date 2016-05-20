/**
 * Created by samane on 20/04/2016.
 */
//kiana
var presentation = [];
var current = -1;
var counter = -1;
var min = -1;
var max = -1;
//-----

//////////////////////////////////////////////////////////////////////slide logic//////////////////////////////////////////////////////////////////////////

 function readURL(input) {
    document.getElementById("img-label").style.visibility = "hidden";
    document.getElementById("blah").style.visibility = "visible";
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#blah')
                .attr('src', e.target.result)
//                                            .maxHeight(400)
//                                            .maxWidth(700)
//                                            .width(700)
//                                            .height(500);
        };
        var url = document.getElementById("blah").getAttribute('src');

        reader.readAsDataURL(input.files[0]);
        alert(url);
    }
}


/*---------------------------------------- add list feilds ( over flow and create )----------------------------------------------------------*/

function delFields(id){
    var input_del=document.getElementById(id);
    return input_del.parentNode.removeChild(input_del);
    //var container = document.getElementById("container");
    //container.removeChild(container.lastChild);
    //container.removeChild(container.lastChild);

}
/////////////////////////////////////////////////////////////////////////////create slide////////////////////////////////////////////////////////////////////////////////////


function addSlide() {


    var container = document.getElementById("slide-creator");
    divsNum = (container.childElementCount-1)/2;

    var div = document.createElement('div');
    div.style.height = "20rem";
    div.style.width = "15rem";
    div.style.paddingTop = "5rem";
    div.style.margin = "5rem auto";
    div.style.backgroundColor = "#ffffff";
    //kiana
    counter++;
    div.id = counter;
    max = counter;
    current = counter;
    if(divsNum==0) min=counter;

    updateSlide();
    container.appendChild(div);
    document.getElementById("top-content" + current).style.display="block";

    presentation.push({
    id : current,
    title : "",
    tmp : -1,
    // 0 stands for uploaded slides. they only have image url.
    imageUrl : "", //1
    videoUrl : "",//2
    hyperText : "", //3
    listItems : [], //4
    listItemsNum : 0
    });
    //-----


    var oImg = document.createElement("img");
    oImg.setAttribute('src', 'img/close_blue%20(11).png');
    oImg.setAttribute('alt', 'na');
    oImg.setAttribute('height', '20');
    oImg.setAttribute('width', '20');
    oImg.setAttribute('margin-left', '20%');
    //kiana
    oImg.id = counter;
    //-----

    container.appendChild(oImg);

    div.addEventListener("click", function (event) {
        div.style.border = "3px solid #337AB7";
        document.getElementById("top-content" + current).style.display="block";
        var pre = document.getElementById("top-content" + current);
        pre.style.display = "none";
        current = this.id;
        var crnt = document.getElementById("top-content" + current);
        crnt.style.display = "block";
        event.preventDefault();
    });

    //kiana
    oImg.addEventListener("click", function (event) {
        var num = this.id;
        var last = current;
        if(num == min) {
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
        else if(num == max){
            var tmp1 = this.previousSibling;
            var tmp2 = tmp1.previousSibling;
            max = tmp2.id;
            current = max;
        }
        else{
            current = num -1;
        }

        var tmp = this.previousSibling;
        del(tmp);
        del(oImg);
        var deletedSlide = document.getElementById("top-content"+tmp.id);
        del(deletedSlide);
        if(current != -1) {
            if(last != num){
                var pre = document.getElementById("top-content" + last);
                pre.style.display = "none";

            }
            var newSlide = document.getElementById("top-content" + current);
            newSlide.style.display = "block";
        }

        event.preventDefault();
    });

    function del(deldetedObj){
        return deldetedObj.parentNode.removeChild(deldetedObj);
    }
    //-----
}



function updateSlide() {
    //kiana
    bdy = document.getElementById("row");
    // num = bdy.childElementCount; //num = 2
    // num=num-2;
    num = counter;
    //
    //if (num > 0) {
    //    var lastChild = bdy.lastElementChild;
    //    //lastChild.style.visibility = "hidden";
    //    lastChild.style.display = "none";
    //}
    //
    
    top_content = document.createElement('div');
    top_content.id = "top-content" + num;
    top_content.style.display="none";
    //top_content.style.visibility="hidden";
    // alert(top_content.id);
    bdy.appendChild(top_content);
    //alert(top_content.id);
    var content = document.createElement('div');
    content.id = "content3";
    content.className = "content col-lg-12 col-sm-10";

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
    //button.onclick = "titleFunction()";
    //button.id="title-btn";
    button.type = "button";
    button.innerHTML = "عنوان";
    row_title.appendChild(button);

    var title = document.createElement('div');
    title.className = "title";
    row_title.appendChild(title);

    var header_input = document.createElement('textarea');
    //header_input.id="header-input";
    header_input.className = "col-lg-10 col-sm-8 title-text header-input ng-pristine ng-valid ng-touched";
    header_input.type = "text";
    header_input.setAttribute('ng-model', 'namein');
    header_input.placeholder = "متن خودرا اینجا بنویسید";
    //kiana
    header_input.addEventListener("change", function(event) {
        var slide = presentation[current];
        slide.title = this.value;
    });
    // 
    title.appendChild(header_input);


    button.addEventListener("click", function (event) {
        var parent=this.parentNode.parentNode;//row-title
        var firstChild =parent.childNodes[0]; //
        var hideBtn =firstChild.firstChild;//btn

        var showtitle = firstChild.childNodes[1].firstChild; //add-list
        titleFunction(showtitle,hideBtn);
        event.preventDefault();
    });


    function titleFunction(node,btn) {


        //document.getElementById("title-btn").style.visibility = "hidden";

        node.style.visibility = 'visible';
        //var hdr_inpt = document.getElementsByClassName('title-text');
        //for (i = 0; i < hdr_inpt.length; i++) {
        //    hdr_inpt[i].style.visibility = 'visible';
        //}

        btn.style.visibility="hidden";

        //var btn = document.getElementsByClassName('title-btn');
        //for (i = 0; i < btn.length; i++) {
        //    btn[i].style.visibility = 'hidden';
        //}
        var close_title =document.createElement('img');
        close_title.setAttribute('src', 'img/close_blue%20(11).png');
        close_title.setAttribute('alt', 'na');
        close_title.setAttribute('margin-left', '20%');
        close_title.setAttribute('visibility', 'visible');
        //kiana
        close_title.id = "close-title" + counter;
        //-----
        close_title.className="close-title";
        title.appendChild(close_title);
        close_title.addEventListener("click", function (event) {

            closeTitleFunction(node,btn);
            event.preventDefault();
        });

        function closeTitleFunction(node,btn){

            node.style.visibility = 'hidden';

            btn.style.visibility="visible";

            //var hdr_inpt = document.getElementsByClassName('title-text');
            //for (i = 0; i < hdr_inpt.length; i++) {
            //    hdr_inpt[i].style.visibility = 'hidden';
            //}
            //
            //var btn = document.getElementsByClassName('title-btn');
            //for (i = 0; i < btn.length; i++) {
            //    btn[i].style.visibility = 'visible';
            //}
            var cls_btn = document.getElementsByClassName('close-title');
            for (i = 0; i < cls_btn.length; i++) {
                cls_btn[i].style.visibility = 'hidden';
            }
        }
    }

    var etc = document.createElement('div');
    etc.className= 'etc row';
    slide.appendChild(etc);

    var img_btn = document.createElement('button');
    img_btn.className="gp-btn bttn col-lg-2 col-md-2 col-sm-2 ";
    img_btn.id="add-img"+num;
    img_btn.innerHTML='اضافه کردن تصویر';
    img_btn.type="button";

    img_btn.addEventListener("click", function (event) {
       var parent=this.parentNode.parentNode;//row-title
        var hideBtns =parent.childNodes[1]; //etc
        var thirdChild = parent.childNodes[2]; //row (add-image , ..)
        var showImage = thirdChild.firstChild; //add-image
        // alert(hideBtns.className);
        imgFunction(showImage,hideBtns);
        event.preventDefault();
    });
    etc.appendChild(img_btn);

    var video_btn = document.createElement('button');
    video_btn.className="gp-btn bttn col-lg-2 col-md-2 col-sm-2 ";
    video_btn.innerHTML='اضافه کردن فیلم';
    video_btn.type="button";

    video_btn.addEventListener("click", function (event) {
        var parent=this.parentNode.parentNode;//row-title
        var hideBtns =parent.childNodes[1]; //etc
        var thirdChild = parent.childNodes[2]; //row (add-image , ..)
        var showvideo = thirdChild.childNodes[1]; //add-video

        videoFunction(showvideo,hideBtns);

        event.preventDefault();
    });
    etc.appendChild(video_btn);

    var text_btn = document.createElement('button');
    text_btn.className="gp-btn bttn col-lg-2 col-md-2 col-sm-2 ";
    text_btn.innerHTML='اضافخ کردن متن';
    text_btn.type="button";

    text_btn.addEventListener("click", function (event) {
        var parent=this.parentNode.parentNode;//row-title
        var hideBtns =parent.childNodes[1]; //etc
        var thirdChild = parent.childNodes[2]; //row (add-image , ..)
        var showText = thirdChild.childNodes[2]; //add-TEXT

        textFunction(showText,hideBtns);
        event.preventDefault();
    });
    etc.appendChild(text_btn);

    var list_btn = document.createElement('button');
    list_btn.className="gp-btn bttn col-lg-2 col-md-2 col-sm-2 ";
    list_btn.innerHTML="اضافه کردن لیست";
    list_btn.type="button";
    list_btn.addEventListener("click", function (event) {
        var parent=this.parentNode.parentNode;//row-title
        var hideBtns =parent.childNodes[1]; //etc
        var thirdChild = parent.childNodes[2]; //row (add-image , ..)
        var showList = thirdChild.childNodes[3]; //add-list

        listFunction(showList,hideBtns);
        event.preventDefault();
    });
    etc.appendChild(list_btn);

    var close_img = document.createElement('img');
    close_img.className="close-img";
    close_img.setAttribute('src', 'img/close_blue%20(11).png');
    close_img.addEventListener("click", function (event) {

        closeFunction(this);
        event.preventDefault();
    });
    etc.appendChild(close_img);

    //    <div id="etc" class="etc row">
    //        <img id="close" onclick="closeFunction()" src="img/close_blue%20(11).png">
    //        <button id="img-btn" type="button" onclick="imgFunction()" class="bttn col-lg-2 col-md-2 col-sm-2 " >اضافه کردن تصویر</button>
    //        <button id="video-btn" type="button" onclick="videoFunction()" class="bttn col-lg-2 col-md-2 col-sm-2 " >اضافه کردن فیلم</button>
    //        <button id="text-btn" type="button" onclick="textFunction()" class="bttn col-lg-2 col-md-2 col-sm-2 " >افزودن متن</button>
    //        <button id="list-btn" type="button" onclick="listFunction()" class="bttn col-lg-2 col-md-2 col-sm-2" >افزودن لیست  </button>
    //    </div>



    var row2 = document.createElement('div');
    row2.className="row";
    slide.appendChild(row2);

    var add_img = document.createElement('div');
    add_img.className="add-img col-lg-12 col-centered";
    row2.appendChild(add_img);
    
    //kiana
    // var label = document.createElement("label");
    // label.htmlFor="img-label";
    // add_img.appendChild(label);

    
    //<label for="img"><img class="img-label" id="img-label" src="img/img.png"
    //                                           alt="choose your image"></label></label>

    // var label = document.createElement('label');
    // label.setAttribute('for','img');
    // image_label.setAttribute('src', 'img/img.png');
    // label.appendChild(image_label);

    // var image_label = document.createElement('img');
    // image_label.className="img-label";
    // image_label.setAttribute('src', 'img/img.png');
    // label.appendChild(image_label);

    var browse = document.createElement('input');
    browse.type='file';

    browse.className="img";
    // browse.addEventListener("click",function(event){
    //     readURL(this);
    //     event.preventDefault();
    // });
    //
    add_img.appendChild(browse);
    //
    // var img_place = document.createElement('img');
    // img_place.className="blah";
    // img_place.setAttribute('src', '#');
    // add_img.appendChild(img_place);

    //<div id="add-img" class="add-img col-lg-12 col-centered">
    //        <label for="img"><img class="img-label" id="img-label" src="img/img.png" alt="choose your image"></label></label>
    //        <input class="browse" id="img" onchange="readURL(this);" type="file">
    //        <img id="blah" src="#"  />
    //</div>

    var add_video = document.createElement('div');
    add_video.className="add-video col-lg-12 col-centered";
    row2.appendChild(add_video);

    var url_input = document.createElement('input');
    url_input.type="text";
    url_input.className="video-url";
    add_video.appendChild(url_input);

    var video_url_btn = document.createElement('button');
    video_url_btn.className="bttn acc-add col-lg-2 col-md-2 col-sm-4 ttl  ";
    video_url_btn.innerHTML="تایید ادرس";
    video_url_btn.type="button";
    //kiana
    video_url_btn.addEventListener("click", function (event) {
        var slide = presentation[current];
        var val = this.previousSibling.value;
        if(val != null){
            slide.tmp = 2;
            slide.videoUrl = val;
        }
        event.preventDefault();
    });
    //-----
    add_video.appendChild(video_url_btn);


    //<div id="add-video" class="add-video col-lg-12 col-centered">
    //        <input  type="text" id="video-url" >
    //        <button type="button" onclick="" id="videourl-btn" class="bttn col-lg-2 col-md-2 col-sm-4 ttl" >تایید آدرس</button>
    //        <video controls autoplay id="blah" src="#"></video>
    //</div>

    var text_area = document.createElement('textarea');
    text_area.type="text";
    text_area.className="add-text hyper-text header-input col-lg-11 col-md-11 col-sm-11 ng-pristine ng-valid ng-touched";
    text_area.style.height="76px";
    text_area.style.overflow="hidden";
    //kiana
    text_area.addEventListener("change", function (event) {
        var slide = presentation[current];
        slide.tmp = 3;
        slide.hyperText = this.value;
        event.preventDefault();
    });
    //-----
    row2.appendChild(text_area);


    //<textarea id="hyper-text" type="text"  ng-model="slide.header"
    // placeholder="متن خود را اینجا بنویسید " class="col-lg-11 col-md-11 col-sm-11 header-input ng-pristine ng-valid ng-touched" style="overflow: hidden; word-wrap: break-word; resize: none; height: 76px;"></textarea>


    var add_list = document.createElement("div");
    add_list.className="add-list col-lg-12 col-centered";
    row2.appendChild(add_list);

    var row_list = document.createElement('div');
    row_list.className="row_list";
    add_list.appendChild(row_list);

    var fill_details = document.createElement('button');
    fill_details.className= "bttn add-list-btn col-lg-4 col-md-4 col-sm-6 col-centered";
    fill_details.type="button";
    fill_details.innerHTML="افزودن لیست ";
    fill_details.addEventListener("click",function (event){
        var parent=this.parentNode;//add-list
        //alert(parent.className);
        var hideBtns =parent.childNodes[1]; //bttn
        var thirdChild = parent.childNodes[2]; //container
        //alert(hideBtns.className);
        addFields(thirdChild,hideBtns);
        event.preventDefault();
    } )
    add_list.appendChild(fill_details);

    var container = document.createElement('div');
    container.className="container";
    add_list.appendChild(container);

    //<div id="add-list" class="add-list col-lg-12 col-centered">
    //        <div class="row_list" >
    //        <button id="filldetails" type="button" onclick="addFields()" class="bttn col-lg-4 col-md-4 col-sm-6 col-centered" >افزودن لیست  </button>
    //    </div>
    //
    //
    //    </div>

    function imgFunction(node,btn){
        //
        //var btn = document.getElementsByClassName('gp-btn');
        for (i = 0; i <4; i++) {
            btn.childNodes[i].style.visibility = 'hidden';
        }
        btn.childNodes[4].style.visibility="visible";
        //var close = document.getElementsByClassName('close-img');
        //for (i = 0; i < close.length; i++) {
        //    close[i].style.visibility = 'visible';
        //}
        //btn.style.visibility="hidden";
        node.style.visibility="visible";
        ////var div = document.getElementsByClassName('add-img');
        //for (i = 0; i < node.length; i++) {
        //    node[i].style.visibility = 'visible';
        //}


        //document.getElementById("add-img").style.visibility = "visible";
        //document.getElementById("close").style.visibility = "visible";
    }

    function videoFunction(node , btn){
        for (i = 0; i <4; i++) {
            btn.childNodes[i].style.visibility = 'hidden';
        }
        btn.childNodes[4].style.visibility="visible";
        node.style.visibility="visible";

        //var btn = document.getElementsByClassName('gp-btn');
        //for (i = 0; i < btn.length; i++) {
        //    btn[i].style.visibility = 'hidden';
        //}
        //var div = document.getElementsByClassName('add-video');
        //for (i = 0; i < div.length; i++) {
        //    div[i].style.visibility = 'visible';
        //}
        //
        //var close = document.getElementsByClassName('close-img');
        //for (i = 0; i < close.length; i++) {
        //    close[i].style.visibility = 'visible';
        //}
    }

    function textFunction(node , btn){
        for (i = 0; i <4; i++) {
            btn.childNodes[i].style.visibility = 'hidden';
        }
        btn.childNodes[4].style.visibility="visible";
        node.style.visibility="visible";

        //var btn = document.getElementsByClassName('gp-btn');
        //for (i = 0; i < btn.length; i++) {
        //    btn[i].style.visibility = 'hidden';
        //}
        //var div = document.getElementsByClassName('add-text');
        //for (i = 0; i < div.length; i++) {
        //    div[i].style.visibility = 'visible';
        //}
        //var close = document.getElementsByClassName('close-img');
        //for (i = 0; i < close.length; i++) {
        //    close[i].style.visibility = 'visible';
        //}
    }

    function listFunction(node,btn){
        for (i = 0; i <4; i++) {
            btn.childNodes[i].style.visibility = 'hidden';
        }
        btn.childNodes[4].style.visibility="visible";
        node.style.visibility="visible";

    }

    function closeFunction(closeImg){
        var btn = document.getElementsByClassName('gp-btn');
        for (i = 0; i < btn.length; i++) {
            btn[i].style.visibility = 'visible';
        }
        var div = document.getElementsByClassName('add-img');
        for (i = 0; i < div.length; i++) {
            div[i].style.visibility = 'hidden';
        }

        var div_video = document.getElementsByClassName('add-video');
        for (i = 0; i < div_video.length; i++) {
            div_video[i].style.visibility = 'hidden';
        }

        var div_text = document.getElementsByClassName('add-text');
        for (i = 0; i < div_text.length; i++) {
            div_text[i].style.visibility = 'hidden';
        }

        var div_list = document.getElementsByClassName('add-list');
        for (i = 0; i < div_list.length; i++) {
            div_list[i].style.visibility = 'hidden';
        }

        var close = document.getElementsByClassName('close-img');
        for (i = 0; i < close.length; i++) {
            close[i].style.visibility = 'hidden';
        }
        //document.getElementById("blah").style.visibility = "hidden";
        
        //kiana
        var slide = presentation[current];
        slide.tmp = -1;
        //slide.image = ""; //1
        slide.imageUrl = ""; //1
        slide.videoUrl = "";//2
        slide.hyperText = ""; //3
        slide.listItems = []; //4
        slide.listItemsNum = 0;
        //-----
    }

    function addFields(node,btn){
        var count = node.childNodes.length;
        if (count<28) {
            var input = document.createElement("input");
            input.type = "text";
            // id = (node.childNodes.length)/2;
            //kiana
            var id = presentation[current].listItems.length;
            input.id = id;
            input.addEventListener("change", function(event){
                (presentation[current].listItems)[input.id] = this.value;
                event.preventDefault();
            });
            //
            var oImg=document.createElement("img");
            oImg.setAttribute('src', 'img/close_blue%20(11).png');
            oImg.setAttribute('alt', 'na');
            oImg.setAttribute('height', '20');
            oImg.setAttribute('width', '20');
            oImg.setAttribute('margin-left','20%');
            oImg.id=id;
            oImg.addEventListener("click", function(event) {
                //kiana
                // var slideID = oImg.parentNode.parentNode.parentNode.id;
                var slide = presentation[current];
                delete (slide.listItems)[this.id];
                slide.listItemsNum--;
                if(slide.listItemsNum==0){
                    slide.listItems=[];
                    slide.tmp = -1;
                }
    
                var deletedInput = this.previousSibling;
                deletedInput.parentNode.removeChild(deletedInput);
                this.parentNode.removeChild(this);

                event.preventDefault();
                //
            });

            node.appendChild(input);
            node.appendChild(oImg);

            var slide = presentation[current];
            slide.tmp = 4;
            slide.listItems.push("");
            slide.listItemsNum++;
        }
    }




}

function activeText(){
    //var std_view = document.getElementById("std_view");
    //var text_answer = document.createElement("div");
    //text_answer.id="long-answer-preview";
    //var acc_btn = document.createElement("button");
    //acc_btn.id="acc-btn-preview";
    //acc_btn.innerHTML="تایید";
    //std_view.appendChild(text_answer);
    //std_view.appendChild(acc_btn);

    document.getElementById("acc-btn-preview").style.visibility="visible";
    document.getElementById("long-answer-preview").style.visibility="visible";
    document.getElementById("short-answer-preview").style.visibility="hidden";

}

function activeNumber(){
    document.getElementById("long-answer-preview").style.visibility="hidden";
    document.getElementById("short-answer-preview").style.visibility="visible";
    document.getElementById("acc-btn-preview").style.visibility="visible";
}
