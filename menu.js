window.onload = function() {
    addTabFormsToHTML();
}

const addTabFormsToHTML = function() {
    chrome.tabs.query( {active: false, lastFocusedWindow: true}, function (tabs) {
        const fragment = document.createDocumentFragment();
        
        for (const [index, tab] of tabs.entries()) {
            createTabForm(index, tab, fragment);
        }

        document.getElementById("main").appendChild(fragment);
    })
}

const createTabForm = function(index, tab, fragment) {
    // HACK: 冗長なDOM生成
    const formElem = document.createElement("form");
    formElem.setAttribute("name", `tab${index}`);
    formElem.setAttribute("id", `formElem${index}`);
    formElem.setAttribute("style", "width:200px;");

    const tabInfo = document.createElement("div");
    tabInfo.setAttribute("style", "width:1100px;");

    const favIcon = document.createElement("img");
    favIcon.setAttribute("src", tab.favIconUrl);
    favIcon.setAttribute("id", `favIcon${index}`);
    favIcon.setAttribute("width", 16);
    favIcon.setAttribute("height", 16);
    tabInfo.appendChild(favIcon);

    const tabNameLabel = document.createElement("span");
    tabNameLabel.textContent = "：";
    tabNameLabel.htmlFor = `tabName${index}`;
    tabInfo.appendChild(tabNameLabel);

    const tabName = document.createElement("span");
    tabName.textContent = tab.title;
    tabName.setAttribute("id", `tabName${index}`);
    tabName.setAttribute("style", "width:1000px;height:16px;")
    tabInfo.appendChild(tabName);

    formElem.appendChild(tabInfo);

    appendTextInputWithlabel(`transparentRate${index}`, "透過率　　　　：", formElem);
    appendTextInputWithlabel(`mapAbscissa${index}`, "表示位置（縦）：", formElem);
    appendTextInputWithlabel(`mapOrdinate${index}`, "表示位置（横）：", formElem);
    appendTextInputWithlabel(`clippingStartAbscissa${index}`, "スタート（縦）：", formElem);
    appendTextInputWithlabel(`clippingStartOrdinate${index}`, "スタート（横）：", formElem);
    appendTextInputWithlabel(`clippingEndAbscissa${index}`, "ゴール（縦）　：", formElem);
    appendTextInputWithlabel(`clippingEndOrdinate${index}`, "ゴール（横）　：", formElem);

    fragment.appendChild(formElem);
}

const appendTextInputWithlabel = function(inputId, labelText, parentNode) {
    const textInputLabel = createTextInputLabel(inputId, labelText);
    const textInput = createTextInput(inputId);
    textInput.setAttribute("style", "width:50px;");

    parentNode.appendChild(textInputLabel);
    parentNode.appendChild(textInput);
    parentNode.appendChild(document.createElement("br"));
}

const createTextInput = function(inputId) {
    const textInput = document.createElement("input");
    textInput.setAttribute("id", inputId);
    return textInput;
}

const createTextInputLabel = function(inputId, labelText) {
    const textInputLabel = document.createElement("label");
    textInputLabel.textContent = labelText;
    textInputLabel.htmlFor = inputId;
    return textInputLabel;
}