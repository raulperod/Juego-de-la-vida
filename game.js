(function(){

  class Random{
    static get(inicio,final){
      return Math.floor( Math.random() * final) + inicio;
    }
  }

  class Tablero{
    constructor(){
      this.x = 0;
      this.y = 0;
      this.width = canvas.width;
      this.height = canvas.height;
      this.cubos = [];
      this.llenarCubos();
    }
    llenarCubos(){
      for(var i = 0; i < this.height ; i+=50 ){
        for(var j = 0; j < this.width ;j+=50 ){
          this.cubos.push(new Cubo(j,i));
        }
      }
      console.log(this.cubos.length);
    }
    obtenerCubo(indice){
      return this.cubos[indice];
    }
    checarVida(){
      for(var i = 0; i < tablero.cubos.length ;i++ ){
        let suma = this.checarVecinos(i);
        if( !this.cubos[i].life ){
          if(suma == 3) this.cubos[i].darVida();
        }else{
          if(suma < 2 || suma > 3) this.cubos[i].morir();
        }
      }

    }
    checarVecinos(index){
      let suma = 0;
      if( index%10 != 0 && index > 9 && this.cubos[index-11].life ) suma++;
      if( index > 9 && this.cubos[index-10].life ) suma++;
      if( index > 9 && (index-9)%10 != 0 && this.cubos[index-9].life ) suma++;
      if( index%10 != 0 && this.cubos[index-1].life ) suma++;
      if( (index-9)%10 != 0 && this.cubos[index+1].life) suma++;
      if( (index-9)%10 != 0 && index > 0 && index < 90 && this.cubos[index+9].life) suma++;
      if( index < 90 && this.cubos[index+10].life) suma++;
      if( index < 90 && index > 0 && (index-9)%10 != 0 && this.cubos[index+11].life ) suma++;
      return suma;
    }
  }

  class Cubo{
    constructor(x,y){
      this.x = x;
      this.y = y;
      this.width = 50;
      this.height = 50;
      this.life = false;
      this.azar();
    }
    darVida(){
      ctx.fillStyle = "#15FF00"; // poner color verde
      ctx.fillRect(this.x,this.y,this.width,this.height);
      this.life = true;
    }
    morir(){
      ctx.fillStyle = "#000000"; // poner color verde
      ctx.fillRect(this.x,this.y,this.width,this.height);
      this.life = false;
    }
    azar(){
      let azar = Random.get(0,2);
      if(azar == 0) this.morir();
      else this.darVida();
    }
  }

  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  var tablero = new Tablero();
  var rect;

  function generarIndice(cx,cy){
    switch(cy){
      case 0:
        return cx;
      case 1:
        return 10 + cx;
      case 2:
        return 20 + cx;
      case 3:
        return 30 + cx;
      case 4:
        return 40 + cx;
      case 5:
        return 50 + cx;
      case 6:
        return 60 + cx;
      case 7:
        return 70 + cx;
      case 8:
        return 80 + cx;;
      case 9:
        return 90 + cx;
      default:
        return 0;
    }
  }

  window.addEventListener("click",function(evento){
    rect = canvas.getBoundingClientRect();
    console.log("x: "+(evento.clientX - rect.left)+" y: "+(evento.clientY - rect.top));
    if( (evento.clientX - rect.left) <= 500 && (evento.clientY - rect.top) <= 500 ){
      let cx = Math.floor((evento.clientX - rect.left)/50);
      let cy = Math.floor((evento.clientY - rect.top)/50);
      console.log("cx: "+cx+" cy: "+cy);
      var indice = generarIndice(cx,cy);
      console.log( indice );
      tablero.obtenerCubo( indice ).darVida();
    }
  });

  setInterval(function(){
    tablero.checarVida();
  },500);

})();
