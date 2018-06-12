$(function(){
    console.log("TC-ext: background.js - load script");
    
    console.log("TC-ext: eventbackgroundPage.js - add 'show' listener");
    
    // listen when we are in TC and enable the extension icon
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
        if (request.action == "show"){
            chrome.tabs.query({active:true, currentWindow: true}, function(tabs){
                console.log("TC-ext: background.js - show extension icon");
                chrome.pageAction.show(tabs[0].id);
            });
            
        }
    });
});



