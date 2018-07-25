import {connect} from 'react-redux'
import React from 'react'
import {getAllProducts} from '../store/products'
import {Link, Route} from 'react-router-dom'

class allProducts extends React.Component{
    async componentDidMount(){
        await this.props.getProducts()
    }

    render(){
        return(
            <ul>
                {this.props.allProducts.map((product)=>{
                    return(
                        <h3 key = {product.id}>{product.name}</h3>
                    )
                })}
            </ul>
        )
    }
}

const mapState = (state)=>{
    return{
        allProducts: state.products
    }
}
const mapDispatch = (dispatch)=>{
    return{
        getProducts: ()=>dispatch(getAllProducts())
    }
}

export default connect(mapState,mapDispatch)(allProducts)