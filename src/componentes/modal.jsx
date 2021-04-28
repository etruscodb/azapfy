import React from 'react'
import {Component} from 'react'
import './modal.css'


class Modal extends Component {
constructor(props){
super(props)



}


render(){
return(


<div className="caixaModal">


<h2>nome:{this.props.name}</h2>
<h2>capital:{this.props.capital}</h2>

</div>

)
}
}

export default Modal