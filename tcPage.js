$(function(){

    console.log("TC-ext: tcPage.js - load script");

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

    // listen to click on download event from extension icon
    console.log("TC-ext: tcPage.js - add 'download' listener");
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
        if (request.action == "download") {
            
            console.log("TC-ext: tcPage.js - downloading file...");
            
            var text = $('p u').text();

            var blob = new Blob([text], {type: "text/plain;charset=utf-8"});
            saveAs(blob, getDate_YYYYMMDDHHMM() + ".playlist");

        }
    });

    console.log("TC-ext: tcPage.js - send 'show' action");
    chrome.runtime.sendMessage({ action:"show" });

});
