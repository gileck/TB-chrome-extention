function teamCityLogin(params, sender, sendResponse) {
    const clickLoginButton = () => {
        document.querySelectorAll('[name="submitLogin"]')[1].click()
    }
    try {
        clickLoginButton()
    } catch (e) {
        setTimeout(clickLoginButton, 2000)
    }
}

function jiraLogin() {
    Array.from(document.querySelectorAll('a')).filter(n => n.innerText === 'Sign in with your Wix mail - Google')[0].click()
}

const handlers = {
    teamCityLogin,
    jiraLogin
}


chrome.runtime.onMessage.addListener(function({type, params}, sender, sendResponse) {
    if (handlers[type]) {
        handlers[type](params, sender, sendResponse)
    }
});