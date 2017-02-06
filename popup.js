
$(function(){

    // helpers
    var getDate_YYYYMMDDHHMM = function(){
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth();
        var day = date.getDay();
        var hr = date.getHours();
        var min = date.getMinutes();
        var dateString = "" + year + month + day + hr + min;
        return dateString;
    };


    // listeners
    $('#download').click(function(){
        //alert("Hi");
        var blob = new Blob(["Hello, world!"], {type: "text/plain;charset=utf-8"});
        saveAs(blob, getDate_YYYYMMDDHHMM() + ".playlist");
    });
});