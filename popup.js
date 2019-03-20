$(document).ready(function () {

	// when a checkbox is selected make its label red and bold
	$("input[name='sectionsToBlock']").change(function() {
		if(this.checked) {
			$("label[for=" + this.id + "]").addClass('text-danger font-weight-bold');
		}
		if(!this.checked) {
			$("label[for=" + this.id + "]").removeClass('text-danger font-weight-bold');
		}
	});


	// chrome.runtime.onInstalled.addListener(function () {
	// 	if(details.reason == "install"){
	// 	alert('installed !')
	// 	chrome.storage.sync.set({ "blockList": ['marketplace'] }, function () {
	// 	});
	// 	}
	// });


	// get the initial STORED values to show blocked as checked
	chrome.storage.sync.get(["blockList"], function (items) {
		$.each(items.blockList, function (i, item) {
			var itemSelected = $('#' + item);
			itemSelected.prop('checked', true);
			$("label[for=" + itemSelected.prop('id') + "]").addClass('text-danger font-weight-bold');
		});
	});


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

		chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
			chrome.tabs.sendMessage(tabs[0].id, { content: blockList, type: 'blockMessage' }, function () {
			});
			chrome.tabs.sendMessage(tabs[0].id, { content: allowList, type: 'allowMessage' }, function () {
			});

		});

		chrome.storage.sync.set({ "blockList": blockList, "allowList": allowList }, function () {
		});

	});



});
