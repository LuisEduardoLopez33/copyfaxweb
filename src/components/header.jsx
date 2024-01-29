import React from "react";
import logo from "../assets/copyfax-logo-ok.png"
import "../assets/css/header.css"
class Header extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(

            <nav className="navbar bg-dark border-bottom border-body">
            <div className="container-fluid d-flex">
                <a className="navbar-brand custom-brand d-flex align-items-center">
                    <img src={logo} width="40" height="45" className="d-inline-block align-self-center me-4"/>
                    <span className="align-self-center">COPYFAX</span>
                </a>
            </div>
            </nav>
        )
    }
}
export default  Header