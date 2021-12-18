function openTab(url, index){
  chrome.tabs.create({
    index:index,
    url:url,
    selected:true
  });
}

chrome.contextMenus.create({
  "title" : "Youtube Opener",
  "type"  : "normal",
  "contexts" : ["link"],
  "documentUrlPatterns" : ["https://www.youtube.com/*"],
  "onclick" : function(info){
    var linkUrl = info.linkUrl;
    var url = new URL(linkUrl);
    var params = url.searchParams;

    // パラメータを動的に変更したい
    params.delete('list');
    params.delete('index');

    // promiseとかで変数tabを外だしして処理したい
    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
      var tab = tabs[0];
      openTab(url.href, tab.index+1)
    });
  }
});
