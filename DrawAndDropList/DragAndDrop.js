import React from 'react';
import './DragAndDrop.css'


var archivos={
  Recibidos:[],
  Aseptados:[],
  Rechazados:[]
}

var mensajes=[]

function mensajes_ramdom(){
  var min = 5;
  var max= 15;
  var num=Math.floor(Math.random()*(max-min +1)+min);
  var eventos=["Recibidos","Aseptados","Rechazados"];
  
  for(var sec=0; sec < num ;sec++){
  
    var elemento={
      nombre:"mensaje"+sec,
      categoria:eventos[Math.floor(Math.random()*3)]
    }
    mensajes.push(elemento)
  
  }
  
}
mensajes_ramdom();


export default class DragAndDrop extends React.Component {
      constructor(props){
        super(props);
        this.state=({
          mensajes:mensajes
        })
      }
      


      onDragStart=(datos,nombre)=>{
        datos.dataTransfer.setData("nombre",nombre);
      }

      onDragOver=(datos)=>{
        datos.preventDefault()
      }

      onDrop=(datos,categoria)=>{
        var nombre=datos.dataTransfer.getData("nombre");
        var nuevos_mensajes =this.state.mensajes.filter((valor)=>{

          if(valor.nombre === nombre){
            valor.categoria = categoria;
        }
        return valor

        })

        this.setState({
          mensajes:nuevos_mensajes
        })

        archivos={
          Recibidos:[],
          Aseptados:[],
          Rechazados:[]
        
        }

      }
     

      render(){

        this.state.mensajes.forEach((valor,indice)=>{
          var elemento= <div key={indice} draggable onDragStart={(datos)=>{this.onDragStart(datos,valor.nombre)}} className="mensaje" >{valor.nombre}</div>
          archivos[valor.categoria].push(elemento)
        })



        return(

              <div className='contenedor_scroll'>
                
                  <div className='cont_Recibidos'  onDragOver={(datos)=>{this.onDragOver(datos)}} onDrop={(datos)=>{this.onDrop(datos,"Recibidos")}}>
                    <h3>Recibidos</h3>
                    {archivos.Recibidos}
                    
                  </div>

                  <div className='cont_Aseptados'onDragOver={(datos)=>{this.onDragOver(datos)}} onDrop={(datos)=>{this.onDrop(datos,"Aseptados")}} >
                    <h3>Aseptados</h3>
                    {archivos.Aseptados}
                    
                  </div>

                  <div className='cont_Rechazados'onDragOver={(datos)=>{this.onDragOver(datos)}} onDrop={(datos)=>{this.onDrop(datos,"Rechazados")}} >
                    <h3>Rechazados</h3>
                    {archivos.Rechazados}
                    
                  </div>

              </div>

              )

      }
}