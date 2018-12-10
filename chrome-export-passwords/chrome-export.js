/**
* Script ver 0.9
*
* Writing by Ruslan Kovalev : skidisaster@gmail.com
* Jun.10 2016
* output format changed for ready to use in FireFox Export plugin
* please install this plugin from https://addons.mozilla.org/en-Us/firefox/addon/password-exporter/
* changes:
* - modified to get it to work with any version of Chrome
* - use document.body.innerText instead of document.write to avoid HTML encoding issues
* - write tab separated TSV format to the console log
* - version based on Chrome api objects not on DOM.
*/

var out = "";
var out2 = "";
var pm = PasswordManager.getInstance();
var pl = pm.savedPasswordsList_;
var model = pl.dataModel;
var version = loadTimeData.data_.browserVersion;
var timelag = (model.length > 100) ? 15000 : 5000;
document.getElementById("saved-passwords-list").scrollTop = document.getElementById("saved-passwords-list").scrollHeight;
for (i = 0; i < model.length; i++) {
	chrome.send('requestShowPassword', [i]);
};
setTimeout(
		function() {
			out2 += '# Generated by Password Exporter; Export format 1.1; Encrypted: false\n';
			out2 += '"hostname","username","password","formSubmitURL","httpRealm","usernameField","passwordField"';
			for (i = 0; i < model.length; i++) {
				var item = pl.getListItemByIndex(i);
				var UrlOrigin = (version.substring(8, 10) >= 51 ) ? model.array_[i].url : model.array_[i].origin;
				out += "\n" + UrlOrigin
						+ "	" + model.array_[i].username
						+ "	" + item.childNodes[0].childNodes[2].childNodes[0].value;
				out2 += '\n"' + UrlOrigin + '","'
						+ model.array_[i].username + '","'
						+ item.childNodes[0].childNodes[2].childNodes[0].value.replace(/"/g, '""')
						+ '","' + UrlOrigin + '"," "," "," "';
			}
			console.log(out);
			document.body.innerText = out2;
		}, timelag);
