import React from 'react'
import './HomePage.css'
import {Component} from 'react'
import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Api from "../Api/Api";
import Modal from '../componentes/modal'
import { getElementError } from '@testing-library/dom';




class HomePage extends Component{
constructor(){
   super()

   this.state = {

      paises: [],
      modal:true,
      paisescolhido:[], 
      selecionar :[]
  }
this.pesquisar = this.pesquisar.bind(this)
this.buscar = this.buscar.bind(this)
this.selecionar = this.selecionar.bind(this)
this.enviar = this.enviar.bind(this)



}

componentDidMount() {

  axios.get(`https://restcountries.eu/rest/v2/all`)
  .then(res => {
    const pais = res.data;
    this.setState({paises: pais });
  })
   
}


pesquisar(e){

    if(e.target.value === ""){

      axios.get(`https://restcountries.eu/rest/v2/all`)
      .then(res => {
        const pais = res.data;
        this.setState({paises: pais });
      })



    }else{
   

  const name = e.target.value

  axios.get(`https://restcountries.eu/rest/v2/name/${name}/`)
  .then(res => {
    const pais = res.data;
    this.setState({paisescolhido: pais });
  })
    }
}


buscar(){


  this.setState({paises: this.state.paisescolhido });


}

selecionar(e){

if(e.target.value === ""){

  axios.get(`https://restcountries.eu/rest/v2/all`)
  .then(res => {
    const pais = res.data;
    this.setState({paises: pais });
  })





}else{


   const regiao = e.target.value

  axios.get(`https://restcountries.eu/rest/v2/region/${regiao}`)
  .then(res => {
    const pais = res.data;
    this.setState({selecionar: pais });
  })
    }
  
  }

    enviar(){

      
      this.setState({paises: this.state.selecionar});
    
    
    }




render(){
return(

<div>
<div className="Header">
  
  <h1 style={{marginTop:"8px", color:"#4169E1", marginLeft:"30px"}}>BANCO DE PAÍSES</h1>
  <div className="pesquisar">
  
  <input type="text" style={{marginRight:"10px", height:"20px", borderRadius:"10px"}} onChange={(e)=>this.pesquisar(e)}/>
  <Button variant="contained" color="primary"  style={{height:"25px", marginRight:"20px"} } onClick={this.buscar}>PESQUISAR</Button>
  
  
  </div>
  
    
 <div >
<form  className="form"/>
<select name="pais"  value="" onChange={(e)=>this.selecionar(e)}>
  { this.state.paises.map(function(e){
    return(
    <option value={e.region}>{e.region}</option>
    )}
    )
}
</select>
<input type="submit" value="Enviar"  onClick={this.enviar}/>
</div>


  
  </div>
   
<div className="principal">
   
   {
       this.state.paises.map(function(e){
     


     return(

     
   <Card className="card">
      <CardActionArea >
        <CardMedia
          component="img"
          alt="Card"
          height="140"
          image={e.flag}
          title="Card"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
             {e.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        
      </CardActions>

      
    </Card>
      
    
      
        ) })
     }

    
      
      



    

    

  


</div>

</div>


)

}

}

export default HomePage