// ==UserScript==
// @name         Block Twitter User
// @namespace    https://trevorsullivan.net
// @version      0.1
// @description  Blocks Twitter users efficiently, by automatically clicking the appropriate buttons.
// @author       Trevor Sullivan
// @include        https://twitter.com/*
// @include https://trevorsullivan.net
// ==/UserScript==

(function() {
    var BlockUserClicked = false;
    var BlockComplete = false;
    console.log("Welcome to Twitter Blocker");

    'use strict';
    MutationObserver;

    var observer = new MutationObserver(function(mutations, observer) {
        if (!BlockUserClicked) {
            var spanList = document.evaluate("//span[contains(., 'Block @')]", document);
            if (spanList != undefined && spanList != null) {
                var BlockUser = spanList.iterateNext();
                if (BlockUser) {
                    if (!BlockUserClicked) {
                        BlockUser.click();
                        console.log('Clicked Block @user');
                        BlockUserClicked = true;
                    }
                }
            }
        }
        if (BlockUserClicked) {
          var blockButton = document.evaluate("//span[text() = 'Block']").iterateNext();
          if (!BlockComplete) {
            blockButton.click();
            console.log('Block completed!');
            BlockComplete = true;
            setTimeout(() => {
                BlockComplete = false;
                BlockUserClicked = false;
                console.log('Reset completed');
            }, 1000);
          }
        }
    });

    observer.observe(document, {
        subtree: true,
        attributes: true
        //...
    });

})();
