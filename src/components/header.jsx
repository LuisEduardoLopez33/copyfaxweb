import React from "react";
import logo from "../assets/copyfax-logo-ok.png"
import "../assets/css/header.css"
class Header extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(

            <nav className=" navbar bg-dark border-bottom border-body" >
                <div className="container-fluid ">
                    <a className=" navbar-brand custom-brand">
                    <img src={logo} width="40" height="45" className="d-inline-block align-text-top"/>
                            COPYFAX
                    </a>
                </div>
            </nav>
           
            
        )
    }
}
export default  Header