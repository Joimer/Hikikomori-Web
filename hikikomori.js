// Is the game running?
let gameActive = true;

// 6 hours from drinking to micturion (360 minutes to lose all drank liquids)
// Average miction per day is about 7 times. It can be held so we round it.
const MICTURION_WAIT = 360;
// 12 hours from ingestion to excretion.
// Average of 1 per day, 1440 minutes since eating to 100%.
const EXCRETING_WAIT = 1440;

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
let bottles = 2;
let fullBottles = 0;

const MANGA_MOST = 240;
const ANIME_MOST = 300;

// we update method pattern boys
// Pretty ugly actually but hey
function update() {
	checkBiologicalNeeds();
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
	write(Text.Dead);
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
	write(Text.Win);
}

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
function addBladderCount(m) {
	if (liquidInBody > 0) {
		bladder += m * 100 / MICTURION_WAIT;
	}
}

// Adds m minutes to intestine count since the last time solid food was taken.
function addIntestineCount(m) {
	execrate += m * 100 / EXCRETING_WAIT;
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
	miction(Math.min(100, bladder));
	write(Text.PeedYourself);
	hpDown(10);
}

function miction(amount) {
	bladder = clamp(bladder - amount, 0, 100);
	liquidInBody -= amount * 20
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

// TODO:
// Barra de hunger
// Comida de tus padres a ciertas horas.
// Si está fría bajas en salud. Si pasa mucho rato se pone mala y te entra diarrea.
// Beber agua.
// Botellas para mear.
// Añadir eventos como ataque de ansiedad y día de depresión severa.
