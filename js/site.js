$(function(){
	var hasCode = false;
	$('pre code').parent().each(function(){
		if ($(this).hasClass('prettyprint')) return;
		$(this).addClass('prettyprint');
		hasCode = true;
	});
	!hasCode || prettyPrint();
});