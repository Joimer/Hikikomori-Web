(() => {
	let hidden = "hidden";

	function onChange(e) {
		
		const v = "visible";
		const h = "hidden";
        let evtMap = {
          focus:v, focusin:v, pageshow:v, blur:h, focusout:h, pagehide:h
        };

		e = e || window.event;
		if (e.type in evtMap) {
			document.body.className = evtMap[e.type];
		} else {
			document.body.className = this[hidden] ? "hidden" : "visible";
		}
	}

	// Standards:
	if (hidden in document) {
		document.addEventListener("visibilitychange", onChange);
	} else if ((hidden = "mozHidden") in document) {
		document.addEventListener("mozvisibilitychange", onChange);
	} else if ((hidden = "webkitHidden") in document) {
		document.addEventListener("webkitvisibilitychange", onChange);
	} else if ((hidden = "msHidden") in document) {
		document.addEventListener("msvisibilitychange", onChange);
	// IE 9 and lower (though why should I)
	} else if ("onfocusin" in document) {
		document.onfocusin = document.onfocusout = onChange;
	// All others:
	} else {
		window.onpageshow = window.onpagehide = window.onfocus = window.onblur = onChange;
	}

	// Set the initial state (but only if browser supports the Page Visibility API)
	if (document[hidden] !== undefined) {
		onChange({type: document[hidden] ? "blur" : "focus"});
	}
})();
