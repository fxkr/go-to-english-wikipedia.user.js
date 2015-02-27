// ==UserScript==
// @name           Go to English Wikipedia
// @description    Adds a link to the English version of a Wikipedia article when browsing another languages Wikipedia.
//                 Also responds to [Space] access key (Chrome: [Alt]+[Space], Firefox: [Alt]+[Shift]+[Space], Mac: [Ctrl]+[Alt]+[Space]).
// @include        https://*.wikipedia.org/wiki/*
// @exclude        https://en.wikipedia.org/*
// @include        http://*.wikipedia.org/wiki/*
// @exclude        http://en.wikipedia.org/*
// @version        1.0
// @downloadURL    https://raw.githubusercontent.com/fxkr/go-to-english-wikipedia.user.js/master/go-to-english-wikipedia.user.js
// @run-at         document-end
// ==/UserScript==

(function() {

  function addGlobalStyle(css) {
      var head, style;
      head = document.getElementsByTagName('head')[0];
      if (!head) return;
      style = document.createElement('style');
      style.type = 'text/css';
      style.innerHTML = css;
      head.appendChild(style);
  }

  var plang = document.getElementById("p-lang");
  if (plang === null) return;
  var link = plang.querySelector('li.interlanguage-link a[lang="en"]');
  if (link === null) return;
  var body = document.querySelector('body');
  if (body == null) return

  addGlobalStyle('a#go-to-english-wikipedia { ' +
    'position: absolute ! important;' +
    'left: 0px ! important;' +
    'top: 0px ! important;' +
    'z-index: 9001;' +
    'padding: 1em;' +
    'background-color: rgba(255, 255, 255, 0.8);' +
    'font-weight: bold;' +
  '}');

  var englishTitle = link.getAttribute("title");
  var delimPos = englishTitle.indexOf(" – ");
  if (delimPos > 0) englishTitle = englishTitle.substring(0, delimPos);
  var newTitle = "en.wikipedia.org: " + englishTitle;

  var newLink = document.createElement('a');
  newLink.setAttribute("id", "go-to-english-wikipedia");
  newLink.setAttribute("href", link.getAttribute("href"));
  newLink.setAttribute("accesskey", " ");
  newLink.setAttribute("title", newTitle);
  newLink.appendChild(document.createTextNode("↳ " + newTitle));
  body.appendChild(newLink);
})();

