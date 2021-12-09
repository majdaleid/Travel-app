function resetTripe(event){
    event.preventDefault()
    document.getElementById("cityname").value="";
    document.getElementById("cityname").innerHTML=""
    document.getElementById("date").value=""
    document.getElementById('temp').innerHTML="";
    document.getElementById('img1').src=""

}


export { resetTripe }