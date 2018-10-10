'use strict';

class Clock {
	constructor() {
		this.day = 1;
		this.hour = 10;
		this.minute = 0;
	}

	digits(i) {
		return i < 10? '0' + i : i + '';
	}

	addMinute() {
		this.addMinutes(1);
	}

	addMinutes(i) {
		this.minute += i;
		while (this.minute > 59) {
			this.minute -= 60;
			this.addHour();
		}
	}

	addHour() {
		this.hour++;
		if (this.hour === 24) {
			this.hour = 0;
			this.day++;
		}
	}

	getDay() {
		return this.day;
	}

	getHour() {
		return this.digits(this.hour);
	}


	getMinute() {
		return this.digits(this.minute);
	}

	toString() {
		return '[' + Text.Day + ' ' + this.day + ', ' + this.getHour()
			+ ':' + this.getMinute() + '] ';
	}
}
