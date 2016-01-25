var multiselects = {};

document.addEventListener('DOMContentLoaded', function() {
	var m = new multiselect("test1", "Test #1", "Selecteer een optie");
	multiselects[m.id] = m;
	m.addOption("een", "optie #1");
	m.addOption("twee", "optie #2");
	m.render();
	
	var m = new multiselect("test2", "Test #2", "Selecteer nog een optie");
	multiselects[m.id] = m;
	m.addOption("drie", "optie #3");
	m.addOption("vier", "optie #4");
	m.render();
});