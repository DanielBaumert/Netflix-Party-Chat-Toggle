// ==UserScript==
// @name         Netflix Chat Tog
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Toggle the chat from netflix party for a pretty view
// @author       Daniel Baumert
// @match        https://www.netflix.com/watch/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const enabledSvg = "<g transform=\"matrix(1.42649,0,0,1.64595,-3.29215,-14.8249)\"><text x=\"1.757px\" y=\"21.079px\" style=\"font-family:'Arial-Black', 'Arial', sans-serif;font-weight:900;font-size:12px;fill:rgb(255,0,0);\">NP</text></g>";
    const disabledSvg = "<g transform=\"matrix(1.42649,0,0,1.64595,-3.29215,-14.8249)\"><text x=\"1.757px\" y=\"21.079px\" style=\"font-family:'Arial-Black', 'Arial', sans-serif;font-weight:900;font-size:12px;fill:rgb(64,64,64);\">NP</text></g>";

    const btnChatTgl = document.createElement("div");
    btnChatTgl.className = "touchable PlayerControls--control-element nfp-popup-control";

    const btnChatTglBtn = document.createElement("buttton");
    btnChatTglBtn.className = "touchable PlayerControls--control-element nfp-button-control default-control-button button-nfplayerReportAProblem";
    btnChatTglBtn.setAttribute("tabindex", "0");
    btnChatTglBtn.setAttribute("role", "button");
    btnChatTglBtn.setAttribute("aria-label", "Toggle the netflix party chat");

    const btnChatTgSvg = document.createElement("svg");
    btnChatTgSvg.className = "svg-icon";
    btnChatTgSvg.setAttribute("focusable", "false");
    btnChatTgSvg.innerHTML = enabledSvg;

    const btnChatSub = document.createElement("div");
    btnChatSub.className = "touchable popup-content-wrapper keep-right";

    btnChatTglBtn.appendChild(btnChatTgSvg);
    btnChatTgl.appendChild(btnChatTglBtn);
    btnChatTgl.appendChild(btnChatSub);

    btnChatTgl.addEventListener("click", () => {

        var video = document.getElementsByClassName("sizing-wrapper with-chat")[0];
        var chat = document.getElementById("chat-wrapper");
        var chatStyle = chat.style.visibility;

        if(chatStyle === "hidden"){
            chat.style.visibility = "visible";
            btnChatTgSvg.innerHTML = enabledSvg;
            video.style.position = "absolute";
        } else {
            chat.style.visibility = "hidden";
            btnChatTgSvg.innerHTML = disabledSvg;
            video.style.position = "unset";
        }

    });

    var ctrWaiter = setInterval(frame, 100);

    function frame() {
        var ctr = document.getElementsByClassName("PlayerControlsNeo__button-control-row")[0];

        if(ctr !== undefined){
            var ctrIssuBtn = document.getElementsByClassName("touchable ReportAProblemPopupContainer PlayerControls--control-element nfp-popup-control")[0];
            ctr.insertBefore(btnChatTgl, ctrIssuBtn);
            clearInterval(ctrWaiter);
        }
    }
})();
