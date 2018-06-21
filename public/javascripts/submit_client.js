//
// Client
//
Vue.use(VueMaterial.default)

var app = new Vue({
    el: '#app',
    data: {
        branch: '',
        campus: '',
        mark: '',
        fbID: '',
        loggedIn: false,
        mod_link: '#',
        name: '',
        email: ''
    },
    created: function () {
        var me = this;
        
        window.fbAsyncInit = function () {
            FB.init({
                appId: '457501208045253',
                xfbml: true,
                version: 'v3.0'
            });
            
            FB.getLoginStatus(function (resp) {
                if (resp.status == 'connected') {
                    me.fbID = resp.authResponse.userID;
                    me.mod_link = '/moderator/' + me.fbID;
                    me.loggedIn = true;
                    FB.api('/me', { fields: 'name,email' }, function(resp) {
                        me.name = resp.name;
                        me.email = resp.email;
                    });
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
            var data = {
                'branch': this.branch,
                'mark': this.mark,
                'fbID': this.fbID,
                'campus': this.campus,
                'name': this.name,
                'email': this.email
            };

            ajax('/complete').post(data, (obj) => {
                if (obj.success) {
                    alert('Thank you for your contribution!')
                    window.location = '/';
                }
                else
                    alert('Some Error occured.');
            });
        }
    }
});