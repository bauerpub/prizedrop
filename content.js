function insertTextAtCursor(el, text) {
  var val = el.value, endIndex, range;
  if (typeof el.selectionStart != "undefined" && typeof el.selectionEnd != "undefined") {
    endIndex = el.selectionEnd;
    el.value = val.slice(0, el.selectionStart) + text + val.slice(endIndex);
    el.selectionStart = el.selectionEnd = endIndex + text.length;
  } else if (typeof document.selection != "undefined" && typeof document.selection.createRange != "undefined") {
    el.focus();
    range = document.selection.createRange();
    range.collapse(false);
    range.text = text;
    range.select();
  }
}

function getDrawings(callback) {
  var xhttp = new XMLHttpRequest();
  xhttp.open('get','http://www.sweepon.com/api/drawings',true);
  xhttp.send();
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState === XMLHttpRequest.DONE) {
      const response = JSON.parse(xhttp.response)
      callback(response.drawings);
    }
  }
}

function getLink() {
  var drawings = getDrawings();
  return drawings[0].url;
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  switch(request) {
    case "paste_link":
      var el = document.activeElement;
      var link = getLink();
      insertTextAtCursor(el, link);
      break;
    case "getDrawings":
      console.log("getDrawings message received");

      getDrawings((drawings) => {
        sendResponse(drawings);
      });

      break;
  }

  return true;
});
