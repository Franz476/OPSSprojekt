var canvas = document.getElementById('Pong');
var ctx = canvas.getContext('2d');
var pong = {}; //trzymać będzie wszystkie informacje o stanie gry.
canvas.width = window.innerWidth - 16;
canvas.height = window.innerHeight * 0.85;
var Odbicie = document.getElementById("Odbicie");
var OdbiciePoziome = document.getElementById("OdbiciePoziome");
var Win = document.getElementById("Win");
var Punkt = document.getElementById("Punkt");

var Licznik = 1;

function PaPa()
{
	Odbicie.play();
}


//konstruktor pilki

function ball() 
{
  this.x = 0;
  this.y = 0;
  this.offsetX = 10,     //przesuniecie pilki w OX
  this.offsetY = 10,     //przesuniecie pilki w OY
  this.promien = 7;     //rozmiar pilki
  this.kolor = 'rgb(0,0,0)';
  this.rysuj = function()
  {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.promien, 0, Math.PI*2);
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
    this.kolor = 'rgb(255,255,255)';
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
    pong.pauza = true;
    pong.ball = new ball(10, '#d50');
    pong.gracze = [];
    pong.gracze[0] = new rect('Player 1',  15, 120, 7);
    pong.gracze[1] = new rect('Player 2', 15, 120, 7);
    pong.zycia = 10;
    pong.zwyciezca = 0;
    reset();
	pong.gracze[0].wynik = 0;
	pong.gracze[1].wynik = 0;
}

function reset() 
{
    pong.ball.x = canvas.width/2;
    pong.ball.y = canvas.height/2;
    pong.pauza = true;
    pong.ball.offsetX = 6;
    pong.ball.offsetY = 2;
    pong.gracze[0].x = 0;
    pong.gracze[1].x = canvas.width - pong.gracze[1].szerokosc;
    pong.gracze[0].y = (canvas.height - pong.gracze[0].dlugosc)/2;
    pong.gracze[1].y = (canvas.height - pong.gracze[1].dlugosc)/2;
}

function PrzyciskWcisniety(e) {
    if (e.keyCode == 87) { pong.gracze[0].w_gore = true; } else
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
document.addEventListener("keyup", PrzyciskPuszczony);

function odbver(rect,circle)
{
    var dx=Math.abs(circle.x-(rect.x+rect.szerokosc/2));
    var dy=Math.abs(circle.y-(rect.y+rect.dlugosc/2));
    if( dx > circle.promien+rect.szerokosc/2 )
	{ 
		return(false); 
	}
    if( dy > circle.promien+rect.dlugosc/2 )
	{
		return(false);
	}
    if( dx <= rect.szerokosc )
	{
		return(true);
	}
    if( dy <= rect.dlugosc )
	{
		return(true); 
	}
    var dx=dx-rect.szerokosc;
    var dy=dy-rect.dlugosc
    return(dx*dx+dy*dy<=circle.promien*circle.promien);
}

function Wynik()
{
	ctx.font = '30px Lato';
	ctx.textAlign = 'left';
    ctx.fillText(pong.gracze[0].nazwa + ": " + pong.gracze[0].wynik, 20, 20);
	ctx.textAlign = 'right';
    ctx.fillText(pong.gracze[1].nazwa + ": " + pong.gracze[1].wynik, canvas.width - pong.gracze[1].szerokosc, 20);
}

function Header(tekst)
{
	ctx.font = '20px Lato';
	ctx.textAlign = 'center';
    ctx.fillText(tekst, canvas.width/2, 60);
}

function samouczek(tekst)
{
	ctx.font = '20px Lato';
	ctx.textAlign = 'center';
	ctx.fillText(tekst, canvas.width/2, 90);
}

function rysowaniegry()
{
    pong.ball.rysuj();
    pong.gracze[0].rysuj();
    pong.gracze[1].rysuj();
    Wynik();
}

function GraSilnik()
{
    pong.ball.x += pong.ball.offsetX;
    pong.ball.y += pong.ball.offsetY;   //przesuwanie pilki
 
    if (pong.ball.y + pong.ball.promien/2 >= canvas.height || pong.ball.y - pong.ball.promien/2 <= 0)
    {
        pong.ball.offsetY = -pong.ball.offsetY;
		OdbiciePoziome.play();
    }   //odbijanie od poziomych scian
 
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
            pong.ball.offsetX = -pong.ball.offsetX * (0.04 * Licznik + 1);
  
            if (pong.gracze[i].w_gore)      //przesuniecie gdy paletka sie rusza 
            { 
              pong.ball.offsetY--;
            }
            if (pong.gracze[i].w_dol)
            { 
              pong.ball.offsetY++; 
            }
			PaPa();
			Licznik = Licznik + 1;
        }
    }
 
    if (pong.ball.x < pong.gracze[0].szerokosc) //punkt dla prawego gracza
    {
        pong.gracze[1].wynik++;
        pong.stan = 2;
        pong.pauza = true;
		Punkt.play();
    }
 
    if (pong.ball.x > canvas.width - pong.gracze[1].szerokosc) //punkt dla lewego gracza
    {
        pong.gracze[0].wynik++;
        pong.stan = 2;
        pong.pauza = true;
		Punkt.play();
    }
 
    for (i = 0; i < pong.gracze.length; i++)    //wygrana gracza x
    {
        if (pong.gracze[i].wynik == pong.zycia)
        {
            pong.stan = 3;
            pong.pauza = true;
            pong.zwyciezca = i;
			Win.play();			
        }
    }
}

function Game()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    rysowaniegry();
 
    if (pong.pauza)
    {
        switch(pong.stan)
        {
            case 0:
                Header('Ruch lewy: W,S, a prawy P,L');
                samouczek('(Wciśnij SPACJĘ)');
                break;
            case 2:
                reset();
                Header('Zdobyto Punkt!!!');
                samouczek('PRESS SPACEBAR');
                break;
            case 3:
                reset();
                Header(pong.gracze[pong.zwyciezca].nazwa + ' ' + 'zwycieza!!!');
                samouczek('PRESS SPACEBAR TO PLAY NEW GAME');
                break;
            default:
                Header('STOP');    
                samouczek('PRESS SPACEBAR TO CONTINUE');
        }
    }
  else
    {
        switch(pong.stan) {
            case 0:
            case 2:
                pong.stan = 1;
                break;
            case 3:
                poczatek();
                break;
            default:
                GraSilnik();
        }
    }
    requestAnimationFrame(Game);
}
poczatek();
Game();
