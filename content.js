$(document).ready(function () {

	// the section name and its corresponding id (or part of its id)
	var optionsIDsDictionary = { "marketplace": 'marketplace', "games": 'game', "stories": 'stories', "eventsReminder": 'reminders', "peopleRequestsOrYouMayKnow": 'pagelet_ego' };
	var arrayOfOptions = [];


	function hideSections(arrayOfOptions) {
		jQuery.each(arrayOfOptions, function (i, val) {
			var correspondingIdWord = optionsIDsDictionary[val];
			$("div[id*='" + correspondingIdWord + "']").hide(600);
			// console.log('I hid: ' + arrayOfOptions[i] + '   with id word: ' + correspondingIdWord);
		});
	}

	function showSections(arrayOfOptions) {
		jQuery.each(arrayOfOptions, function (i, val) {
			var correspondingIdWord = optionsIDsDictionary[val];
			$("div[id*='" + correspondingIdWord + "']").show(600);
			// console.log('I showed: ' + arrayOfOptions[i] + '   with id word: ' + correspondingIdWord);
		});
	}

	// getting the names of checked checkboxes FROM STORAGE (as initial values) to hide them
	chrome.storage.sync.get(["blockList"], function (items) {
		hideSections(items.blockList);
	});


	// listen for submit button to get the names of checkboxes FROM POPUP, show allowed and hide the blocked
	chrome.runtime.onMessage.addListener(
		function (message) {
			if (message.type === 'blockMessage') {
				arrayOfOptions = message.content;
				hideSections(arrayOfOptions);
			}

			if(message.type === 'allowMessage'){
				arrayOfOptions = message.content;
				showSections(arrayOfOptions);
			}

		}
	);

});