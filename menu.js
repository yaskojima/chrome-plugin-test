window.onload = function() {
    chrome.tabs.query( {active: false, lastFocusedWindow: true}, function (tabs) {
        document.form1.url0.value = tabs[0].url;
        document.form1.url1.value = tabs[1].url;
        document.form1.url2.value = tabs[2].url;
        document.form1.url3.value = tabs[3].url;
        document.form1.url4.value = tabs[4].url;
        document.form1.url5.value = tabs[5].url;
    });
}
