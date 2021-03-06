// Click events that manage the gameplay
click('knot-watch', () => {
	if (!gameActive) return;
	lastAction = 0;
	if (depression >= 100) {
		write(Text.KnotDead);
		gameover();
	} else {
		let msg = depression > 40 ? Text.KnotDepressionHigh : Text.KnotDepressionLow;
		write(msg);
	}
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
		doSleep();
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
			miction(90);
		}
		write(Text.BathroomUsed);
	}
});

click('door', () => {
	if (!gameActive) return;
    lastAction = 0;
    if (depression === 0 && fear < 20 && shame < 20 && hp > 33) {
        win();
        return;
    }
	write(Text.RoomLeaveScared);
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
	if (reading !== null && rand(1,10) === 6) {
		write(printf(Text.DroppedManga, reading.manga.title, t));
		reading = null;
	}
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
	modifyDepression(manga.effects.depression);
	modifyShame(manga.effects.shame);
	modifyFear(manga.effects.fear);
	write(Text.ReadManga.replace('%s', manga.title).replace('%t', t));

	update();
});

click('anime-library-use', () => {
	if (!gameActive) return;
	lastAction = 0;
	let time = 0;
	let t = 0;
	let anime = {};
	// Chance to drop what you are doing
	if (watching !== null && rand(1,10) === 6) {
		write(printf(Text.DroppedAnime, watching.title, t));
		watching = null;
	}
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
	modifyDepression(anime.effects.depression);
	modifyShame(anime.effects.shame);
	modifyFear(anime.effects.fear);
	write(printf(Text.WatchAnime, anime.title, t));

	update();
});

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
	modifyDepression(shitpost.effects.depression);
	modifyShame(shitpost.effects.shame);
	modifyFear(shitpost.effects.fear);
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
	modifyDepression(-1);
	modifyShame(1);
	update();
});

click('imageboard-creepy', () => {
	if (!gameActive) return;
	lastAction = 0;
	write(Text.Creepypastas);
	modifyDepression(-1);
	modifyFear(2);
	modifyShame(1);
	update();
});

click('computer-vidya', () => {
	if (!gameActive) return;
	lastAction = 0;
	let r = rand(0, Vidya.length - 1);
	let geemu = Vidya[r];
	let time = geemu.averageGame;
	advanceBodyClock(time);
	modifyDepression(geemu.effects.depression);
	modifyShame(geemu.effects.shame);
	modifyFear(geemu.effects.fear);
	write(printf(Text.Vidya, geemu.title, time));
	update();
});

click('computer-forums', () => {
	if (!gameActive) return;
	lastAction = 0;
	write(Text.Forums);
	advanceBodyClock(120);
	modifyDepression(-1);
	modifyFear(-1);
	modifyShame(2);
	update();
});

click('computer-tvs', () => {
	if (!gameActive) return;
	lastAction = 0;
	write(Text.TvSeries);
	advanceBodyClock(65);
	modifyDepression(2);
	modifyFear(-1);
	modifyShame(-1);
	update();
});

click('computer-get-help', () => {
	if (!gameActive) return;
	lastAction = 0;
	write(Text.NoHelp);
	// TODO: Add rest.
	update();
});

click('drink-water', () => {
	if (!gameActive) return;
	drink();
	if (fullBottles <= 0) {
		disable('drink-water');
	}
});
