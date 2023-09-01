var personagem, personagemImg, morteImg
var fantasma, fantasmaImg
var chaoImg
var fantasmas
var paredeE, paredeD, paredeC, paredeB
var vidas, zc, uc, dc, tc
var vida=3
var pos = [
    {x:420,y:300},
    {x:780,y:300},
    {x:420,y:1050},
    {x:780,y:1050},
    {x:150,y:600},
    {x:150,y:840},
    {x:1050,y:600},
    {x:1050,y:840},
]

console.log(vida)

function preload(){
    personagemImg=loadAnimation("wizard1.png","wizard2.png")
    morteImg=loadAnimation("deadwizard.png")
    fantasmaImg=loadAnimation("ghost1.png","ghost2.png")
    chaoImg=loadImage("floor.png")
    zc=loadImage("0c.png")
    uc=loadImage("1c.png")
    dc=loadImage("2c.png")
    tc=loadImage("3c.png")
}
function setup() {
    createCanvas(1200,1200);
    personagem = createSprite(600,700)
    personagem.addAnimation("correndo",personagemImg)
    personagem.addAnimation("morte",morteImg)
    fantasmas = new Group ()
    paredeC = createSprite(600,220,1200,140)
    paredeB = createSprite(600,1150,1200,140)
    paredeE = createSprite(60,600,120,1200)
    paredeD = createSprite(1140,600,120,1200)
    paredeC.visible=false
    paredeB.visible=false
    paredeE.visible=false
    paredeD.visible=false
}

function draw() {
    background(chaoImg);
    //códigos que serão executados ao longo de todo o jogo
    controlar()
    spawnFantasma()
    moverFantasma()
    if(personagem.isTouching(fantasmas)&&vida>0){
            vida--
            fantasmas.destroyEach()
        
    }

    drawSprites();

    personagem.collide(paredeC)
    personagem.collide(paredeB)
    personagem.collide(paredeE)
    personagem.collide(paredeD)

    textAlign("center")
    textSize(20)
    stroke("black")
    strokeWeight(5)
    fill ("white")

    text ("x: "+mouseX + " y: "+mouseY, mouseX, mouseY-30)
    if(vida==3){
        vidas=image(tc,50,-90,300,300)
    }
    if(vida==2){
        vidas=image(dc,50,-90,300,300)
    }
    if(vida==1){
        vidas=image(uc,50,-90,300,300)
    }
    if(vida==0){
        vidas=image(zc,50,-90,300,300)
        personagem.changeAnimation("morte")
    }
}

function controlar(){
    if(vida>0){
        if(keyDown(UP_ARROW)){
            personagem.y-=10
        }
        if(keyDown(DOWN_ARROW)){
            personagem.y+=10
        }
        if(keyDown(LEFT_ARROW)){
            personagem.x-=10
        }
        if(keyDown(RIGHT_ARROW)){
            personagem.x+=10
        }
    }

}

function spawnFantasma(){
    if(frameCount%100==0){
        var i = Math.round(random(0,7))
        var x = pos[i].x
        var y = pos[i].y
        fantasma=createSprite(x,y)
        fantasma.addAnimation("correndo",fantasmaImg)
        fantasmas.add(fantasma)
    }
}

function moverFantasma(){
    if(personagem.x>fantasmas.x){
        fantasmas.velocityX=2
    }
}