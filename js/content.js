function teamCityLogic(params, sender, sendResponse) {
    const clickLoginButton = () => {
        document.querySelectorAll('[name="submitLogin"]')[1].click()
        sendResponse()
    }
    try {
        clickLoginButton()
    } catch (e) {
        setTimeout(clickLoginButton, 2000)
    }
}

const handlers = {
    teamCityLogic
}


chrome.runtime.onMessage.addListener(function({type, params}, sender, sendResponse) {
    if (handlers[type]) {
        handlers[type](params, sender, sendResponse)
    }
});