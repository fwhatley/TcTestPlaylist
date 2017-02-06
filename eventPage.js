$(function(){
    console.log("TC-ext: eventPage.js - load script");
    
    console.log("TC-ext: eventPage.js - add 'show' listener");
    // listen when we are in TC and enable the extension icon
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
        if (request.action == "show"){
            chrome.tabs.query({active:true, currentWindow: true}, function(tabs){
                console.log("TC-ext: eventPage.js - show extension icon");
                chrome.pageAction.show(tabs[0].id);
            });
            
        }
    });
});



