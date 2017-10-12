/**
 * main script file
 * v0.1
 */

// init
$(document).ready(function(){
	// materialize ui starts
	$('ul.tabs').tabs();
	$('select').material_select();
	$('.tooltipped').tooltip();

	$('.modal').modal();

	$("#size-lock-button").hover(function() {
		// hover enter
		if(!$("#size-lock-icon").hasClass("fa-unlock"))
			$("#size-lock-icon").removeClass("fa-lock").addClass("fa-unlock-alt");
	}, function() {
		// hover leave
		if(!$("#size-lock-icon").hasClass("fa-unlock"))
			$("#size-lock-icon").removeClass("fa-unlock-alt").addClass("fa-lock");
	});
});

// key combo watchdog
$(document).keydown(function(event) {
	if(event.ctrlKey == true) {
		console.log("control keyed ");
		// all key bindings use control key, first

		switch(event.keyCode) {
			case 38: // up arrow
				loadImages();
				break;
			case 37: // left arrow
				if(!$("a[name='left-button']").hasClass("disabled"))
					imageSelect('left');
				break;
			case 39: // right arrow
				if(!$("a[name='right-button']").hasClass("disabled"))
					imageSelect('right');
				break;
			case 13: // enter
				$('#verification').modal('open');
				break;
		}
	};
});

// image height and width adjust

var imageHeightLocked = true, establishedLockHeight = 0;

$(document).ready(function() {
	establishedLockHeight = $("#image-previewer-parent-container").height();
});

/**
 * switchImageHeightLock()
 *
 * Toggles all the relevant elements to whether or not the image's
 * height should be locked to the height of the viewer box that it
 * is.
 *
 * If it is locked, the image will be as tall as possible, and
 * thereby as wide (within the aspect ratio) as it can be within the
 * viewer box.
 *
 * IF it is NOT locked, the image will only be as wide as possible,
 * and there by as tall (within the aspect ratio) as it can be
 * within the viewer box.
 */
function switchImageHeightLock() {
	if(imageHeightLocked) {
		$("#image-previewer").removeAttr("height");
		$("#image-previewer").attr("width", $("#image-previewer-container").width() + "px");

		imageHeightLocked = false;
		$("#size-lock-icon").removeClass("fa-lock fa-unlock-alt").addClass("fa-unlock");
		$("#size-lock-button").addClass("shift-lock-icon");
	} else {
		$("#image-previewer").removeAttr("width");
		$("#image-previewer").attr("height", establishedLockHeight + "px");

		imageHeightLocked = true;
		$("#size-lock-icon").removeClass("fa-unlock").addClass("fa-lock");
		$("#size-lock-button").removeClass("shift-lock-icon");
	}
}

var currentImage = 0, totalImages = 0, submittedImages = 0;

/**
 * updateCounters()
 *
 * Reflect the counters directly above this function onto the web 
 * page.
 */
function updateCounters() {
	$("#current-image").html(currentImage + 1);
	$("#total-images").html(totalImages);
	$("#submitted-images").html(submittedImages);
}

/**
 * indexExistsIn(array arr, int i)
 *
 * arr is an array [] containing at least one element.
 * i is index.
 *
 * returns true if an index, i, exists within array, arr.
 */
function indexExistsIn(arr, i) {
	if(i < arr.length && i >= 0)
		return true;
}

/**
 * showImage(int index)
 *
 * Put up an image in the viewer from imgs array at specific index.
 *
 * throws error if index below or beyond array elements.
 *
 * returns nothing.
 */
function showImage(index) {
	if(!indexExistsIn(imgs, index))
		throw "showImage(index): Index out of bounds error: " + index + ".";

	currentImage = index;

	$("#image-previewer").attr("src", "imgs/" + imgs[index]);
	$("#current-image").html(currentImage);

	updateCounters();
}

/**
 * imageSelect(string direction)
 *
 * Moves "left" or "right" (direction) by one image.
 *		  ^			^
 */
function imageSelect(direction) {
	var change = 0;

	if(direction == "left")
		change = -1;
	else if(direction == "right")
		change = 1;
	else
		throw "imageSelect(direction): Unknown cardinal horizontal direction '" + direction + "'";

	if(indexExistsIn(imgs, currentImage + change))
		showImage(currentImage + change);

	updateDirectionalButtons();
}

/**
 * updateDirectionalButtons()
 *
 * Updates the directional buttons for switching between images
 * appropriately.
 */
function updateDirectionalButtons() {
	// left button
	if(currentImage == 0)
		$("a[name='left-button']").addClass('disabled');
	else
		$("a[name='left-button']").removeClass('disabled');

	// right button
	if(currentImage == (totalImages - 1))
		$("a[name='right-button']").addClass('disabled');
	else
		$("a[name='right-button']").removeClass('disabled');
}

/**
 * loadCropPreview()
 *
 * Triggered by the "Crop and Submit" button.
 */
function loadCropPreview() {
	// load cropped image
	/*
	$("#crop-previewer").croppie({
		url: "imgs/" + imgs[currentImage],
		enableZoom: true,
		showZoomer: true
	});

	$("#crop-previewer").bind({
		url: "imgs/" + imgs[currentImage],
		points: [
			selectionPoints[0][0], selectionPoints[0][1],
			selectionPoints[1][0], selectionPoints[1][1]
		],
		orientation: 1
	});*/

	// display crop preview
	$("#view").css({
		"height": length + "px", 
		"width": length + "px",

		"background-image": "url('imgs/demo-1.jpg')",
		"background-repeat": "no-repeat",
		"background-attachment": "scroll", // fixed

		"background-size": ((imageW/extrude) * length) + "px " + ((imageH/extrude) * length) + "px",
		"background-position": "-" + topLeftX + "px -" + topLeftY + "px" // "0px 0px"
	});

	// load table data
	$("#preview-filename").html(imgs[currentImage]);
	$("#preview-x1").html(selectionPoints[0][0]);
	$("#preview-y1").html(selectionPoints[0][1]);
	$("#preview-x2").html(selectionPoints[1][0]);
	$("#preview-y2").html(selectionPoints[1][1]);
}

/**
 * submitCropPreview()
 *
 *
 */
function submitCropPreview() {

	$.ajax({

	});

}

// control panel code

/**
 * switchControlPanelRefresh()
 *
 * Enable or disable the automatic control panel refresh.
 */
function switchControlPanelRefresh() {
	if($("#switch-control-panel-icon").hasClass("fa-spin"))
		$("#switch-control-panel-icon").removeClass("fa-spin");
	else
		$("#switch-control-panel-icon").addClass("fa-spin");
}

/**
 * statusPush(String process, String cmd)
 *
 * Turn on or off a subprocess, either:
 *	- "interop-connection"
 *	- "sda"
 *	- "image-processing"
 *
 * 
 */
function statusPush(process, cmd) {
	toastDuration = 4000;

	// precondition: cmd valid
	if(cmd != "off" && cmd != "on")
		throw "statusChange(process, cmd ): Unknown String cmd '" + process + "'";

	var program = "", friendlyProgramName = "";
	switch(process) {
		case "interop-connection":
			program = "interop";
			friendlyProgramName = "Interop. script";

			break;
		case "sda":
			program = "sda";
			friendlyProgramName = "SDA script";

			break;
		case "image-processing":
			program = "img_proc";
			friendlyProgramName = "Image Processing script"
			
			break;
		default:
			// precondiiton: process requested valid
			throw "statusChange(process, cmd): Unknown String process '" + process + "'";
	}

	var urlCommand = "", shortCommand = "", command = "";

	if("off" == cmd) {
		// turn off
		urlCommand = "Disabled";
		shortCommand = "stop";
		command = "stopped"
	} else {
		// turn on
		urlCommand = "Enabled";
		shortCommand = "start";
		command = "started";
	}

	Materialize.toast('Sent ' + shortCommand.toUpperCase() + ' command to Interop. script.', toastDuration);

	$.ajax({
		url: "/post/" + program + "/" + urlCommand,
		method: "POST",
		timeout: 1000,

		dataType: "json",

		success: function(data) {
			// interop was enabled
			Materialize.toast(friendlyProgramName + ' was ' + command.toUpperCase() + '.', toastDuration);
			console.log(friendlyProgramName + 'successfully ' + command + ', see data: ');
			console.log(data);
		},

		error: function(data) {
			// server side error
			Materialize.toast('Failed to ' + shortCommand + ' ' + friendlyProgramName + '; See console.', toastDuration);
			console.log(friendlyProgramName + ' failed to be ' + command + ', see data: ');
			console.log(data);
		}
	});
}

// init code

var imgs = [], ias = null, selectionPoints = [];

/**
 * loadImages()
 *
 * Starter function that loads in all available images by
 * requesting the directory listing from a PHP/whatever script that
 * returns a JSON array of the directories contents (excluding sys
 * files and the script itself) in the following form:
 *
 * 	[
 *		0 => "demo-1.jpg"
 *		1 => "demo-2.jpg"
 *		n => ...
 * 	]
 *
 * throws nothing.
 *
 * returns nothing.
 */
function loadImages() {
	$.ajax({
		url: "imgs/get.php",
		
		success:function(data) {
			console.log("Images Loaded:");
			console.log(data);

			// parse available image info
			var length = Object.keys(data).length;
			totalImages = length;

			$("#total-images").html(length);

			for(var i = 0; i < length; i++)
				if($(imgs).index(Object.values(data)[i]) == -1)
					imgs.push(Object.values(data)[i])

			showImage(0); // presumed always present

			// initialize image area selector
			ias = $('#image-previewer').imgAreaSelect({ 
				aspectRatio: '1:1', 
				handles: true,

				onSelectEnd: function (img, selection) {
					$("a[name='remove-crop-button']").removeClass("disabled");
					$("a[name='crop-and-submit-button']").removeClass("disabled");

					//console.log("x1: " + selection.x1 + " , y1: " + selection.y1); 

					var s = selection;

					selectionPoints = [
						[s.x1, s.y1],
						[s.x2, s.y2]
					];
				}
			});

			$("#image-previewer").attr("height", $("#image-previewer-parent-container").height() + "px"); // this has to be second b/c imgAreaSelect resets the height attribute.

			updateDirectionalButtons();

			// indicate
			Materialize.toast('Images successfully loaded.', 2400);
		},

		error:function(data) {
			// indicate
			Materialize.toast('Failed to load images, check console.', 4000);

			console.log("Unknown connection error, see:");
			console.log(data);
		}
	});
}

