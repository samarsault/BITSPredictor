//
// Client
//

function param(object) {
    var encodedString = '';
    for (var prop in object) {
        if (object.hasOwnProperty(prop)) {
            if (encodedString.length > 0) {
                encodedString += '&';
            }
            encodedString += encodeURI(prop + '=' + object[prop]);
        }
    }
    return encodedString;
}

Vue.use(VueMaterial.default)

var app = new Vue({
    el: '#app',
    data: {
        branch: '',
        campus: '',
        mark: '',
        fbID: '',
        loggedIn: false
    },
    created: function () {
        var me = this;
        
        window.fbAsyncInit = function () {
            FB.init({
                appId: '457501208045253',
                xfbml: true,
                version: 'v2.7'
            });
            
            FB.getLoginStatus(function (resp) {
                if (resp.status == 'connected') {
                    me.fbID = resp.authResponse.userID;
                    me.loggedIn = true;
                }
            });
            
        };
        
        // load facebook sdk
        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) { return; }
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
        
    },
    methods: {
        submit: function () {
            var xhr = new XMLHttpRequest();
            var data = {
                'branch': this.branch,
                'mark': this.mark,
                'fbID': this.fbID,
                'campus': this.campus
            };

            xhr.open('POST', '/complete', true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.onreadystatechange = function (resp) {
                if (this.readyState == 4 && this.status == 200) {
                    var obj = JSON.parse(this.responseText);
                    if (obj.success) {
                        alert('Thank you for your contribution!')
                        window.location = '/';
                    }
                    else
                        alert('Some Error occured.');
                }
            }
            xhr.send(param(data));
        }
    }
});