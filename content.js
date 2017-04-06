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

function getDrawings() {
  var xhttp = new XMLHttpRequest);
  xhttp.open('get','http://www.sweepon.com/api/drawings',true);
  xhttp.send();
  response = JSON.parse(xhttp.response);
  return response['drawings'];
}

function getLink() {
  var drawings = getDrawings();
  return drawings[0]['url'];
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if( request.message === "paste_link" ) {
    var el = document.activeElement;
    var link = getLink();
    insertTextAtCursor(el, link);
  }
});
