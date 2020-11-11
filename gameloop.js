// Start-up the game once everything's been defined.
(() => {
	// Load game state, if any, here.
	// TODO: Game saving
	write(Text.Welcome);
	lastUpdate = Date.now();
	lastFood = Date.now() - 2 * 60 * 100;
	update();

	// Game loop.
	function gameloop() {
		if (gameActive && !document.hidden && !document.body.hidden) {
			let theDt = (Date.now() - lastUpdate) / 1000.0;
			dt += theDt;
			lastAction += theDt;
			// Every second is a minute in-game.
			if (dt >= 1.0) {
				advanceBodyClock(1);
				timeSinceParents += dt;
				dt -= 1.0;
				update();
			}
			checkIdle();
		}
		lastUpdate = Date.now();
		requestAnimationFrame(gameloop);
	}
	requestAnimationFrame(gameloop);
})();
