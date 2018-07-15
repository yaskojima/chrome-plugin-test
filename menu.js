window.onload = function() {
    createTabInfoBoxex();
    displayTabUrl();
}

var createTabInfoBoxex = function() {
    chrome.tabs.query( {active: false, lastFocusedWindow: true}, function (inactiveTabs) {
        var tabInfoForm = document.forms.tabInfoForm;
        for (var tab of inactiveTabs) {
            var inputElem = document.createElement("input");
            inputElem.type = "text";
            inputElem.id = `tab${tab.index}`;
            tabInfoForm.appendChild(inputElem);
        }
    })
}

var displayTabUrl = function() {
    chrome.tabs.query( {active: false, lastFocusedWindow: true}, function (tabs) {
        // TODO：iteratorのtagsに動的に代入
        document.tabInfoForm.url0.value = tabs[0].url;
        document.tabInfoForm.url1.value = tabs[1].url;
        document.tabInfoForm.url2.value = tabs[2].url;
        document.tabInfoForm.url3.value = tabs[3].url;
        document.tabInfoForm.url4.value = tabs[4].url;
        document.tabInfoForm.url5.value = tabs[5].url;
    })
}