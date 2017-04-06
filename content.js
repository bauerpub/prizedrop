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



chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if( request.message === "paste_link" ) {
    var el = document.activeElement;
    insertTextAtCursor(el,"http://www.sweepon.com/sweepstakes/one-million-dollar-giveaway-13779");
  }
}
                                    );
