var apiEndpoint = 'http://vimeo.com/api/v2/';
		var oEmbedEndpoint = 'http://vimeo.com/api/oembed.json'
		var oEmbedCallback = 'switchVideo';
		var videosCallback = 'setupGallery';
		var vimeoUsername = 'user2840023';

		// Get the user's videos
		$(document).ready(function() {
			$.getScript(apiEndpoint + vimeoUsername + '/videos.json?callback=' + videosCallback);
		});

		//$.getScript(oEmbedEndpoint + '?url=' + url + '&width=504&height=280&callback=' + oEmbedCallback);
		function getVideo(url) {
			$.getScript(oEmbedEndpoint + '?url=' + url + '&maxwidth&maxheight&callback=' + oEmbedCallback);
		}

		function setupGallery(videos) {

			// Set the user's thumbnail and the page title
			$('#stats').prepend('<img id="portrait" src="' + videos[0].user_portrait_medium + '" />');
			$('#stats h2').text(videos[0].user_name + "'s Videos");

			// Load the first video
			getVideo(videos[0].url);

			// Add the videos to the gallery
			for (var i = 0; i < videos.length; i++) {
				var html = '<figure class="mes-videos"><a href="' + videos[i].url + '"><img src="' + videos[i].thumbnail_medium + '" class="" />';
				html += '<figcaption class="mes-legs">' + videos[i].title + '</figcaption></a></figure>';
				$('#thumbs article').append(html);
			}

			// Switch to the video when a thumbnail is clicked
			$('#thumbs a').click(function(event) {
				event.preventDefault();
				getVideo(this.href);
				return false;
			});

		}

		function switchVideo(video) {
			$('#embed').html(unescape(video.html));
		}
