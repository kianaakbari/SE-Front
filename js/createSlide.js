/**
 * Created by samane on 20/04/2016.
 */

//var slide = {
//    id  :   document.getElementById().id,
//    firstName: "John",
//    lastName : "Doe",
//    id       : 5566,
//    fullName : function() {
//       return this.firstName + " " + this.lastName;
//    }
//};

//kiana------
var presentation=[];
function initSlide(num){
    this.id = num;
    this.title = "";
    this.tmp = -1;
    this.image = ""; //1
    //this.imageUrl = "";
    this.videoUrl = "";//2
    this.hyperText = ""; //3
    this.listItems = new Array(100); //4
    this.listItemsNum = 0;
}
//-------

 /*slide logic */
//function FillSlides(title){
//    this.Title=title;
//    this.hasImage="False";
//    this.hasVideo="False";
//    this.imageUrl="";
//    this.videoUrl="";
//    this.hyperText="";
//    this.listItems=new Array(100);
//}
function save(){
    var titleValue = document.getElementById("header-input").value;
    var listItems = new Array(15);
    for(i =0;i<13;i++){
        listItems[i] = document.getElementById("list-field"+i).value;
        alert(listItems[i]);
    }
    alert(titleValue);
    var slide1 =new FillSlides(titleValue,listItems);
    //slide1.Title=titleValue;
}
//////////////////////////////////////////////////////////////////////slide logic//////////////////////////////////////////////////////////////////////////

/* preview image in add image feild
function previewFile() {
    var preview = document.querySelector('img');
    var file    = document.querySelector('input[type=file]').files[0];
    var reader  = new FileReader();

    reader.addEventListener("load", function () {
        preview.src = reader.result;
    }, false);
    alert(preview.src);
    if (file) {
        reader.readAsDataURL(file);
    }
}
///////////////////////////////////////////////////////preview image in add image feild/////////////////////////////////////////////////////////////////////

/*hide and visible btns*/
function titleFunction() {
    document.getElementById("header-input").style.visibility = "visible";
    document.getElementById("title-btn").style.visibility = "hidden";
    document.getElementById("close-title").style.visibility = "visible";
}
function closeTitleFunction(){
    document.getElementById("header-input").style.visibility = "hidden";
    document.getElementById("title-btn").style.visibility = "visible";
    document.getElementById("close-title").style.visibility = "hidden";
}
function closeFunction(){
    document.getElementById("img-btn").style.visibility = "visible";
    document.getElementById("video-btn").style.visibility = "visible";
    document.getElementById("text-btn").style.visibility = "visible";
    document.getElementById("list-btn").style.visibility = "visible";
    document.getElementById("add-img").style.visibility = "hidden";
    document.getElementById("add-list").style.visibility = "hidden";
    document.getElementById("add-video").style.visibility = "hidden";
    document.getElementById("hyper-text").style.visibility = "hidden";
    document.getElementById("close").style.visibility = "hidden";
    document.getElementById("blah").style.visibility = "hidden";
}
//                closeFunction("header-input", "title-btn" , "close-title");
function hiddenGroup(){
    document.getElementById("img-btn").style.visibility = "hidden";
    document.getElementById("video-btn").style.visibility = "hidden";
    document.getElementById("text-btn").style.visibility = "hidden";
    document.getElementById("list-btn").style.visibility = "hidden";
}
function imgFunction(){
    hiddenGroup();
    document.getElementById("add-img").style.visibility = "visible";
    document.getElementById("close").style.visibility = "visible";
}
function videoFunction(){
    hiddenGroup();
    document.getElementById("add-video").style.visibility = "visible";
    document.getElementById("close").style.visibility = "visible";
}
function textFunction(){
    hiddenGroup();
    document.getElementById("hyper-text").style.visibility = "visible";
    document.getElementById("close").style.visibility = "visible";
}
function listFunction(){
    hiddenGroup();
    document.getElementById("add-list").style.visibility = "visible";
    document.getElementById("close").style.visibility = "visible";
}

////////////////////////////////////////////////////////////////////////////hide and visible btns///////////////////////////////////////////////////////////////////////////



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
function addFields(){
    var container = document.getElementById("container");
    var input = document.createElement("input");
    input.type = "text";
    //input.id="list-field";

    var number = (container.childElementCount)/2;
    input.id = number;

    //kiana
    input.addEventListener("change", function(event){
        var slideID = input.parentNode.parentNode.parentNode.id;
        (presentation[slideID].listItems)[input.id] = itm.value;
        event.preventDefault();
    });
    //

    var oImg=document.createElement("img");
    oImg.setAttribute('src', 'img/close_blue%20(11).png');
    oImg.setAttribute('alt', 'na');
    oImg.setAttribute('height', '20');
    oImg.setAttribute('width', '20');
    oImg.setAttribute('margin-left','20%');
    oImg.id="list-input-img"+number;
    oImg.addEventListener("click", function(event) {
        //kiana
        var slideID = oImg.parentNode.parentNode.parentNode.id;
        var slide = presentation[slideID];
        delete (slide.listItems)[oImg.id];
        slide.listItemsNum++;
        if(slide.listItemsNum==0){
            slide.listItems=[];
            slide.tmp = -1;
        }
        //
        delFields(input.id);
        delFields(oImg.id);
        event.preventDefault();
    });



    if (number<10) {
        container.appendChild(input);
        container.appendChild(oImg);
    }
    // Append a line break
//                        container.appendChild(document.createElement("br"));
//                        alert(number);
}

function delFields(id){
    var input_del=document.getElementById(id);
    return input_del.parentNode.removeChild(input_del);
    //var container = document.getElementById("container");
    //container.removeChild(container.lastChild);
    //container.removeChild(container.lastChild);

}
/////////////////////////////////////////////////////////create slide///////////////////////////////////////////////////////////////////////////
function addSlide(){
    var container = document.getElementById("slide-creator");

    var div = document.createElement('div');
    div.style.height="20rem";
    div.style.width="15rem";
    div.style.paddingTop="5rem";
    div.style.margin="5rem auto";
    div.style.backgroundColor="#ffffff";

    div.addEventListener("click", function(event) {


        div.style.backgroundColor="red";

        event.preventDefault();
    });


    var number=container.childElementCount;
    var num = (number+1)/2;
    div.id=num;

    container.appendChild(div);

    var oImg=document.createElement("img");
    oImg.setAttribute('src', 'img/close_blue%20(11).png');
    oImg.setAttribute('alt', 'na');
    oImg.setAttribute('height', '20');
    oImg.setAttribute('width', '20');
    oImg.setAttribute('margin-left','20%');
    oImg.id="slide-close-img"+number;
    container.appendChild(oImg);

    var bdy = document.getElementById("row");
    var num=bdy.childElementCount; //num = 3
    var content = document.getElementById("content" + num);

    var newDiv = document.createElement('div');
    newDiv.id=num;


    newDiv.innerHTML = document.getElementById('top-content').innerHTML;
    var firstChild = newDiv.firstElementChild;
    firstChild.style.visibility="visible";
    firstChild.style.id="content-slide" + num;
    document.getElementById('row').appendChild(newDiv);


    //content.style.visibility="visible;"

  /*  if(num==3) {
        //bdy.style.backgroundColor = "red";
        content.style.visibility = "visible";
        content.id="slide-template" + num;
        bdy.appendChild(document.createElement("br"));
        //alert(content.id);
    } else if(num>3){

        num=num-1;
        var pre_slide = document.getElementById("slide-template" + num);
        //pre_slide.="";
        //pre_slide.style.visibility="hidden";
        num++;

        var newDiv = document.createElement('div');
        newDiv.id="slide-template" + num;
        //var crntslide = document.getElementById("slide-template" + num);
        //crntslide.style.visibility="visible";
            //alert(newDiv.id);

        newDiv.innerHTML = document.getElementById('top-content').innerHTML;
        //content.style.visibility="hidden;"

        document.getElementById('row').appendChild(newDiv);

    }*/


    oImg.addEventListener("click", function(event) {
        //kiana-----
        var slideID = oImg.parentNode.parentNode.parentNode.id;
        delete presentation[slideID];
        //----------

        delSlide(div.id);
        delSlide(oImg.id);
        //delSlide(content.id);

        event.preventDefault();
    });

    //kiana------
    presentation.push(initSlide(num));
    //-----------

}

function delSlide(id){
    var del_slide = document.getElementById(id);
    return del_slide.parentNode.removeChild(del_slide);


}

//kiana------

function addTitle(title){
    var slideID = title.parentNode.parentNode.parentNode.parentNode.id;
    var slide = presentation[slideID];
    slide.title = title.value;
}

function addImg(img){
    var slideID = img.parentNode.parentNode.parentNode.parentNode.id;
    var slide = presentation[slideID];
    slide.tmp = 1;
    slide.image = this.value;
}

function addVideo(videoBtn){
    var slideID = videoBtn.parentNode.parentNode.parentNode.parentNode.id;
    var slide = presentation[slideID];
    var val = videoBtn.previousSibling.value;
    if(val != null){
        slide.tmp = 2;
        slide.videoUrl = val;
    }
}

function addText(txtarea) {
    var slideID = txtarea.parentNode.parentNode.parentNode.id;
    var slide = presentation[slideID];
    slide.tmp = 3;
    slide.hyperText = txtarea.value;
}

function addListItem(addBtn){
    var slideID = addBtn.parentNode.parentNode.parentNode.id;
    var slide = presentation[slideID];
    slide.tmp = 4;
    slide.listItems.push("");
    slide.listItemsNum++;
}

function clrSlideTitle(closeImg){
    var slideID = closeImg.parentNode.parentNode.parentNode.id;
    var slide = presentation[slideID];
    slide.title = "";
}

function clrSlideBody(closeImg){
    var slideID = closeImg.parentNode.parentNode.parentNode.id;
    var slide = presentation[slideID];
    slide.tmp = -1;
    slide.image = ""; //1
    //slide.imageUrl = "";
    slide.videoUrl = "";//2
    slide.hyperText = ""; //3
    slide.listItems = new Array(100); //4
    slide.listItemsNum = 0;
}

//-----------
