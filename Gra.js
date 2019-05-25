var canvas = document.GetElementById('Pong');
var ctx = canvas.getContext('2d');
var gra = {}; //trzymać będzie wszystkie informacje o stanie gry.

//konstruktor pilki

function ball() 
{
  this.x = 0;
  this.y = 0;
  this.offsetX = 0,     //przesuniecie pilki w OX
  this.offsetY = 0,     //przesuniecie pilki w OY
  this.promien = 5;     //rozmiar pilki
  this.kolor = color;   
  this.rysuj = function() {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.szerokosc, this.dlugosc);
    ctx.fillStyle = this.kolor;
    ctx.fill();
    ctx.closePath();
  }
}

function rect(nazwa, szerokosc, dlugosc, offset, kolor) 
{
    this.x = 0;
    this.y = 0;
    this.w_gore = 'false';          //do kontroli ruchu prostokata - docelowo w gore W i P
    this.w_dol = 'false';           //dol - docelowo S i L
    this.punkty = 0;
    this.nazwa = nazwa;       //nazwa gracza, zawawrta tutaj, żeby nazwawc dwoch graczy
    this.szerokosc = szerokosc;
    this.dlugosc = dlugosc;
    this.offset = offset;
    this.kolor = color;
    this.rysuj = function() 
    {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.szerokosc, this.dlugosc);         //wymiary prostokata
        ctx.fillStyle = this.kolor;
        ctx.fill();
        ctx.closePath();
    }
}

function poczatek() 
{
    pong.stan = 0;  // poczatek 0, gra trwa 1, nowy punkt 2, koniec 3
    pong.pauza= true;
    pong.pilka = new ball(10, '#d50');
    pong.gracze = [];
    pong.gracze[0] = new rect('Player 1',  15, 60, 7, '#ffcc00
    pong.gracze[1] = new rect('Player 2', 15, 60, 7, '#ffcc00
    pong.zycia = 10;
    pong.zwyciezca = 0;
    reset();
}

function reset() 
{
    pong.pilka.x = canvas.width/2;
    pong.pilka.y = canvas.height/2;
    pong.pauza = true;
    pong.pilka.offsetX = 6;
    pong.pilka.offsetY = 2;
    pong.gracze[0].x = 0;
    pong.gracze[1].x  = canvas.width - pong.gracze[1].szerokosc;
    pong.gracze[0].y = (canvas.height - pong.gracze[0].dlugosc)/2;
    pong.gracze[1].y = (canvas.height - pong.gracze[1].dlugosc)/2;
}

function PrzyciskWcisniety(e) {
    if (e.keyCode == 87) { pong.gracze[0].w_gore true; } else
    if (e.keyCode == 80) { pong.gracze[1].w_gore = true; } else
    if (e.keyCode == 83) { pong.gracze[0].w_dol = true; } else
    if (e.keyCode == 76) { pong.gracze[1].w_dol = true; } else
    if (e.keyCode == 32) { pong.pauza = !pong.pauza }
}

function PrzyciskPuszczony(e) {
    if (e.keyCode == 87) { pong.gracze[0].w_gore = false; } else
    if (e.keyCode == 80) { pong.gracze[1].w_gore = false; } else
    if (e.keyCode == 83) { pong.gracze[0].w_dol = false; } else
    if (e.keyCode == 76) { pong.gracze[1].w_dol = false; }
}
 
document.addEventListener("keydown", PrzyciskWcisniety);
document.addEventListener("keyup", PrzyciskPuszony);
