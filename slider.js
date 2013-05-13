$(function() {
	var sliderUL = $('div.slider').css('overflow', 'hidden').children('ul'),
		images = sliderUL.find('img'),
		imageWidth = images[0].width, // Width of one image
		numImages = images.length, // Check number of images, not length of images
		currentImage = 1, 
		totalImagesWidth = imageWidth * numImages;

	$('.slider-nav').show().find('button').on('click', function() {
		var buttonDirection = $(this).data('direction'),
			location = imageWidth;

		// Check whether next or previous button was clicked and update current image accordingly
		( buttonDirection == 'next' ) ? ++currentImage : --currentImage;

		// If first image, redirect to the last image
		if ( currentImage === 0 ) {
			currentImage = numImages;
			location = totalImagesWidth - imageWidth; // Need to account for length of displayed image
			buttonDirection = 'next';
		} else if ( currentImage - 1 === numImages ) {  // Reset to the beginning
			currentImage = 1;
			location = 0;
		}

		transition(sliderUL, location, buttonDirection);
	});

	function transition( container, location, buttonDirection ) {
		var unit; // Either -= or +=, depending on direction

		if ( buttonDirection && location !== 0 ) {
			unit = ( buttonDirection === 'next' ) ? '-=' : '+=';
 		}

		container.animate({
			'margin-left': unit ? (unit + location) : location  // If there is a unit value, += or -= location; otherwise, reset to beginning
		});
	}

})();