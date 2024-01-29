import React from "react";
import "../assets/css/error.css"
class error extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <p className="d-inline-flex gap-1">
                    <span className="cardprin2 card card-body" data-bs-toggle="collapse" href={"#collapseData"+this.props.id} role="button" aria-expanded="false" aria-controls={"collapseData"+this.props.id} >
                        {this.props.error.event_name}
                        <span className="event-number">
                        {this.props.error.events.length}
                        </span>
                    </span>
                </p>
                
                <div className= "collapse" id={"collapseData"+this.props.id} >
                    <div className="car3 card card-body">
                        {this.props.error.events.map((item, index) => (
                            <p key={index}>{item.date + "  |  " + item.counter}</p>
                        ))}
                    </div> 
                </div>
            </div>
        )
    }
    
}
export default error;