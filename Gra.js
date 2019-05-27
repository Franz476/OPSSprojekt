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
    pong.ball = new ball(10, '#d50');
    pong.gracze = [];
    pong.gracze[0] = new rect('Player 1',  15, 60, 7, '#ffcc00
    pong.gracze[1] = new rect('Player 2', 15, 60, 7, '#ffcc00
    pong.zycia = 10;
    pong.zwyciezca = 0;
    reset();
}

function reset() 
{
    pong.ball.x = canvas.width/2;
    pong.ball.y = canvas.height/2;
    pong.pauza = true;
    pong.ball.offsetX = 6;
    pong.ball.offsetY = 2;
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

function odbver(rect,circle)
{
    var dx=Math.abs(circle.x-(rect.x+rect.szerokosc/2));
    var dy=Math.abs(circle.y-(rect.y+rect.dlugosc/2));
    if( dx > circle.promien+rect.szerokosc/2 ){ return(false); }
    if( dy > circle.promien+rect.dlugosc/2 ){ return(false); }
    if( dx <= rect.szerokosc ){ return(true); }
    if( dy <= rect.dlugosc ){ return(true); }
    var dx=dx-rect.szerokosc;
    var dy=dy-rect.dlugosc
    return(dx*dx+dy*dy<=circle.promien*circle.promien);
}

// wyswietlanie wyniku
function wyswietlWynik() {
    ctx.font = "16px Verdana";
    ctx.fillStyle = "#d46";
    ctx.textAlign = "left";
    ctx.fillText(pong.gracze[0].nazwa + ": " + pong.gracze[0].wynik, 20, 20);
    ctx.textAlign = "right";
    ctx.fillText(pong.gracze[1].nazwa + ": " + pong.gracze[1].wynik, canvas.width - 20, 20);
}

// wyswietl naglowek
function wyswietlNaglowek(tekst) {
    ctx.font = '20px Verdana';
    ctx.fillStyle = '#e60';
    ctx.textAlign = 'center';
    ctx.fillText(tekst, canvas.width/2, 60);
}

// wyswietl wskazowki
function wyswietlWskazowki(tekst) {
    ctx.font = '14px Verdana';
    ctx.fillStyle = '#e60';
    ctx.textAlign = 'center';
    ctx.fillText(tekst, canvas.width/2, 90);
}

function Wynik()
{
    ctx.fillText(pong.gracze[0].nazwa + ": " + pong.gracze[0].wynik, 20, 20);
    ctx.fillText(pong.gracze[1].nazwa + ": " + pong.gracze[1].wynik, canvas.width - 20, 20);
}

function Header(tekst)
{
    ctx.fillText(tekst, canvas.width/2, 60);
}

function samouczek(tekst)
{
  ctx.fillText(tekst, canvas.width/2, 90);
}

function game()
{
    pong.ball.rysuj();
    pong.gracze[0].rysuj();
    pong.gracze[1].rysuj();
    wynik();
}

function GraSilnik()
{
    pong.ball.x += pong.ball.offsetX;
    pong.ball.y += pong.ball.offsetY;   //przesuwanie pilki
 
    if (pong.ball.y + pong.ball.promien/2 >= canvas.height || pong.ball.y - pong.ball.promien/2 <= 0)
    {
        pong.ball.offsetY = -pong.ball.offsetY;
    }   //odbijanie od pionowych scian
 
    for (i = 0; i < pong.gracze.length; i++)
    {
        if (pong.gracze[i].w_gore && pong.gracze[i].y > 0)  //ruch w gore
        {
            pong.gracze[i].y -= pong.gracze[i].offset;
        }
 
        if (pong.gracze[i].w_dol && pong.gracze[i].y + pong.gracze[i].dlugosc < canvas.height)
        {
            pong.gracze[i].y += pong.gracze[i].offset;
        }         //ruch w dol
 
        if (odbver(pong.gracze[i], pong.ball))
        {
            pong.ball.offsetX = -pong.ball.offsetX;
  
            if (pong.gracze[i].w_gore)      //przesuniecie gdy paletka sie rusza 
            { 
              pong.ball.offsetY--;
            }
            if (pong.gracze[i].w_dol)
            { 
              pong.ball.offsetY++; 
            }
        }
    }
 
    if (pong.ball.x < pong.gracze[0].szerokosc) //punkt dla prawego gracza
    {
        pong.gracze[1].wynik++;
        pong.stan = 2;
        pong.pauza = true;
    }
 
    if (pong.ball.x > canvas.width - pong.gracze[1].szerokosc) //punkt dla lewego gracza
    {
        pong.gracze[0].wynik++;
        pong.stan = 2;
        pong.pauza = true;
    }
 
    for (i = 0; i < pong.gracze.length; i++)    //wygrana gracza x
    {
        if (pong.gracze[i].wynik == pong.zycia)
        {
            pong.stan = 3;
            pong.pauza = true;
            pong.zwyciezca = i;
        }
    }
}
