$(document).ready(function(){
	$('#small-nav').slicknav({
		label: ""
	});
});
$(document).mouseup(function(event){
	var searchDropdown = $('#search-recommendations');
	var search = $('#nav-search');
	if(!searchDropdown.is(event.target) && !search.is(event.target) && search.has(event.target).length === 0 && searchDropdown.has(event.target).length === 0){
		$('.search-dropdown').css('display', 'none');
	}
});

function callLogout() {
	angular.element(document.getElementById('nav')).scope().logout();
}
