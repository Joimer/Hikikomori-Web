// I'm not using any library despite being a disadvantage by choice.
// This is a fun exercise, and I have fun by writing everything myself!
// This isn't minified either because I don't think it's worth the effort in this specific case.

// Game values.
let gameActive = true;

// Last time the game values were updated.
let lastUpdate = 0;

// Last time the player did an action.
let lastAction = 0;

// Delta time, the time that passed between updates.
let dt = 0.0;

// In-game clock.
let clock = new Clock();

// Player values.
let hp = 100;
let depression = 70;
let fear = 70;
let shame = 60;
let sleepDebt = 0;
let liquidInBody = 2000;

// Number of hours the hikikomori can stand up without sleeping.
// As long as health permits it.
const maxWake = 72;
const sleepPerHour = 100 / maxWake;
let sleep = sleepPerHour;
let hunger = 0;
let bladder = 10;
let execrate = 10;
let mangaCooldown = 0;
let reading = null;
let watching = null;
let animeCooldown = 0;
let watchingAnime = null;
let lastFood = 0;
let lastDrink = 0;

const MANGA_MOST = 240;
const ANIME_MOST = 300;

// we update method pattern boys
// Pretty ugly actually but hey
function update() {
	updateStats();
	updateClock();
}

function hpDown(hpDown) {
	hp -= hpDown;
	if (hp < 1) {
		hp = 0;
		gameover();
	}
}

function randomText(textList) {
	return textList[rand(0, textList.length - 1)];
}

function updateStats() {
	set('hp-marker', round(hp, 2));
	set('depression-marker', depression);
	set('fear-marker', fear);
	set('shame-marker', shame);
	set('sleep-marker', round(sleep, 2));
	set('hunger-marker', hunger);
	set('bladder-marker', round(bladder, 2));
	set('execration-marker', round(execrate, 2));
}

function updateClock() {
	set('day', clock.getDay());
	set('hour', clock.getHour());
	set('minute', clock.getMinute());
}

function gameover() {
	write(Text.GameOver);
	gameActive = false;
	disableAll();
}

function disableAll() {
	disable('knot-watch');
	disable('bed-watch');
	disable('bed-use');
	disable('manga-library-watch');
	disable('manga-library-use');
	disable('anime-library-watch');
	disable('anime-library-use');
	disable('imageboard-shitpost');
	disable('imageboard-informed');
	disable('imageboard-memes');
	disable('imageboard-creepy');
	disable('computer-vidya');
	disable('computer-forums');
	disable('computer-tvs');
	disable('computer-get-help');
	disable('bathroom');
	disable('door');
}

function win() {
	if (fear > 19 || depression > 19) {
		write(Text.WinCheat);
		return;
	}
	gameActive = false;
	//todo
}

// Click events that manage the gameplay
click('knot-watch', () => {
	if (!gameActive) return;
	lastAction = 0;
	let msg = depression > 40 ? Text.KnotDepressionHigh : Text.KnotDepressionLow;
	write(msg);
});

click('bed-watch', () => {
	if (!gameActive) return;
	lastAction = 0;
	write(Text.BedWatch);
});

// TODO: Add cooldown for sleeping twice in a row after an all nighter.
click('bed-use', () => {
	if (!gameActive) return;
	lastAction = 0;
	if (sleep < 19) {
		write(Text.NotTired);
	} else {
		// TODO: The more depressed, the more you sleep.
		// With negative effects, of course.
		let sleepHours = 8;
		sleep -= sleepPerHour * sleepHours;
		clock.addHours(sleepHours);
		write(Text.Sleep);
		update();
		write(Text.WakeUp);
		// Random cannot move all day event here
		sleepingEvents();
	}
});

click('bathroom', () => {
	if (!gameActive) return;
	if (bladder < 30 && execrate < 30) {
		write(Text.NoNeedBathroom);
	} else {
		lastAction = 0;
		if (execrate > 49) {
			execrate = clamp(execrate - 80, 0, 100);
		}
		if (bladder > 30) {
			bladder = clamp(bladder - 90, 0, 100);
		}
		write(Text.BathroomUsed);
	}
});

click('door', () => {
	if (!gameActive) return;
	lastAction = 0;
	write(Text.RoomLeaveScared);
	// Todo win game
});

click('manga-library-watch', () => {
	if (!gameActive) return;
	lastAction = 0;
	write(Text.MangaLibraryWatch);
});

click('anime-library-watch', () => {
	if (!gameActive) return;
	lastAction = 0;
	write(Text.AnimeLibraryWatch);
});

click('manga-library-use', () => {
	if (!gameActive) return;
	lastAction = 0;
	let time = 0;
	let t = 0;
	let manga = {};
	if (reading === null) {
		let r = rand(0, Manga.length - 1);
		manga = Manga[r];

		// Each chapter takes 20 minutes to read in average.
		time = 20 * manga.chapters;
		if (time > MANGA_MOST) {
			reading = {manga: manga, times: 1};
		}
		t = clamp(time, 0, MANGA_MOST);
	} else {
		manga = reading.manga;
		time = 20 * manga.chapters;
		let timeRead = reading.times * MANGA_MOST;
		let left = time - timeRead;
		// Minimum of 2 minutes to finish the last pages.
		if (left < 2) {
			left = 2;
		}
		// Finish reading or continue depending on how much is left.
		if (left < MANGA_MOST) {
			t = left;
			reading = null;
		} else {
			t = MANGA_MOST;
			reading.times++;
		}
	}

	advanceBodyClock(t);
	depression += manga.effects.depression;
	shame += manga.effects.shame;
	fear += manga.effects.fear;
	write(Text.ReadManga.replace('%s', manga.title).replace('%t', t));

	update();
});

click('anime-library-use', () => {
	if (!gameActive) return;
	lastAction = 0;
	let time = 0;
	let t = 0;
	let anime = {};
	if (watching === null) {
		let r = rand(0, Anime.length - 1);
		anime = Anime[r];
		// A good otaku watches both opening and ending sequences.
		time = 24 * anime.episodes;
		if (time > ANIME_MOST) {
			watching = {anime: anime, times: 1};
		}
		t = clamp(time, 0, ANIME_MOST);
	} else {
		anime = watching.anime;
		time = 20 * anime.episodes;
		let timeWatched = watching.times * ANIME_MOST;
		let left = time - timeWatched;
		// Minimum of 2 minutes to finish the last episode.
		if (left < 2) {
			left = 2;
		}
		// Finish watching or continue depending on how much is left.
		if (left < ANIME_MOST) {
			t = left;
			watching = null;
		} else {
			t = ANIME_MOST;
			watching.times++;
		}
	}

	advanceBodyClock(t);
	depression += anime.effects.depression;
	shame += anime.effects.shame;
	fear += anime.effects.fear;
	write(printf(Text.WatchAnime, anime.title, t));

	update();
});

// TODO: Drop anime and manga.

click('imageboard-toggle', () => {
	if ($('imageboard-options').style.display === 'none') {
		show('imageboard-options');
	} else {
		hide('imageboard-options');
	}
});

click('imageboard-shitpost', () => {
	if (!gameActive) return;
	lastAction = 0;
	let shitpost = Shitposting[rand(0, Shitposting.length - 1)];
	advanceBodyClock(shitpost.duration);
	write(Text.Shitposting);
	write(Text[shitpost.id]);
	depression += shitpost.effects.depression;
	shame += shitpost.effects.shame;
	fear += shitpost.effects.fear;
	update();
});

click('imageboard-informed', () => {
	if (!gameActive) return;
	lastAction = 0;
	write(Text.InformedPosts);
	update();
});

click('imageboard-memes', () => {
	if (!gameActive) return;
	lastAction = 0;
	write(Text.DankMemes);
	depression -= 1;
	update();
});

click('imageboard-creepy', () => {
	if (!gameActive) return;
	lastAction = 0;
	write(Text.Creepypastas);
	depression -= 1;
	fear += 2;
	shame += 1;
	update();
});

click('computer-vidya', () => {
	if (!gameActive) return;
	// TODO: Something like anime, manga, so on.
	lastAction = 0;
	update();
});

click('computer-forums', () => {
	if (!gameActive) return;
	lastAction = 0;
	write(Text.Forums);
	advanceBodyClock(120);
	depression -= 1;
	fear -= 1;
	shame += 2;
	update();
});

click('computer-tvs', () => {
	if (!gameActive) return;
	lastAction = 0;
	write(Text.TvSeries);
	advanceBodyClock(65);
	depression += 2;
	fear -= 1;
	shame -= 1;
	update();
});

click('computer-get-help', () => {
	if (!gameActive) return;
	lastAction = 0;
	write(Text.NoHelp);
	// TODO: Add rest.
	update();
});

// TODO: Check clock I think the hour addition is not working properly.
// Advances the clock and the need for sleeping.
function addMinutesAndSleep(m) {
	clock.addMinutes(m);
	sleep += sleepPerHour / 60 * m;
}

// Advance the clock for all bodily functions
function advanceBodyClock(m) {
	addMinutesAndSleep(m);
	addBladderCount(m);
	addIntestineCount(m);
}

// Check how many hours they've been awake.
// If it's in the limit, they fall down asleep, with more negative consequences.
function checkSleepyness() {
	if (sleep >= 100) {
		// Falls asleep for 15 hours after the max time without sleeping.
		// Sleep is still in debt, though, sleeping 15 hours after 48 won't recover you like sleeping normally.
		// Also HP is affected.
		clock.addHours(15);
		sleep -= 10 * sleepPerHour;
		hpDown(4);
		depression += 10;
		write(Text.FallExhausted);
	}
}

// Add a counter for what was the last time that the player had water
// Add a counter for both water bottles that refill when asleep and empty waters to pee
// Add a counter for eating and a 20-24 hours cycle for excretion.

// Adds m minutes to bladder count since the last time a liquid was taken.
// 3.7 hours from drinking to micturion (222 minutes to lose all drank liquids)
// Average miction per day is about 7 times.
function addBladderCount(m) {
	bladder += m * 100 / 222;
}

// Adds m minutes to intestine count since the last time solid food was taken.
// 12 hours from ingestion to excretion.
// Average of 1 per day, 1440 minutes since eating to 100%.
function addIntestineCount(m) {
	execrate += m * 100 / 1440;
}

function checkBladder() {
	// Pee can be strongly held.
	if (bladder > 100) {
		if (bladder > 150) {
			pissYourself();
		} else {
			hp -= 1;
			write(Text.HaveToPee);
		}
	}
	
	if (bladder > 74) {
		if (rand(1,4) === 1) write(Text.HaveToPee);
	}
}

function pissYourself() {
	const remove = Math.min(100, bladder);
	bladder -= remove;
	write(Text.PeedYourself);
	hpDown(10);
}

function checkIntestines() {
	if (execrate > 99) {
		selfExecrate();
		return;
	}
	if (execrate > 74) {
		if (rand(1,3) === 1) write(Text.HaveToCrap);
	}
}

function selfExecrate() {
	const remove = Math.min(100, execrate);
	execrate -= remove;
	write(Text.CrappedYourself);
	hpDown(20);
}

function checkBiologicalNeeds() {
	checkSleepyness();
	checkBladder();
	checkIntestines();
}

function checkIdle() {
	if (lastAction >= 30.0) {
		lastAction = 0;
		write(randomText(Text.Idle));
	}

	// Random anxiety attacks here
}

function sleepingEvents() {

}

// TODO: Subir barras de ir al baño, ciclo de 24 horas
// Barra de hunger
// Comida de tus padres a ciertas horas.
// Si está fría bajas en salud. Si pasa mucho rato se pone mala y te entra diarrea.
// Beber agua.
// Botellas para mear.
// Añadir eventos como ataque de ansiedad y día de depresión severa.

// Set up control of page activation and deactivation so the game only runs when the window is active.
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
				checkBiologicalNeeds();
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
