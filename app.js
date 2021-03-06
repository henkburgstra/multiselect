var multiselects = {};
var instrumenten = null;

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
    // filter op aspecten
    voldoet = false;
    var aspecten = multiselects.aspecten.selected();
    if (aspecten.length == 0) {
        voldoet = true;
    } else {
        for (var i = 0; i < aspecten.length; i++) {
            for (var j = 0; j < instrument.aspecten.length; j++) {
                if (aspecten[i].id == instrument.aspecten[j]) {
                    voldoet = true;
                    break;
                }
            }
        }
    }
    if (!voldoet) {
        instrument.geselecteerd = false;
        return false;
    }
    // filter op taalbeheersing
    voldoet = false;
    var taalbeheersing = multiselects.taalbeheersing.selected();
    if (taalbeheersing.length == 0) {
        voldoet = true;
    } else {
        for (var i = 0; i < taalbeheersing.length; i++) {
            for (var j = 0; j < leeftijdmatch.length; j++) {
                if (taalbeheersing[i].id == leeftijdmatch[j].taalbeheersing) {
                    voldoet = true;
                    break;
                }
            }
            if (voldoet) {
                break;
            }
        }
    }
    if (!voldoet) {
        instrument.geselecteerd = false;
        return false;
    }
    // filter op COTAN-kwalificatie
    voldoet = false;
    var cotan = multiselects.cotan_kwalificatie.selected();
    if (cotan.length == 0) {
        voldoet = true;
    } else {
        for (var i = 0; i < cotan.length; i++) {
            for (var j = 0; j < leeftijdmatch.length; j++) {
                if (cotan[i].id === leeftijdmatch[j].cotan) {
                    voldoet = true;
                    break;
                }
            }
            if (voldoet) {
                break;
            }
        }
    }
    if (!voldoet) {
        instrument.geselecteerd = false;
        return false;
    }
    instrument.cotan = false;
    instrument.normering = '';
    instrument.minimaal_pakket = false;
    instrument.aanvullend_pakket = false;
    instrument.minimaal_pakket_t = false;
    instrument.aanvullend_pakket_t = false;
    for (var i = 0; i < leeftijdmatch.length; i++) {
        if (leeftijdmatch[i].cotan != "-") {
            instrument.cotan = true;
            //break;
        }
        instrument.normering = leeftijdmatch[i].normering;
        var pakket = leeftijdmatch[i].pakket;
        if (pakket == '6d2476b0-3cde-11e4-aa7d-6c626d98ae88') {
            instrument.minimaal_pakket = true;
        }
        else if (pakket == '7b8b98f0-3cde-11e4-a8d0-6c626d98ae88') {
            instrument.aanvullend_pakket = true;
        }
        else if (pakket == '8af70bcf-3cde-11e4-a145-6c626d98ae88') {
            instrument.minimaal_pakket_t = true;
        }
        else if (pakket == '96784c30-3cde-11e4-af54-6c626d98ae88') {
            instrument.aanvullend_pakket_t = true;
        }
    }
    // filter op normering
    voldoet = false;
    var normering = multiselects.normering.selected();
    if (normering.length == 0) {
        voldoet = true;
    } else {
        for (var i = 0; i < normering.length; i++) {
            for (var j = 0; j < leeftijdmatch.length; j++) {
                if (leeftijdmatch[j].normering == undefined || leeftijdmatch[j].normering.indexOf(normering[i].id) != -1) {
                    voldoet = true;
                    break;
                }
            }
            if (voldoet) {
                break;
            }
        }
    }

    if (!voldoet) {
        return voldoet;
    }
    // filter op pakket
    voldoet = false;
    var pakketten = multiselects.pakketten.selected();
    if (pakketten.length == 0) {
        voldoet = true;
    } else {
        for (var i = 0; i < pakketten.length; i++) {
            for (var j = 0; j < leeftijdmatch.length; j++) {
                if (leeftijdmatch[j].pakket == undefined || pakketten[i].id == leeftijdmatch[j].pakket) {
                    voldoet = true;
                    break;
                }
            }
            if (voldoet) {
                break;
            }
        }
    }
    if (!voldoet) {
        return voldoet;
    }

    instrument.stickers = ["a", "b"];
	return true;
};

var InstrumentenLijst = function(id) {
    this.id = id;

    this.clear = function() {
		var container = document.getElementById(this.id);
		if (container == null) {
			return;
		}
		while (container.hasChildNodes()) {
			container.removeChild(container.lastChild);
		}
    };

    this.circle = function(color, hint) {
        var c = document.createElement('div');
        c.className = 'circle';
        c.style.backgroundColor = color;
        c.setAttribute('popover', hint);
        c.setAttribute('popover-trigger', 'mouseenter');
        c.setAttribute('popover-placement', 'right');
        return c;
    }

    this.render = function(data) {
        this.clear();
        var instrumenten = data.filter(filter);
        var container = document.getElementById(this.id);

        for (var i = 0; i < instrumenten.length; i++) {
            var instrument = instrumenten[i];
            var rij = document.createElement('div');
            rij.className = 'instrumentrij';
            /*
                naam
            */
            var naam = document.createElement('div');
            naam.className = 'naam';
            rij.appendChild(naam);
            var label = document.createElement('label');
            naam.appendChild(label);
            var checkbox = document.createElement('input');
            checkbox.setAttribute('type', 'checkbox');
            label.appendChild(checkbox);
            label.appendChild(document.createTextNode(' '));
            if (instrument.cotan) {
                label.appendChild(this.circle('green', 'COTAN-kwalificatie'));
                label.appendChild(document.createTextNode(' '));
            }
            if (instrument.lo) {
                label.appendChild(this.circle('#c800ff', 'Logopedisch onderzoek'));
                label.appendChild(document.createTextNode(' '));
            }
            if (instrument.minimaal_pakket) {
                label.appendChild(this.circle('#ff0000', 'Minimaal pakket'));
                label.appendChild(document.createTextNode(' '));
            }
            if (instrument.minimaal_pakket_t) {
                label.appendChild(this.circle('#00CCFF', 'Minimaal pakket meertaligen'));
                label.appendChild(document.createTextNode(' '));
            }
            if (instrument.aanvullend_pakket) {
                label.appendChild(this.circle('#eec535', 'Aanvullend pakket'));
                label.appendChild(document.createTextNode(' '));
            }
            if (instrument.aanvullend_pakket_t) {
                label.appendChild(this.circle('#CCFFFF', 'Aanvullend pakket meertaligen'));
                label.appendChild(document.createTextNode(' '));
            }
            label.appendChild(document.createTextNode(instrument.naam));
            /*
                meetpretentie
            */
            var meetpretentie = document.createElement('div');
            meetpretentie.className = 'meetpretentie';
            meetpretentie.appendChild(document.createTextNode(instrument.meetpretentie));
            rij.appendChild(meetpretentie);

            container.appendChild(rij);
        }
    };
};

var onSelectionChanged = function(sender) {
	instrumenten.render(data.instrumenten);
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

	var m = new multiselect("aspecten", "Aspecten", "Kies een aspect");
	multiselects[m.id] = m;
	for (var i = 0; i < data.aspecten.available.length; i++) {
	    var aspect = data.aspecten.available[i];
	    if (aspect.id != "-") {
    	    m.addOption(aspect.id, aspect.title);
	    }
	}

	var m = new multiselect("taalbeheersing", "Taalbeheersing", "Kies de taalbeheersing");
	multiselects[m.id] = m;
	for (var i = 0; i < data.taalbeheersing.available.length; i++) {
	    var taalbeheersing = data.taalbeheersing.available[i];
	    if (taalbeheersing.id != "-") {
	        m.addOption(taalbeheersing.id, taalbeheersing.title);
	    }
	}

	var m = new multiselect("pakketten", "Pakketten", "Kies een pakket");
	multiselects[m.id] = m;
	for (var i = 0; i < data.pakketten.available.length; i++) {
	    var pakket = data.pakketten.available[i];
	    if (pakket.id != "-") {
	        m.addOption(pakket.id, pakket.title);
	    }
	}

	var m = new multiselect("cotan_kwalificatie", "COTAN-kwalificatie", "Kies een COTAN-kwalificatie");
	multiselects[m.id] = m;
	for (var i = 0; i < data.cotan_kwalificatie.available.length; i++) {
	    var cotan_kwalificatie = data.cotan_kwalificatie.available[i];
	    if (cotan_kwalificatie.id != "-") {
	        m.addOption(cotan_kwalificatie.id, cotan_kwalificatie.title);
	    }
	}

	var m = new multiselect("normering", "Normering", "Kies een normering");
	multiselects[m.id] = m;
	for (var i = 0; i < data.normering.available.length; i++) {
	    var normering = data.normering.available[i];
	    if (normering.id != "-") {
	        m.addOption(normering.id, normering.title);
	    }
	}

    for (var key in multiselects) {
        if (multiselects.hasOwnProperty(key)) {
            multiselects[key].addChangeHandler(onSelectionChanged);
            multiselects[key].render();
      }
    }

    instrumenten = new InstrumentenLijst('instrumenten');
    instrumenten.render(data.instrumenten);

});