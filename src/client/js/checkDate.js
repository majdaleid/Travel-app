    function checkDate(inputDate) {
    if(inputDate<0){
            alert("please enter a date in the future")
            return false;
    }
    else {
    return true;
    }
    }
    export { checkDate }
