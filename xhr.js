var xhr = new XMLHttpRequest();

// xhr.send(new Int8Array()); 
// xhr.send(document);

// (function () {    
//     if (typeof require !== 'undefined') {
//         const { webFrame } = require('electron');
//         class Zoom {
//             constructor() {
//                 this.zoom_factors = [0.25, 0.5, 0.67, 0.75, 0.8, 0.9, 1, 1.1, 1.25, 1.5, 2, 2.5, 3, 4, 5];
//                 this.index = this.zoom_factors.findIndex(value => value >= webFrame.getZoomFactor());
//             }
//             zoom_in() {
//                 if (this.index + 1 < this.zoom_factors.length) this.index++;
//                 webFrame.setZoomFactor(this.zoom_factors[this.index]);
//             }
//             zoom_out() {
//                 if (this.index > 0) this.index--; 
//                 webFrame.setZoomFactor(this.zoom_factors[this.index]);
//             }
//         }
//         var zoom = new Zoom();
//         var is_control_down = false;
//         parent.window.addEventListener("keydown", function (event) {
//             if (event.key == "Control") is_control_down = true;
//             if (event.repeat) return; // key is still pressed down
//             if (is_control_down && event.key == "=") zoom.zoom_out();
//             if (is_control_down && event.key == "-") zoom.zoom_in();
//         });
//         parent.window.addEventListener("keyup", function (event) {
//             if (event.key == "Control") is_control_down = false;
//         });
//         parent.window.addEventListener("wheel", function (event) {
//             if (!is_control_down) return;
//             if (event.deltaY < 0) { zoom.zoom_in(); }
//             else { zoom.zoom_out(); }
//         });
//     }
// })();


const refreshMonsters = () => { return Object.values(parent.entities).filter((v) => { if (v.name == "Tortoise") return (true); return false }) }
const vecFromCoord = (vec1, vec2) => { return { x: vec2.x - vec1.x, y: vec2.y - vec1.y } }
const vecLen = (vec) => { return Math.abs(Math.sqrt(Math.pow(vec.x, 2) + Math.pow(vec.y, 2))) }
const sortByDistance = (entitie1, entitie2, entitie3) => {
	return (
		vecLen(vecFromCoord(entitie1, entitie2))

	)
}

var on_cm = (name, data) => {
	if (data == "group") {
		send_party_invite(name, false)
	}
}

let monsters = refreshMonsters();
if (monsters)
	monsters.sort((a, b) => {
		return (vecLen(vecFromCoord(a, { x: parent.character.real_x, y: parent.character.real_y })) -
			vecLen(vecFromCoord(b, { x: parent.character.real_x, y: parent.character.real_y })))
	})

let farmState = {
	time: 0,
	gph: 0,
	xph: 0,
	dph: 0
};
const startTime = Date.now();
let fraction = 10
let damage = 0
let oldGold = parent.character.gold
let oldXp = parent.character.xp
let oldDamage = damage

setInterval(function () {
	farmState.gph = (parent.character.gold - oldGold) * fraction * 60
	oldGold = parent.character.gold
	farmState.xph = (parent.character.xp - oldXp) * fraction * 60
	oldXp = parent.character.xp
	farmState.dph = (damage - oldDamage) * fraction * 60
	oldDamage = damage
	farmState.time = Date.now()
	xhr.setRequestHeader("Content-Type", "application/json");

	xhr.onreadystatechange = function () { //Appelle une fonction au changement d'état.
		if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
			// Requête finie, traitement ici.
			console.log(this.response)
		};
	};
	xhr.open("POST", 'http://192.168.1.24:4200/characters', true);
	xhr.send(JSON.stringify({ name: parent.character.name, ...farmState }));
}, 60000 / fraction)
console.log(monsters)


setInterval(() => {
	monsters = refreshMonsters();
	monsters.sort((a, b) => {
		return (vecLen(vecFromCoord(a, { x: parent.character.real_x, y: parent.character.real_y })) -
			vecLen(vecFromCoord(b, { x: parent.character.real_x, y: parent.character.real_y })))
	})
	//	console.log(parent.entities[monsters[monster_i]])
	if (monsters[0]) {
		parent.move(monsters[0].real_x, monsters[0].real_y, true);
		if (!is_on_cooldown("attack") && is_in_range(monsters[0], "attack")) {
			attack(monsters[0]).then(
				function (data) {
					damage += data.damage
				},
				function (data) {
					game_log("oh no, attack failed: " + data.reason);
				},
			);
		}
	}
	loot()
	if (!is_on_cooldown("use_hp") && parent.character.mp < parent.character.max_mp - 300)
		use_skill("use_mp");
	if (!is_on_cooldown("use_hp") && parent.character.hp < parent.character.max_hp - 200)
		use_skill("use_hp");
	//	console.log(monsters[monster_i])
}, 200)


function on_draw() {
	clear_drawings()
	let text = new PIXI.Text('This is a pixi text', { fontFamily: 'Arial', fontSize: 24, fill: 0xff1010, align: 'center' });
	parent.renderer.render(text)
	if (monsters[0])
		draw_circle(monsters[0].real_x, monsters[0].real_y, monsters[0].range, 1, 0xFF0000)
	if (monsters[0] && monsters[1]) {
		let vec1 = { x: monsters[0].real_x, y: monsters[0].real_y };
		let vec2 = { x: monsters[1].real_x, y: monsters[1].real_y };
		draw_circle(monsters[1].real_x, monsters[1].real_y, monsters[1].range, 1, 0xFF6000)
		let vecFC = vecFromCoord(vec1, vec2)
		let vecFCLen = vecLen(vecFC)
		let vecFCNorm = { x: vecFC.x / vecFCLen, y: vecFC.y / vecFCLen }
		vecFC = { x: vecFCNorm.x * (vecFCLen - monsters[1].range), y: vecFCNorm.y * (vecFCLen - monsters[1].range) }
		vec2 = { x: vec1.x + vecFC.x, y: vec1.y + vecFC.y }
		vec1 = { x: vec1.x + vecFCNorm.x * monsters[0].range, y: vec1.y + vecFCNorm.y * monsters[0].range }
		draw_line(vec1.x, vec1.y, vec2.x, vec2.y, 1, 0xFF6000)
	}
}