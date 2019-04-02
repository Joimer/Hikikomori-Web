// I'm not using any library despite being a disadvantage by choice.
// This is a fun exercise, and I have fun by writing everything myself!
// This isn't minified either because I don't think it's worth the effort in this specific case.

// Game values.
let lastUpdate = 0;
let dt = 0.0;
let clock = new Clock();
let hp = 100;
let depression = 70;
let fear = 70;
let shame = 60;
let sleep = 25;
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

function updateStats() {
	set('hp-marker', hp);
	set('depression-marker', depression);
	set('fear-marker', fear);
	set('shame-marker', shame);
	set('sleep-marker', sleep);
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

	clock.addMinutes(t);
	depression += manga.effects.depression;
	shame += manga.effects.shame;
	fear += manga.effects.fear;
	write(Text.ReadManga.replace('%s', manga.title).replace('%t', t));

	updateStats();
	updateClock();
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

	clock.addMinutes(t);
	depression += anime.effects.depression;
	shame += anime.effects.shame;
	fear += anime.effects.fear;
	write(Text.WatchAnime.replace('%s', anime.title).replace('%t', t));

	updateStats();
	updateClock();
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
	clock.addMinutes(15);
	write(Text.Shitposting);

	updateStats();
	updateClock();
});

click('imageboard-informed', () => {

	updateStats();
	updateClock();
});

click('imageboard-memes', () => {
	
	updateStats();
	updateClock();
});

click('imageboard-creepy', () => {
	
	updateStats();
	updateClock();
});

click('computer-vidya', () => {
	
	updateStats();
	updateClock();
});

click('computer-forums', () => {
	
	updateStats();
	updateClock();
});

click('computer-tvs', () => {
	
	updateStats();
	updateClock();
});

click('computer-get-help', () => {
	
	updateStats();
	updateClock();
});

// Start-up the game once everything's been defined.
(() => {
	// Load game state, if any, here.
	write(Text.Welcome);
	lastUpdate = Date.now();
	window.setInterval(() => {
		dt += (Date.now() - lastUpdate) / 1000.0;
		// Every second is a minute in-game.
		if (dt >= 1.0) {
			clock.addMinute();
			dt -= 1.0;
			updateClock();
		}
		lastUpdate = Date.now();
	}, 1000 / 60);
})();
