function checkForName(inputText,inputDatum) {
    console.log("::: Running checkForName :::", inputText);

    if(!inputText){
        alert("please enter a Text")
        return false;
    }else
    if(!inputDatum)
    {
      alert("please enter a date")
      return false;
    }
    else return true;
  
}

export { checkForName }
