/**
 * Created by samane on 13/05/2016.
 */
var presentation = [{"id":0,"title":"a","tmp":1,"imageUrl":"img/pear.jpg","videoUrl":"","hyperText":"","listItems":[],"listItemsNum":0},{"id":1,"title":"b","tmp":4,"imageUrl":"","videoUrl":"","hyperText":"","listItems":['a',undefined,'c'],"listItemsNum":3}];

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


 function createSlide() {
     var body = document.getElementsByClassName('body');
     for (i = 0; i < body.length; i++) {
         //body[i].style.backgroundColor="red";
     }
     var slide_blue = document.getElementById("slide-blue");
     if (current==-1) {//
//         //namayeshe safheye aval(safheye aghaye taheri k code namayesh dade mishe)

         var code_dive = document.getElementById("code");

         alert(code_dive.childElementCount);
         if(code_dive.childElementCount>0){

             var lastChild =code_dive.lastElementChild;
             lastChild.parentNode.removeChild(lastChild);
         }
         slide_blue.style.backgroundColor="#2C4141";
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
         code.innerHTML="code"
         alpha_step.appendChild(code);

     }



     else if(curTmp == 0){
         //namayeshe axe slide i k up shode
     }

     else{
         slide_blue.style.backgroundColor="#ffffff";

         //namayeshe title
         var code_title = document.getElementById("code");
         //alert(code_title.childElementCount);
         if(code_title.childElementCount>0){

             var lastChild_title_code =code_title.lastElementChild;
             lastChild_title_code.parentNode.removeChild(lastChild_title_code);
         }

         var title_title = document.getElementById("title");
         //alert(title_title.childElementCount);
         if(title_title.childElementCount>0){

             var lastChild_title_title =title_title.lastElementChild;
             lastChild_title_title.parentNode.removeChild(lastChild_title_title);
         }

            var bdy = document.getElementById("title");

            var title = document.createElement("div");
            title.className="title col-lg-10 col-sm-10 col-xs-10 col-md-10 ";
         bdy.appendChild(title);
            //for (i = 0; i < bdy.length; i++) {
            //    bdy[i].appendChild(title);
            //}

            var title_text = document.createElement("p");
            title_text.innerHTML="عنوان";
            title.appendChild(title_text);


         if (curTmp == 1){ //image slide
             var code_img = document.getElementById("code");
             alert(code_img.childElementCount);
             if(code_img.childElementCount>0){

                 var lastChild_img_code =code_img.lastElementChild;
                 lastChild_img_code.parentNode.removeChild(lastChild_img_code);
             }

             var body_id = document.getElementById("body");
             alert(body_id.childElementCount);
             if(body_id.childElementCount>0){

                 var lastChild_body =body_id.lastElementChild;
                 lastChild_body.parentNode.removeChild(lastChild_body);
             }

             var image = document.createElement('img');
             image.className="picture col-lg-10 col-sm-10 col-xs-10 col-md-10";
             image.setAttribute('src', 'img/education.jpg');
             // image_slide.appendChild(image);

             for (i = 0; i < body.length; i++) {
                 body[i].appendChild(image);
             }

         }
         else  if (curTmp==2){ //video slide
             var code_video = document.getElementById("code");
             alert(code_video.childElementCount);
             if(code_video.childElementCount>0){

                 var lastChild_video_code =code_video.lastElementChild;
                 lastChild_video_code.parentNode.removeChild(lastChild_video_code);
             }

             var body_video = document.getElementById("body");
             alert(body_video.childElementCount);
             if(body_video.childElementCount>0){

                 var lastChild_body_video =body_video.lastElementChild;
                 lastChild_body_video.parentNode.removeChild(lastChild_body_video);
             }
             var video = document.createElement('div');
             video.className="video col-lg-10 col-sm-10 col-md-10 col-xs-10";
             //body.appendChild(video);
             for (i = 0; i < body.length; i++) {
                 body[i].appendChild(video);
             }
         }

         else  if (curTmp==3) { //text slide

             var code_text = document.getElementById("code");
             alert(code_text.childElementCount);
             if(code_text.childElementCount>0){

                 var lastChild_text_code =code_text.lastElementChild;
                 lastChild_text_code.parentNode.removeChild(lastChild_text_code);
             }

             var body_text = document.getElementById("body");
             alert(body_text.childElementCount);
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
             text.innerHTML=slide.hyperText;
             text.className="text";

         }

         else  if (curTmp==4) { //list slide
             var code_list = document.getElementById("code");
             alert(code_list.childElementCount);
             if(code_list.childElementCount>0){

                 var lastChild_list_code =code_list.lastElementChild;
                 lastChild_list_code.parentNode.removeChild(lastChild_list_code);
             }

             var body_list = document.getElementById("body");
             alert(body_list.childElementCount);
             if(body_list.childElementCount>0){

                 var lastChild_body_list =body_list.lastElementChild;
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
             var listItemsLength = slide.listItems.length;
             var i = 0;
             while (i<Math.min(listItemsNum,listItemsLength)) {
                 if(slide.listItems[i]!=null){
                     var list_item = document.createElement('p');
                     list_item.innerHTML = slide.listItems[i];
                     list.appendChild(list_item);
                 }
                 i++;
             }


         }


     }
 }
