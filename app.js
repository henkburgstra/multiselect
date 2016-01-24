var multiselects = {};

document.addEventListener('DOMContentLoaded', function() {
	var m = new multiselect("test1");
	multiselects[m.id] = m;
	m.addOption("een", "optie #1");
	m.addOption("twee", "optie #2");
	m.render();
	
	var m = new multiselect("test2");
	multiselects[m.id] = m;
	m.addOption("drie", "optie #3");
	m.addOption("vier", "optie #4");
	m.render();
});