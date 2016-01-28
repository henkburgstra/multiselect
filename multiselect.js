var multiselect = function(id, title, prompt) {
	this.id = id;
	this.title = title;
	this.prompt = prompt;
	this.changeHandlers = [];
	this.options = {};
	this.addOption = function(id, name) {
		this.options[id] = {"name": name, "selected": false};	
	};
	this.select = function(id) {
		if (id == "") {
			return;
		}
		this.options[id].selected = !this.options[id].selected;
		this.clear();
		this.render();
		for (var i = 0; i < this.changeHandlers.length; i++) {
			this.changeHandlers[i](this);
		}
	};
	this.addChangeHandler = function(handler) {
		this.changeHandlers.push(handler);
	};
	this.selected = function() {
		var s = [];
		for (var key in this.options) {
			if (!this.options.hasOwnProperty(key)) {
				continue;
			}
			if (this.options[key].selected) {
				s.push({"id": key, "name": this.options[key].name});
			}			
		}
		return s;
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
		var d = document.createElement('div');
		var s = document.createElement('strong');
		var t = document.createTextNode(this.title);
		d.appendChild(s);
		s.appendChild(t);
		container.appendChild(d);
		var select = document.createElement('select');
		select.className='form-control';
		for (var key in this.options) {
			if (!this.options.hasOwnProperty(key)) {
				continue;
			}
			if (this.options[key].selected) {
				var cd = document.createElement('div');
				cd.className = 'checkbox';
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
				cd.appendChild(l);
				container.appendChild(cd);
			} else {
				var o = document.createElement('option');
				o.value = key;
				o.appendChild(document.createTextNode(this.options[key].name));
				select.appendChild(o);
			}
		}
		select.addEventListener('change', function() {
			self.select(select.options[select.selectedIndex].value);
		});	
		if (select.childNodes.length == 1) {
			select.style.display = "none";
		}
		container.appendChild(select);
	}
	this.addOption("", this.prompt);
}
