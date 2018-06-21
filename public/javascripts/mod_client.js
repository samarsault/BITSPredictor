//
// Client
//


Vue.use(VueMaterial.default);

var app = new Vue({
    el: '#app',
    data: {
        fbID: '',
        loggedIn: false,
        rows: [],
        selected: []
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
                    ajax('/getmod').post({
                        fb_id: me.fbID
                    }, function(obj) {
                        if (obj.success) {
                            me.rows = obj.data
                        }
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
        onSelect: function(items) {
            this.selected = items
        },
        getAlternateLabel: function(count) {
            var plural = ''

            if (count > 1) {
                plural = 's'
            }

            return `${count} entries${plural} selected`
        },
        delEntries: function() {
            var lst = [], me = this;

            for (var i = 0;i < this.selected.length;i++)
                lst.push(this.selected[i]);

            ajax('/delmod').post({
                fb_id: me.fbID, // authorization
                list: lst.toString()
            }, function(resp) {
                 if (resp.success) {
                     
                    me.rows = me.rows.filter(function (obj) {
                        return lst.indexOf(obj.fb_id) == -1;
                    });

                } else {
                    alert('Unknown Error Occured')
                }
            });
        }
    }
});