var multiselect = function(id) {
	this.id = id;
	this.options = {};
	this.addOption = function(id, name) {
		this.options[id] = {"name": name, "selected": false};	
	};
	this.select = function(id) {
		this.options[id].selected = !this.options[id].selected;
		this.clear();
		this.render();
	};
	this.clear = function() {
		var container = document.getElementById(this.id);
		if (container == null) {
			return;
		}
		while (container.hasChildNodes()) {
			container.removeChild(container.lastChild);
		}
	};
	this.render = function() {
		var self = this;
		var container = document.getElementById(this.id);
		if (container == null) {
			container = document.createElement('div');
			container.id = this.id;
			document.body.appendChild(container);
		}
		var select = document.createElement('select');
		for (var key in this.options) {
			if (!this.options.hasOwnProperty(key)) {
				continue;
			}
			if (this.options[key].selected) {
				// todo
				var l = document.createElement('label');
				l.style.display = "block";
				var o = document.createElement('input');
				o.value = key;
				o.setAttribute("type", "checkbox");
				o.checked = true;
				o.addEventListener('change', function() {
					self.select(this.value);
				});
				l.appendChild(o);
				l.appendChild(document.createTextNode(this.options[key].name));
				container.appendChild(l);
			} else {
				var o = document.createElement('option');
				o.value = key;
				o.appendChild(document.createTextNode(this.options[key].name));
				select.appendChild(o);
			}
		}
		select.addEventListener('click', function() {
			self.select(select.options[select.selectedIndex].value);
		});	
		if (select.childNodes.length == 0) {
			select.style.display = "none";
		}
		container.appendChild(select);
	}
}
