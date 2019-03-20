$(document).ready(function () {

	// when a checkbox is selected make its label red and bold (and vice versa)
	$("input[name='sectionsToBlock']").change(function() {
		if(this.checked) {
			$("label[for=" + this.id + "]").addClass('text-danger font-weight-bold');
		}
		if(!this.checked) {
			$("label[for=" + this.id + "]").removeClass('text-danger font-weight-bold');
		}
	});


	// get the initial STORED values to show blocked sections as checked boxes (with red bold labels)
	chrome.storage.sync.get(["blockList"], function (items) {
		$.each(items.blockList, function (i, item) {
			var itemSelected = $('#' + item);
			itemSelected.prop('checked', true);
			$("label[for=" + itemSelected.prop('id') + "]").addClass('text-danger font-weight-bold');
		});
	});

	// on submit button click, store checked boxes in blockList, store non-checked ones in allowList
	$('#submitButton').click(function () {
		var blockList = [];
		var allowList = [];
		$.each($("input[name='sectionsToBlock']"), function () {
			if ($(this).is(':checked')) {
				blockList.push($(this).val());
			}
			else {
				allowList.push($(this).val());
			}
		});

		// send messages to the content.js file
		chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
			chrome.tabs.sendMessage(tabs[0].id, { content: blockList, type: 'blockMessage' }, function () {
			});
			chrome.tabs.sendMessage(tabs[0].id, { content: allowList, type: 'allowMessage' }, function () {
			});

		});

		// save the checked boxes (sections to be blocked) in STORAGE
		chrome.storage.sync.set({ "blockList": blockList}, function () {
		});

	});



});
