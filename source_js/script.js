$(document).ready(function(){
	$('#small-nav').slicknav({
		label: ""
	});

	$('.carousel').slick({
		dots: true,
		infinite: true,
		speed: 300,
		slidesToShow: 1,
		arrows: true
	});
	
});

$(document).mouseup(function(event){
	var searchDropdown = $('#search-recommendations');
	var search = $('#nav-search');
	if(!searchDropdown.is(event.target) && !search.is(event.target) && search.has(event.target).length === 0 && searchDropdown.has(event.target).length === 0){
		$('.search-dropdown').css('display', 'none');
	}
});
