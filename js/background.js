let prevUrl
let teamCityUrl
chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
    const {url} = tab
    // console.log({url})
    if (url.includes('http://tc.dev.wixpress.com/?state=')) {
        chrome.tabs.update(tabId, {url: teamCityUrl});
    }
    if (url === "http://tc.dev.wixpress.com/login.html") {
        if (prevUrl !== 'http://tc.dev.wixpress.com/login.html') {
            teamCityUrl = prevUrl
        }
        chrome.tabs.sendMessage(tabId, {type: 'teamCityLogic'});
    }
    const urlObj = new URL(url)
    if (urlObj.searchParams.get('ssrDebug') && urlObj.protocol === 'https:') {
        urlObj.href = urlObj.href.replace('https', 'http')
        chrome.tabs.update(tabId, {url: urlObj.href});
    }
    prevUrl = url

    if (url === 'https://jira.wixpress.com/plugins/servlet/samlsso') {
        Array.from(document.querySelectorAll('a')).filter(n => n.innerText === 'Sign in with your Wix mail - Google')[0].click()
    }

})
