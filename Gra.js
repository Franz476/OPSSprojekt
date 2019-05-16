var canvas = document.GetElementById('Pong');
var ctx = canvas.getContext('2d');
var gra = {}; //trzymać będzie wszystkie informacje o stanie gry.

//konstruktor pilki

function ball() 
{
  this.x = 0;
  this.y = 0;
  this.promien = 5;
  this.kolor = (
