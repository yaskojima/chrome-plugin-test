window.onload = function() {
    addTabFormsToHTML();
}

const addTabFormsToHTML = function() {
    chrome.tabs.query( {active: false, lastFocusedWindow: true}, function (tabs) {
        const fragment = document.createDocumentFragment();
        const br = document.createElement("br");
        
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

    const favIcon = document.createElement("img");
    favIcon.setAttribute("src", tab.favIconUrl);
    favIcon.setAttribute("id", `favIcon${index}`);
    formElem.appendChild(favIcon);

    const tabName = document.createElement("div");
    tabName.textContent = tab.title;
    tabName.setAttribute("id", `tabName${index}`);
    formElem.appendChild(tabName);

    const tabNameLabel = document.createElement("label");
    tabNameLabel.textContent = "タブ名";
    tabNameLabel.htmlFor = `tabName${index}`;
    formElem.appendChild(tabNameLabel);

    appendTextInputWithlabel(`transparentRate${index}`, "透過率", formElem);
    appendTextInputWithlabel(`mapAbscissa${index}`, "表示位置（タテ）", formElem);
    appendTextInputWithlabel(`mapOrdinate${index}`, "表示位置（ヨコ）", formElem);
    appendTextInputWithlabel(`clippingStartAbscissa${index}`, "スタート x", formElem);
    appendTextInputWithlabel(`clippingStartOrdinate${index}`, "スタート y", formElem);
    appendTextInputWithlabel(`clippingEndAbscissa${index}`, "ゴール x", formElem);
    appendTextInputWithlabel(`clippingEndOrdinate${index}`, "ゴール y", formElem);

    fragment.appendChild(formElem);
}

const appendTextInputWithlabel = function(inputId, labelText, parentNode) {
    const textInputLabel = createTextInputLabel(inputId, labelText);
    const textInput = createTextInput(inputId);
    parentNode.appendChild(textInputLabel);
    parentNode.appendChild(textInput);
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