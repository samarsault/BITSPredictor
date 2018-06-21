//
// Minimal Ajax Helper
//
function ajax(url) {

    function param(obj) {
        var encodedString = '';
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                if (encodedString.length > 0) {
                    encodedString += '&';
                }
                encodedString += encodeURI(prop + '=' + obj[prop]);
            }
        }
        return encodedString;
    }
    var xhr = new XMLHttpRequest();

    return {
        post: function (data, finish, err) {
            xhr.open('POST', url, true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.onreadystatechange = function (resp) {
                if (this.readyState == 4 && this.status == 200) {
                    finish(JSON.parse(this.responseText));
                } else {
                    err();
                }
            }
            xhr.send(param(data));
        }
    }
}