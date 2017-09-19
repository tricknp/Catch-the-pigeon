'use strict';

const canvas =  document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

// Cria o background
let backgroundReady = false;
const backgroundImage = new Image();
backgroundImage.onload = function(){
	backgroundReady = true;
};
backgroundImage.src = '_images/background1.png';

// Cria a imagem do personagem
let personReady = false;
const personImage = new Image();
personImage.onload = function(){
	personReady = true;
}; 
personImage.src = '_images/dv.jpg'

//Cria a imagem do "demonio"
let demonReady = false;
const demonImage = new Image();
demonImage.onload = function(){
	demonReady = true;
};
demonImage.src = '_images/pombo2.png'

//Objetos do game
const person = {
	speed: 300	// movimento em px/sec
};
const demon = {};
let monsterCaught = 0;

//Teclado
const keysDown = {};

window.addEventListener('keydown', function(a) {
	keysDown[a.keyCode] = true;
}, false);

window.addEventListener('keyup', function(a) {
	delete keysDown[a.keyCode];
}, false);

//Att o game cada vez que pega o "monstro"

const reset = function(){
	person.x = canvas.width / 2;
	person.y = canvas.height / 2;

//Posição random do "monstro"
	demon.x = 32 + (Math.random() * (canvas.width - 64));
	demon.y = 32 + (Math.random() * (canvas.height - 64));	
};

//Att os objetos do game
const update = function(modifier){
	if (38 in keysDown) { 	// Seta pra cima
		person.y -= person.speed * modifier;
	}

	if (40 in keysDown ) { 	// Seta pra baixo
		person.y += person.speed * modifier;
	}

	if (37 in keysDown) {	// Seta pra esquerda
		person.x -= person.speed * modifier;
	}

	if (39 in keysDown) {	// Seta pra direita
		person.x  +=  person.speed * modifier;
	}

//Colisão
	if (person.x <= (demon.x + 32)  && demon.x <= (person.x + 32) && person.y <= (demon.y + 32)  && demon.y <= (person.y + 32)) {
		
		++monsterCaught;
		reset();
	}
};

//Render do game
const render = function(){
	if (backgroundReady) {
		ctx.drawImage(backgroundImage, 0, 0);
	}

	if (personReady) {
		ctx.drawImage(personImage, person.x, person.y);
	}

	if (demonReady) {
		ctx.drawImage(demonImage, demon.x, demon.y);
	}

//Score
	ctx.fillStyle = 'rgb(250, 250, 250)';
	ctx.font = '32 px Helvetica';
	ctx. textAlign = 'left';
	ctx.textBaseLine = 'top';
	ctx.fillText('Pontos: '+monsterCaught, 32, 32);
};

//Loop do game
	var main = function(){
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;
	requestAnimationFrame(main);
};

//Suporte cross-browser para requestAnimationFrame
const w = window;
const requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Começa o game
let then = Date.now();
reset();
main();

