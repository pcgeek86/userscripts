// ==UserScript==
// @name         Remove All Tweets
// @namespace    https://trevorsullivan.net
// @version      0.1
// @description  Deletes all tweets and un-retweets 
// @author       Trevor Sullivan <trevor@trevorsullivan.net>
// @match        https://twitter.com/*/media
// @match        https://twitter.com/search*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function ProcessArticle() {
        // Either delete it or un-retweet it

    }

    function ClickUndoRetweet() {
        var undo = document.evaluate("//span[text()='Undo Retweet']", document).iterateNext();
        undo.click();
    }

    function ClickDeleteTweet() {
        var deleteMenu = document.evaluate("//span[text()='Delete']", document).iterateNext();
        deleteMenu.click();
    }

    function ProcessStandardArticle(article) {
        console.log('Processing standard article');
        var svgList = article.getElementsByTagName('svg');

        for (var svg of svgList) {
            if (svg.innerHTML.match('M19\.39')) {
                svg.parentElement.click();
                setTimeout(ClickDeleteTweet, 50);
                setTimeout(ClickDeleteTweet, 50);
            }
        }
    }

    function ProcessRetweetedArticle(article) {
        var svgList = article.getElementsByTagName('svg');
        console.log(`Found ${svgList.length} SVG elements`);

        var last = false;
        for (var svg of svgList) {
            if (svg.innerHTML.match('M23\.615') && last) {
                console.log(svg);
                svg.parentElement.click();
                setTimeout(ClickUndoRetweet, 100);
            }
            else {
                last = true;
            }
            //console.dir(svg);
            //console.log(svg.textContent);
        }
    }

    function GetNextArticle() {
        console.log('Retrieving article');
        var article = document.evaluate("//article", document).iterateNext();

        if (!article) {
            setTimeout(GetNextArticle, 50);
            return;
        }

        if (article.innerHTML.match('\>You Retweeted\<')) {
            //console.log(window.location);
            if (window.location.href.match('with_replies$')) {
                console.log('Cannot process retweets on the replies page');
                article.outerHTML = '';
            }
            else {
                console.log('You retweeted this');
                ProcessRetweetedArticle(article);
            }
        }
        else {
            console.log('Article is not retweeted');
            ProcessStandardArticle(article);
        }

        //console.log(article);

        setTimeout(GetNextArticle, 50);
        return article;
    }

    GetNextArticle();
})();
