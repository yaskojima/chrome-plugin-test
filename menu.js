window.onload = function() {
    createTabInfoBoxex();
}

var createTabInfoBoxex = function() {
    chrome.tabs.query( {active: false, lastFocusedWindow: true}, function (inactiveTabs) {
        var tabInfoForm = document.forms.tabInfoForm;
        for (var [index, tab] of inactiveTabs.entries()) {
            var inputElem = document.createElement("input");
            inputElem.type = "text";
            inputElem.id = `tab${index}`;
            tabInfoForm.appendChild(inputElem);
            displayTabUrl(inputElem, tab);
        }
    })
}

var displayTabUrl = function(targetElem, tab) {
    targetElem.value = tab.url;
}