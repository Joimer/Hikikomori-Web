// I'm not using any library despite being a disadvantage by choice.
// This is a fun exercise, and I have fun by writing everything myself!
// This isn't minified either because I don't think it's worth the effort in this specific case.

// Game values.
// Last time the game values were updated.
let lastUpdate = 0;
// Delta time: time that passed between updates.
let dt = 0.0;
// In-game clock.
let clock = new Clock();
// Player values.
let hp = 100;
let depression = 70;
let fear = 70;
let shame = 60;
let sleepDebt = 0;
// Number of hours the hikikomori can stand up without sleeping.
// As long as health permits it.
const maxWake = 72;
const sleepPerHour = 100 / maxWake;
let sleep = sleepPerHour;
let hunger = 0;
let bladder = 10;
let execrate = 10;
let lastAction = 0;
let mangaCooldown = 0;
let reading = null;
let watching = null;
let animeCooldown = 0;
let watchingAnime = null;

const MANGA_MOST = 240;
const ANIME_MOST = 300;

// we update method pattern boys
function update() {
	updateStats();
	updateClock();
}

function updateStats() {
	set('hp-marker', round(hp, 2));
	set('depression-marker', depression);
	set('fear-marker', fear);
	set('shame-marker', shame);
	set('sleep-marker', round(sleep, 2));
	set('hunger-marker', hunger);
	set('bladder-marker', bladder);
	set('execration-marker', execrate);
}

function updateClock() {
	set('day', clock.getDay());
	set('hour', clock.getHour());
	set('minute', clock.getMinute());
}

function gameover() {
	//todo
}

function win() {
	if (fear > 19 || depression > 19) {
		write(Text.WinCheat);
		return;
	}
	//todo
}

// Click events that manage the gameplay
click('knot-watch', () => {
	let msg = depression > 40 ? Text.KnotDepressionHigh : Text.KnotDepressionLow;
	write(msg);
});

click('bed-watch', () => {
	write(Text.BedWatch);
});

click('bed-use', () => {
	if (sleep < 22.2) {
		write(Text.NotTired);
	} else {
		// TODO: The more depressed, the more you sleep.
		let sleepHours = 8;
		sleep -= sleepPerHour * sleepHours;
		clock.addHours(sleepHours);
		write(Text.Sleep);
		update();
		write(Text.WakeUp);
	}
});

click('door', () => {
	write(Text.RoomLeaveScared);
	// Todo win game
});

click('manga-library-watch', () => {
	write(Text.MangaLibraryWatch);
});

click('anime-library-watch', () => {
	write(Text.AnimeLibraryWatch);
});

click('manga-library-use', () => {
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

	addMinutes(t);
	depression += manga.effects.depression;
	shame += manga.effects.shame;
	fear += manga.effects.fear;
	write(Text.ReadManga.replace('%s', manga.title).replace('%t', t));

	update();
});

click('anime-library-use', () => {
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
		// Minimum of 2 minutes to finish the last pages.
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

	addMinutes(t);
	depression += anime.effects.depression;
	shame += anime.effects.shame;
	fear += anime.effects.fear;
	write(Text.WatchAnime.replace('%s', anime.title).replace('%t', t));

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
	let shitpost = Shitposting[rand(0, Shitposting.length - 1)];
	addMinutes(shitpost.duration);
	write(Text.Shitposting);
	write(Text[shitpost.id]);
	depression += shitpost.effects.depression;
	shame += shitpost.effects.shame;
	fear += shitpost.effects.fear;

	update();
});

click('imageboard-informed', () => {

	update();
});

click('imageboard-memes', () => {
	
	update();
});

click('imageboard-creepy', () => {
	
	update();
});

click('computer-vidya', () => {
	
	update();
});

click('computer-forums', () => {
	
	update();
});

click('computer-tvs', () => {
	
	update();
});

click('computer-get-help', () => {
	
	update();
});

function addMinutes(m) {
	clock.addMinutes(m);
	sleep += sleepPerHour / 60 * m;
}

// Start-up the game once everything's been defined.
(() => {
	// Load game state, if any, here.
	write(Text.Welcome);
	lastUpdate = Date.now();
	update();
	window.setInterval(() => {
		dt += (Date.now() - lastUpdate) / 1000.0;
		// Every second is a minute in-game.
		if (dt >= 1.0) {
			addMinutes(1);
			dt -= 1.0;
			update();
		}
		lastUpdate = Date.now();
	}, 1000 / 60);
})();
