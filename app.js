var multiselects = {};
var instrumenten = [];

var filter = function(instrument) {
	return true;
};
var renderList = function() {
	for (var instrument in instrumenten.filter(filter)) {
		
	}
};
var onSelectionChanged = function(sender) {
	renderList();	
}

document.addEventListener('DOMContentLoaded', function() {
	var m = new multiselect("leeftijdsgroepen", "Leeftijdsgroepen", 
		"Kies een leeftijdsgroep");
	multiselects[m.id] = m;
	m.addOption("04000401", "4;0-4;1");
	m.addOption("04020406", "4;2-4;6");
	m.addOption("04070409", "4;7-4;9");
	m.addChangeHandler(renderList);
	m.render();
	
	var m = new multiselect("aspecten", "Aspecten", "Kies een aspect");
	multiselects[m.id] = m;
	m.addOption("A1", "A1 Spraakproductie");
	m.addOption("A2", "A2 Auditieve verwerking");
	m.addOption("A3", "A3 Grammaticaal-linguistische kennis");
	m.addOption("A4", "A4 Lexicaal-semantische kennis");
	m.addOption("A5", "A5 Pragmatiek");
	m.addChangeHandler(renderList);
	m.render();
});