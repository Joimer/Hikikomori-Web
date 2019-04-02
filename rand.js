function rand(n, m) {
	//TODO: Revisar
	return Math.floor(n + (Math.random() * (m + 1) - n));
}
let a = ['lock', 'mage', 'shammy'];
let r = rand(1,3);
console.log(a[r]);
