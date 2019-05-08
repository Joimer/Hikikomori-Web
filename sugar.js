function $(id) {
	return document.getElementById(id);
}

function rand(n, m) {
	//TODO: Revisar
	return Math.floor(n + (Math.random() * (m + 1) - n));
}

function clamp(i, min, max) {
	return (i < min) ? min : (i > max) ? max: i;
}

function click(id, anon) {
	$(id).onclick = anon;
}

function set(id, text) {
	$(id).innerHTML = text;
}

function write(msg) {
	set('text', clock +  msg + '<br />' + $('text').innerHTML);
}

function hide(id) {
	$(id).style.display = 'none';
}

function show(id) {
	$(id).style.display = '';
}

function round(n, dec) {
	return +n.toFixed(2);
}

function disable(id) {
	$(id).disabled = "disabled";
}
