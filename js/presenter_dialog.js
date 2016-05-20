// presenter
var modal = document.getElementById("myModal");

var btn = document.getElementById("myclk");
var btn1 = document.getElementById("myclk1");
var btn2 = document.getElementById("myclk2");

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



//end upload




// When the user clicks the button, open the modal , presenter

btn.onclick = function() {
    modal.style.display = "block";
    modalImg.src = this.src;
}
btn1.onclick = function(){
	modal.style.display = "block";
	modalImg.src = this.src;
}
btn2.onclick = function(){
	modal.style.display = "block";
	modalImg.src = this.src;
}


// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}




// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}