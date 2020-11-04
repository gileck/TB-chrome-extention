chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
    const {url} = tab
    const urlObj = new URL(url)
    console.log({
        protocol: urlObj.protocol,
        ssrDebug: urlObj.searchParams.get('ssrDebug')
    })
    if (urlObj.searchParams.get('ssrDebug') && urlObj.protocol === 'https:') {
        urlObj.href = urlObj.href.replace('https', 'http')
        chrome.tabs.update(tabId, {url: urlObj.href});
    }
})
