/*
	Name: jQuery lastTweet
	Description: A simple jquery script (in its earliest stages) that retrieves a users latest tweet(s)
	Version: 0.1
	Author: Maximilian Zimmer (@designlovr)
	Author Url: http://designlovr.tumblr.com
	Plugin Url: https://github.com/ximi/lastTweet
	License: MIT (http://mit-license.org/)
	Credits:
		-jQuery Plugin Boilerplate by Stefan Gabos: http://stefangabos.ro/jquery/jquery-plugin-boilerplate-revisited/
		-twitterjs by Remy Sharp: http://code.google.com/p/twitterjs/source/browse/tags/1.13.1/src/twitter.js
*/

/*
	Kickstarted by Stefan Gabos' jQuery Plugin Boilerplate
	http://stefangabos.ro/jquery/jquery-plugin-boilerplate-revisited/
*/

(function($) {
    $.lastTweet= function(element, options) {

        var defaults = {
        	count: 1,
			include_rts: true,
			exclude_replies: true,
			before_tweet: '<p>',
			after_tweet: '</p>',
			onInit: function() {
				$element.append('<p class="loading">Loading...</p>')
			},
			onError: function() {
				$element.append('<p class="error">An error occured while retrieving tweets</p>')
			},
			onSuccess: function() {
				
			},
			onComplete: function() {
				$element.find('.loading').remove();
			}
		};

        var plugin = this;

        plugin.settings = {};

        var $element = $(element),
             element = element;

        var init = function() {
            plugin.settings = $.extend({}, defaults, options);

			// make sure a username or id has been provided, otherwise throw an error
			if(plugin.settings.hasOwnProperty('user_id') || plugin.settings.hasOwnProperty('screen_name')) {
				
				// run the custom init function
				plugin.settings.onInit();
				
				// get the url
				var url = buildUrl();
				
				$.ajax({
					dataType: 'jsonp',
					url: url,
					success: function(data, textStatus, jqXHR) {
						
						var i = 0,
							data_length,
							tweets = '';
						
						// loop over the retrieved tweets
						for(i = 0, data_length = data.length; i < data_length; i++) {
							
							// makes links and usernames clickable
							var tweet = plugin.atify(plugin.wrapLinks(data[i].text));
							
							tweets += plugin.settings.before_tweet + tweet + plugin.settings.after_tweet;
						}
						
						$element.append(tweets);
						
						// custom success callback
						plugin.settings.onSuccess(data, textStatus, jqXHR);
					},
					error: function(jqXHR, textStatus, errorThrown) {
						
						// custom error callback
						plugin.settings.onError(jqXHR, textStatus, errorThrown);
					},
					complete: function(jqXHR, textStatus) {
						// custom complete callback
						plugin.settings.onComplete(jqXHR, textStatus);
					}
				});
			}
			else {
				$.error('No user id or screen name were provided');
			}
		};
		
		var buildUrl = function() {

			var base = 'http://api.twitter.com/1/statuses/user_timeline.json?',
				identifier;
				
			// add either the used id or screename as identifier to our url
			if(plugin.settings.hasOwnProperty('user_id')) {
				identifier = 'user_id=' + plugin.settings.user_id;
			}
			else {
				identifier = 'screen_name=' + plugin.settings.screen_name;
			}
			
			// combine all parameters and settings into an url string
			var url = base + identifier + '&trim_user=true&count=' + plugin.settings.count + '&include_rts=' + plugin.settings.include_rts + '&exclude_replies=' + plugin.settings.exclude_replies;

			return url;
		};
		
		/*
			wrapLinks and atify strongly inspired by Remy Sharps twitterjs: http://code.google.com/p/twitterjs/source/browse/tags/1.13.1/src/twitter.js
			public methods, just in case that someone has a use for them
		*/
	
		plugin.wrapLinks = function(string) {
			return string.replace(/[a-z]+:\/\/[a-z0-9-_]+\.[a-z0-9-_:~%&\?\/.=]+[^:\.,\)\s*$]/ig, function(match) {
				return '<a href="' + match + '">' + match + '</a>';
			});
		};
		
		plugin.atify = function(string) {
			return string.replace(/(^|[^\w]+)\@([a-zA-Z0-9_]{1,15})/g, function(match, match1, match2) {
				return match1 + '<a href="http://twitter.com/' + match2 + '">@' + match2 + '</a>';
			});
		};

        init();

    };

    $.fn.lastTweet = function(options) {
        return this.each(function() {
            if (undefined == $(this).data('lastTweet')) {
                var plugin = new $.lastTweet(this, options);
                $(this).data('lastTweet', plugin);
            }
        });
    };

})(jQuery);