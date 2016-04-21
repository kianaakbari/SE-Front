/**
 * Created by samane on 20/04/2016.
 */

 /*slide logic */
function FillSlides(title){
    this.Title=title;
    this.hasImage="False";
    this.hasVideo="False";
    this.imageUrl="";
    this.videoUrl="";
    this.hyperText="";
    this.listItems=new Array(100);
}
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

/* add list feilds ( over flow and create )*/
function addFields(){
    var container = document.getElementById("container");
    var input = document.createElement("input");
    input.type = "text";
    input.id="list-field";

    var number=container.childElementCount;
    input.id="list-field"+ number;
    if (number<13) {
        container.appendChild(input);
    }
    // Append a line break
//                        container.appendChild(document.createElement("br"));
//                        alert(number);
}
function delFields(){
    var container = document.getElementById("container");
    container.removeChild(container.lastChild);

}

/////////////////////////////////////////////////////////////////////add list feilds ( over flow and create )/////////////////////////////////////////////////////////////////