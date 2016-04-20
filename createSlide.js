/**
 * Created by samane on 20/04/2016.
 */
function fillSlides(title){
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
    var slide1 =new fillSlides(titleValue);
    alert(titleValue);
}
