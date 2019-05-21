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

function rect(nazwa, szerokosc, dlugosc, offset, kolor) {
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
    this.rysuj = function() {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.szerokosc, this.dlugosc);         //wymiary prostokata
        ctx.fillStyle = this.kolor;
        ctx.fill();
        ctx.closePath();
    }
}
