$(function(){

    console.log("TC-ext: tcPage.js - load script");
    var _failedTestSelector = '#tst_group_build_failRefreshInner .testList .testNamePart .testWithDetails span.hoverable';

    // HELPERS - MSG LISTENERS
    var getSectionPath = function(section){
        var path = section.innerText.replace(/\s/g, ''); // remove all whitespaces
        path = path.replace(/TRX:/g, ''); // remove the TRX: from text
        path = path.replace(/[(, 0-9 ,)]/g, ''); // remove the (#) from text
        return path;
    }

    var getFailedTestSet = function(section){
        console.log("TC-ext: tcPage.js - getting failed test set/section");
        
        var failedTests = [];
        var tableElement = $(section).next();
        var testElementList = tableElement.find(".testWithDetails");

        // create each failed test text
        testElementList.each(function(){
            failedTests.push($(this).text());
        });

        return failedTests;
    };

    var getDate_YYYYMMDDHHMM = function(){
        console.log("TC-ext: tcPage.js - building date");
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1; // want a 1-12 month
        var day = date.getDate(); // 1 - 31
        var hr = date.getHours();
        var min = date.getMinutes();
        var dateString = '' + year + '-' + month + '-' + day + '-H' + hr + '-M' + min;
        return dateString;
    };

    var buildTestPlaylist = function(){
        console.log("TC-ext: tcPage.js - building test playlist");
        var sectionsSelector = "#tst_group_build_fail .group-name"; // selects the sections of tests per folder inside the failed tests section 
        var playlistText = "";
        playlistText += '<Playlist Version="1.24234">\r\n';

        var elementList = $(sectionsSelector);
        debugger;
        elementList.each(function(){

            var element = this;
            var sectionPath = getSectionPath(element);
            var failedTestSet = getFailedTestSet(element);

            failedTestSet.forEach(function(failedTest){
                playlistText += '<Add Test="'; //todo: make this configurable
                playlistText += sectionPath + ".";
                playlistText += failedTest;
                playlistText += '" />\r\n';
            });

        });
        
        playlistText += '</Playlist>';
        return playlistText;
    };

    // MSG LISTENERS
    // listen to click on download event from extension icon
    console.log("TC-ext: tcPage.js - add 'downloadSeleniumTestsButton' listener");
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
        if (request.action == "downloadSeleniumTestsButton") {
            
            console.log("TC-ext: tcPage.js - downloading file...");
            
            var playlistText = buildTestPlaylist();

            var blob = new Blob([playlistText], {type: "text/plain;charset=utf-8"});
            saveAs(blob, getDate_YYYYMMDDHHMM() + ".playlist");

        }
    });

    // HELPERS -  MSG SENDERS
    var failedTestsExist = function(){
        // test if any tests failed
        var failCountString = $('span.failCount').text();
        var faildCountStrings = failCountString.split(" ");
        var failedSubString = 'failed'; // This is the text displayed in TC ie. 1 test failed.
        var failedTestsExist = _.includes(faildCountStrings, failedSubString);
        return failedTestsExist;
    }

    var getSolutionName = function(){
        var solutionFolderStr = $('#idfailedDl div.group-name.exp').text(); // selecting the solution name if any test failed
        solutionFolderStr = solutionFolderStr.replace(/\s/g,''); //http://stackoverflow.com/questions/6623231/remove-all-white-spaces-from-text
        solutionFolderStr = solutionFolderStr.replace(/:/g, '.');
        solutionFolderStr = solutionFolderStr.replace(/\(/g, '.');
        solutionFolderStr = solutionFolderStr.replace(/\)/g, '.');
        var nameList = solutionFolderStr.split('.');


        var solutionName = nameList[1];
        var folderName = nameList[2];
        
        var failCount = nameList[3];

        return solutionName + '.' + folderName;
    }

    console.log("TC-ext: tcPage.js - the test solution name is: " + getSolutionName());

    // MSG SENDERS
    if (failedTestsExist) {
        console.log("TC-ext: tcPage.js - send 'show' action");
        chrome.runtime.sendMessage({ action:"show" });
    }


});
