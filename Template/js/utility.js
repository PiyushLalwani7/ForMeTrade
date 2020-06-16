function convertDate(date){
    var temp_d = new Date(date);
    return temp_d.toGMTString();
}

function getYear(date){
    var temp_d = new Date(date);
    return temp_d.getFullYear();
}

function getNumericDate(date){
    var temp_d = new Date(date);
    return temp_d.getDate();
}
function getCharacterMonth(date){
    var temp_d = new Date(date);
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    return months[temp_d.getMonth()];
}