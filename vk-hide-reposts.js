// ==UserScript==
// @name            Remove all reposts from VK.com
// @version         0.1.20180330.0
// @description	    removes reposts from feed and walls by keywords
// @match           *://*.vk.com/*
// @grant           none
// @copyright       2018, iGolets
// @author          iGolets
// @namespace       vkap
// @run-at          document-idle
// ==/UserScript==

"use strict";

var actualCode = '(' + function() {
    'use strict';
    var selectors = [
        "div.post_copy"
    ];
    var divs;	// selected tags list

    function cleanReposts() {
        for (let s of selectors) {
            divs = document.querySelectorAll(s);
            for (let d of divs) {				// we check it from the very beginning and to the end
                d.parentNode.removeChild(d);
            }
        }
    }

    cleanReposts();
    // see http://stackoverflow.com/a/14570614
    var observeDOM = (function() {
        var MutationObserver = window.MutationObserver || window.WebKitMutationObserver,
            eventListenerSupported = window.addEventListener;

        return function(obj, callback) {
            if (MutationObserver) {
                // define a new observer
                var obs = new MutationObserver(function(mutations) {
                    if (mutations[0].addedNodes.length || mutations[0].removedNodes.length) {
                        callback();
                    }
                });
                // have the observer observe foo for changes in children
                obs.observe(obj, {childList: true, subtree: true});
            }
            else if (eventListenerSupported) {
                obj.addEventListener('DOMNodeInserted', callback, false);
                obj.addEventListener('DOMNodeRemoved', callback, false);
            }
        };
    })();
    var containers = document.querySelectorAll('body');
    for (let c of containers) {
        observeDOM(c, cleanReposts);
    }
} + ')();';
var script = document.createElement('script');
script.textContent = actualCode;
(document.body||document.documentElement).appendChild(script);