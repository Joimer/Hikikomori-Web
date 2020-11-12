const Genre = {
	ADVENTURE: 1,
	COMEDY: 1,
	DRAMA: 1,
	HORROR: 1,
	MAHOUSHOUJO: 1,
	MECHA: 1,
	MUSIC: 1,
	PSYCHOLOGICAL: 1,
	ROMANCE: 1,
	SHOUNENSHIT: 1,
	SOL: 1
};

const Anime = [
	{
		title: "Snake Ball",
		episodes: 500,
		effects: {
			depression: -1,
			shame: -1,
			fear: -1
		},
		genres: [Genre.SHOUNENSHIT, Genre.COMEDY]
	},
	{
		title: "Tanma 1/4",
		episodes: 100,
		effects: {
			depression: -1,
			shame: -1,
			fear: -1
		},
		genres: [Genre.SHOUNENSHIT, Genre.ROMANCE]
	},
	{
		title: "Old Genesis Adamgelion",
		episodes: 24,
		effects: {
			depression: 2,
			shame: -2,
			fear: 0
		},
		genres: [Genre.PSYCHOLOGICAL, Genre.MECHA, Genre.DRAMA]
	},
	{
		title: "The End of Adamgelion",
		episodes: 1,
		duration: 120,
		effects: {
			depression: 1,
			shame: -1,
			fear: 0
		},
		genres: [Genre.PSYCHOLOGICAL, Genre.MECHA, Genre.DRAMA]
	},
	{
		title: "Kourogi no Naku Koro ni",
		episodes: 26,
		effects: {
			depression: 2,
			shame: -3,
			fear: 1
		},
		genres: [Genre.PSYCHOLOGICAL, Genre.HORROR]
	},
	{
		title: "Kourogi no Naku Koro ni Kai",
		episodes: 24,
		effects: {
			depression: 2,
			shame: -3,
			fear: 1
		},
		genres: [Genre.PSYCHOLOGICAL, Genre.HORROR]
	},
	{
		title: "Kourogi no Naku Koro ni Higu",
		episodes: 24,
		effects: {
			depression: 2,
			shame: -3,
			fear: 1
		},
		genres: [Genre.PSYCHOLOGICAL, Genre.HORROR]
	},
	{
		title: "Mahou Josei Madoka Magica",
		episodes: 12,
		effects: {
			depression: 2,
			shame: 4,
			fear: -6
		},
		genres: [Genre.PSYCHOLOGICAL, Genre.MAHOUSHOUJO]
	},
	{
		title: "Shoujo Kageki Revue Moonlight",
		episodes: 12,
		effects: {
			depression: -2,
			shame: 4,
			fear: -2
		},
		genres: [Genre.SOL, Genre.ROMANCE, Genre.MUSIC]
	},
	{
		title: "Suzumiya Mitsuha no Yuuutsu",
		episodes: 28,
		effects: {
			depression: -2,
			shame: 4,
			fear: -2
		},
		genres: [Genre.SOL, Genre.ADVENTURE]
	},
	{
		title: "Suzumiya Mitsuha no Shoushitsu",
		episodes: 1,
		duration: 182,
		effects: {
			depression: -2,
			shame: 4,
			fear: -2
		},
		genres: [Genre.SOL, Genre.ADVENTURE, Genre.DRAMA]
	},
	{
		title: "Fisherman x Fisherman",
		episodes: 148,
		effects: {
			depression: -2,
			shame: -2,
			fear: 0
		},
		genres: [Genre.ADVENTURE, Genre.SHOUNENSHIT]
	},
	{
		title: "Bakeshousetsu",
		episodes: 15,
		effects: {
			depression: -3,
			shame: 5,
			fear: -3
		},
		genres: [Genre.DRAMA, Genre.COMEDY, Genre.ROMANCE]
	},
	{
		title: "Bakeshousetsu Second Season",
		episodes: 26,
		effects: {
			depression: -5,
			shame: 5,
			fear: -1
		},
		genres: [Genre.DRAMA, Genre.COMEDY, Genre.ROMANCE]
	},
	{
		title: "Niseshousetsu",
		episodes: 11,
		effects: {
			depression: -5,
			shame: 10,
			fear: -5
		},
		genres: [Genre.DRAMA, Genre.COMEDY, Genre.ROMANCE]
	},
	{
		title: "Bakeshousetsu",
		episodes: 15,
		effects: {
			depression: -3,
			shame: 6,
			fear: -3
		},
		genres: [Genre.DRAMA, Genre.COMEDY, Genre.ROMANCE]
	},
	{
		title: "Kizushousetsu",
		episodes: 1,
		duration: 100,
		effects: {
			depression: -3,
			shame: 6,
			fear: -3
		},
		genres: [Genre.DRAMA, Genre.COMEDY, Genre.ROMANCE]
	},
	{
		title: "Kizushousetsu II",
		episodes: 1,
		duration: 100,
		effects: {
			depression: -3,
			shame: 6,
			fear: -3
		},
		genres: [Genre.DRAMA, Genre.COMEDY, Genre.ROMANCE]
	},
	{
		title: "Kizushousetsu III",
		episodes: 1,
		duration: 100,
		effects: {
			depression: -3,
			shame: 6,
			fear: -3
		},
		genres: [Genre.DRAMA, Genre.COMEDY, Genre.ROMANCE]
	},
	{
		title: "Tsukishousetsu",
		episodes: 4,
		effects: {
			depression: -2,
			shame: 4,
			fear: -2
		},
		genres: [Genre.DRAMA, Genre.COMEDY, Genre.ROMANCE]
	},
	{
		title: "Owarishousetsu",
		episodes: 12,
		effects: {
			depression: -3,
			shame: 6,
			fear: -3
		},
		genres: [Genre.DRAMA, Genre.COMEDY, Genre.ROMANCE]
	},
	{
		title: "Owarishousetsu (Ge)",
		episodes: 7,
		effects: {
			depression: -3,
			shame: 6,
			fear: -3
		},
		genres: [Genre.DRAMA, Genre.COMEDY, Genre.ROMANCE]
	},
	{
		title: "Zoku Owarishousetsu",
		episodes: 6,
		effects: {
			depression: -3,
			shame: 6,
			fear: -3
		},
		genres: [Genre.DRAMA, Genre.COMEDY, Genre.ROMANCE]
	},
	{
		title: "Hanashousetsu",
		episodes: 5,
		effects: {
			depression: -2,
			shame: 2,
			fear: -1
		},
		genres: [Genre.DRAMA, Genre.COMEDY, Genre.ROMANCE]
	},
	{
		title: "Tetsu no Renkinjutsushi",
		episodes: 64,
		effects: {
			depression: -2,
			shame: -2,
			fear: 0
		},
		genres: [Genre.ADVENTURE, Genre.SHOUNENSHIT, Genre.DRAMA]
	},
	{
		title: "Tengen Toppa Luggen Garann",
		episodes: 27,
		effects: {
			depression: -3,
			shame: -3,
			fear: -3
		},
		genres: [Genre.ADVENTURE, Genre.SHOUNENSHIT, Genre.MECHA]
	},
	{
		title: "Higurashi no Haka",
		episodes: 1,
		duration: 88,
		effects: {
			depression: 20,
			shame: -5,
			fear: 5
		},
		genres: [Genre.DRAMA]
	},
];
