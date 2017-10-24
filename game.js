(function(){

   class Random{

      static get(inicio, final){
         return Math.floor( Math.random() * final) + inicio
      }

   }

   class Tablero{

      constructor(){
         this.x = 0
         this.y = 0
         this.width = canvas.width
         this.height = canvas.height
         this.cubos = []
         this.llenarCubos()
      }

      llenarCubos(){
         for(let i=0 ; i < this.height ; i+=50){
            for(let j=0 ; j < this.width ; j+=50){
               this.cubos.push(new Cubo(j, i))
            }
         }
      }

      obtenerCubo(indice){
         return this.cubos[indice]
      }

      checarVida(){
         for(let i=0 ; i < tablero.cubos.length ; i++ ){
            let suma = this.checarVecinos(i)
            if( !this.cubos[i].life ){
               if(suma == 3) this.cubos[i].darVida()
            }else{
               if(suma < 2 || suma > 3) this.cubos[i].morir()
            }
         }

      }
      checarVecinos(index){
         let suma = 0
         if( index%10 != 0 && index > 9 && this.cubos[index-11].life ) suma++
         if( index > 9 && this.cubos[index-10].life ) suma++
         if( index > 9 && (index-9)%10 != 0 && this.cubos[index-9].life ) suma++
         if( index%10 != 0 && this.cubos[index-1].life ) suma++
         if( (index-9)%10 != 0 && this.cubos[index+1].life) suma++
         if( (index-9)%10 != 0 && index > 0 && index < 90 && this.cubos[index+9].life) suma++
         if( index < 90 && this.cubos[index+10].life) suma++
         if( index < 90 && index > 0 && (index-9)%10 != 0 && this.cubos[index+11].life ) suma++
         return suma
      }
   }

   class Cubo{

      constructor(x, y){
         this.x = x
         this.y = y
         this.width = 50
         this.height = 50
         this.life = false
         this.azar()
      }

      darVida(){
         ctx.fillStyle = "#15FF00" // poner color verde
         ctx.fillRect(this.x, this.y, this.width, this.height)
         this.life = true
      }

      morir(){
         ctx.fillStyle = "#000000" // poner color verde
         ctx.fillRect(this.x, this.y, this.width, this.height)
         this.life = false
      }

      azar(){
         (Random.get(0, 2) == 0) ? this.morir() : this.darVida()
      }

   }

   const canvas = document.getElementById("canvas")
   const ctx = canvas.getContext("2d")
   let tablero = new Tablero()
   let rect

   function generarIndice(cx, cy){
      return( cy < 10 ) ? cx + 10 * cy : 0
   }

   window.addEventListener("click",function(evento){
      rect = canvas.getBoundingClientRect()
      if( (evento.clientX - rect.left) <= 500 && (evento.clientY - rect.top) <= 500 ){
         let cx = Math.floor((evento.clientX - rect.left)/50)
         let cy = Math.floor((evento.clientY - rect.top)/50)
         var indice = generarIndice(cx, cy)
         tablero.obtenerCubo( indice ).darVida()
      }
   })

   setInterval(function(){
      tablero.checarVida()
   },500)

})()
