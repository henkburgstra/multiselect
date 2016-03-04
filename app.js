var multiselects = {};
var instrumenten = [];

var filter = function(instrument) {
    // filter op leeftijden
    var voldoet = false;
    var leeftijden = multiselects.leeftijdsgroepen.selected();
    var leeftijdmatch = [];
    if (leeftijden.length == 0) {
        voldoet = true;
    } else {
        for (var i = 0; i < leeftijden.length; i++) {
            for (var j = 0; j < instrument.leeftijden.length; j++) {
                var begin_eind = instrument.leeftijden[j].range.split("-");
                if (leeftijden[i].id >= begin_eind[0] && leeftijden[i].id <= begin_eind[1]) {
                    voldoet = true;
                    leeftijdmatch.push(instrument.leeftijden[j]);
                }
            }
        }
    }
    if (!voldoet) {
        instrument.geselecteerd = false;
        return false;
    }
    // filter op taalbeheersing
	return true;
};
var renderList = function() {
    var instrumenten = data.instrumenten.filter(filter);
	for (var i = 0; i < instrumenten.length; i++) {
	    console.log(instrumenten[i].naam)
	}
};
var onSelectionChanged = function(sender) {
	renderList();	
}

document.addEventListener('DOMContentLoaded', function() {
	var m = new multiselect("leeftijdsgroepen", "Leeftijdsgroepen", 
		"Kies een leeftijdsgroep");
	multiselects[m.id] = m;
	for (var i = 0; i < data.leeftijdsgroepen.available.length; i++) {
	    var leeftijdsgroep = data.leeftijdsgroepen.available[i];
	    if (leeftijdsgroep.id != "-") {
	        m.addOption(leeftijdsgroep.id, leeftijdsgroep.title);
	    }
	}
	m.addChangeHandler(onSelectionChanged);
	m.render();
	
	var m = new multiselect("aspecten", "Aspecten", "Kies een aspect");
	multiselects[m.id] = m;
	m.addOption("A1", "A1 Spraakproductie");
	m.addOption("A2", "A2 Auditieve verwerking");
	m.addOption("A3", "A3 Grammaticaal-linguistische kennis");
	m.addOption("A4", "A4 Lexicaal-semantische kennis");
	m.addOption("A5", "A5 Pragmatiek");
	m.addChangeHandler(onSelectionChanged);
	m.render();
});