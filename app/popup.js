$(function(){

    console.log("TC-ext: popup.js - load script");

    // message senders
    $('#downloadSeleniumTestsButton').click(function(){
        
        console.log("TC-ext: popup.js - send download action");

        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs){
            chrome.tabs.sendMessage(tabs[0].id, {action:"downloadSeleniumTestsButton"});
        });
       
    });
});