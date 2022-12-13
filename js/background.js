let prevUrl
let teamCityUrl
const teamCityLoginPage = "http://pullrequest-tc.dev.wixpress.com/login.html"
const teamCityPRUrlPrefix = "http://pullrequest-tc.dev.wixpress.com"
chrome.tabs.onCreated.addListener(function (tab) {
    const {pendingUrl} = tab
    if (pendingUrl && pendingUrl.includes(teamCityPRUrlPrefix) && pendingUrl !== teamCityLoginPage) {
        teamCityUrl = pendingUrl
    }

})
chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
    const {url} = tab

    // http://pullrequest-tc.dev.wixpress.com/login.html
    // http://pullrequest-tc.dev.wixpress.com/overview

    if (url === "http://tc.dev.wixpress.com/login.html" || url === teamCityLoginPage) {
        if (prevUrl !== 'http://tc.dev.wixpress.com/login.html' || prevUrl !== teamCityLoginPage) {
            teamCityUrl = prevUrl
        }
        chrome.tabs.sendMessage(tabId, {type: 'teamCityLogin'});
    }
    const urlObj = new URL(url)
    if (urlObj.searchParams.get('ssrDebug') && urlObj.protocol === 'https:') {
        urlObj.href = urlObj.href.replace('https', 'http')
        chrome.tabs.update(tabId, {url: urlObj.href});
    }
    prevUrl = url

    if (url.includes('jira.wixpress.com/plugins/servlet/samlsso')) {
            chrome.tabs.sendMessage(tabId, {type: 'jiraLogin'});
    }

    if (url.includes('performanceTool=true')) {
        chrome.tabs.sendMessage(tabId, {type: 'openPerformanceTool'});
    }
})

