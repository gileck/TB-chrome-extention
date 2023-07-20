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

function openPerformanceToolInternal() {
    var th = document.getElementsByTagName('body')[0];
    var s = document.createElement('script');
    s.setAttribute('type', 'text/javascript');
    s.setAttribute('src', chrome.extension.getURL('/js/inject.js'));
    th.appendChild(s);
}

const handlers = {
    teamCityLogin,
    jiraLogin,
    openPerformanceTool: openPerformanceToolInternal
}


chrome.runtime.onMessage.addListener(function({type, params}, sender, sendResponse) {
    if (handlers[type]) {
        handlers[type](params, sender, sendResponse)
    }
});