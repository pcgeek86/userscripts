// ==UserScript==
// @name         Unfollow Twitter User
// @namespace    https://trevorsullivan.net
// @version      0.1
// @description  Unfollows all Twitter users
// @author       You
// @match        https://twitter.com/*/following
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function clickUnfollow() {
        console.log('Clicking modal unfollow button ...');
        var unfollowBtn = document.evaluate("//span/span[text() = 'Unfollow']").iterateNext();
        unfollowBtn.click();
    }

    function Unfollow() {
        console.log('Unfollow started ...');
        var unfollowButton = document.evaluate("//span/span[text() = 'Following']").iterateNext();
        console.log(unfollowButton);
        if (unfollowButton) {
            console.log('Clicking unfollow button ...');
            unfollowButton.hidden = true;
            unfollowButton.click();
            setTimeout(clickUnfollow, 20);
        }
        setTimeout(Unfollow, 50);
    }

    setTimeout(Unfollow, 500);
})();
