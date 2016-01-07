// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
var AuthenticationContext;
var authority = 'https://login.microsoftonline.com/common';
var clientID = '79820ab1-b7f1-451f-8897-196485a3a3d4';
var redirectURL = 'https://google.com.pk';
var resourceUrl = 'https://graph.windows.net/';
var organizationURL = "";
(function () {
    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener('pause', onPause.bind(this), false);
        document.addEventListener('resume', onResume.bind(this), false);
        AuthenticationContext = Microsoft.ADAL.AuthenticationContext;

        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
        document.getElementById('btn_submit').addEventListener('click', function (e) {
            organizationURL = document.getElementById('domain').value;
            AuthenticationContext.createAsync(authority).then(function (context) {
                context.acquireTokenAsync(organizationURL, clientID, redirectURL).then(function (authResult) {
                    document.getElementById('domain_form').style.display = 'none';
                    whoAmIRequest(authResult);
                })
            })
        })
    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };

    function whoAmIRequest(authResult) {
        var req = new XMLHttpRequest
        req.open("GET", encodeURI(organizationURL + "/api/data/v8.0/WhoAmI"), true);
        req.onreadystatechange = function () {
            if (req.readyState == 4 && req.status == 200) {
                var whoAmIResponse = JSON.parse(req.responseText);
                userInfoRequest(authResult, whoAmIResponse.UserId);
            }
        };
        req.setRequestHeader("OData-MaxVersion", "4.0");
        req.setRequestHeader("OData-Version", "4.0");
        req.setRequestHeader("Accept", "application/json");
        req.setRequestHeader("Authorization", "Bearer " + authResult.accessToken);
        req.send();
    };

    function userInfoRequest(authResult, userId) {
        var req = new XMLHttpRequest
        req.open("GET", encodeURI(organizationURL + "/api/data/v8.0/systemusers(" + userId + ")?$select=fullname"), true);
        req.onreadystatechange = function () {
            if (req.readyState == 4 && req.status == 200) {
                var userInfoResponse = JSON.parse(req.responseText);
                document.getElementById('name').innerHTML = '<h1>' + userInfoResponse.fullname + '</h1>';
            }
        };
        req.setRequestHeader("OData-MaxVersion", "4.0");
        req.setRequestHeader("OData-Version", "4.0");
        req.setRequestHeader("Accept", "application/json");
        req.setRequestHeader("Authorization", "Bearer " + authResult.accessToken);
        req.send();
    }
})();