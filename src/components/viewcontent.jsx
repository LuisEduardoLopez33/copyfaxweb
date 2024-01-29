import React from "react";
import Error from "./error";
import "../assets/css/viewcontent.css";
import iconDelete from "../assets/delete-icon.svg"


class viewContent extends React.Component{
    constructor(props){
        super(props);

        this.state = {
          grupedData:[],

        }
    }

    componentDidMount() {
      this.obtainProperties();

    }

    
    obtainProperties = () => {
      let events = this.props.email.events;
      let result = [];
    
      if (events.length > 0) {
        let grouped = events.reduce((acc, curr) => {
          if (!acc[curr.event_name]) {
            acc[curr.event_name] = [];
          }
          let event = {
            date: curr.event_date,
            counter: curr.counter
          }
          acc[curr.event_name].push(event);
          return acc;
        }, {});
    
        for (let event_name in grouped) {
          result.push({
            event_name: event_name,
            events: grouped[event_name]
          });
        }
      }
      this.setState({grupedData: result})     
    }
    


    render(){
        return (
          <React.Fragment>
            <div className="container">
              <div className="row justify-content-center align-items-center contenedo2 ">
                <div className="col-lg-12 col-xl-12 col-xxl-12 col-md-8 col-sm-8">
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px' }}>
                      <div className="cardpp card card-body d-flex flex-row justify-content-between p-3" data-bs-toggle="collapse" href={"#collapseExample"+this.props.email.id} role="button" aria-expanded="true" aria-controls={"#collapseExample"+this.props.email.id}>  
                        <span >
                          {this.props.email.serie} | {this.props.email.device_name}
                        </span>
                        <span className="texto-rojo">
                          {this.props.email.events.length}
                        </span>
                      </div>
                      <button style={{ background: 'transparent', border: 'none' }} onClick={() => this.props.deleteEvent(this.props.email.id)}>
                        <img src={iconDelete} alt="Eliminar" width="40"/>
                      </button>
                    </div>
                    <div className="collapse" id={"collapseExample"+this.props.email.id}>
                      <span className="carcollapp card card-body " data-bs-toggle="collapse" href={"#collapseData"+this.props.email.id} role="button" aria-expanded="true" aria-controls={"#collapseData"+this.props.email.id}>
                        { this.state.grupedData.length > 0 ? (this.state.grupedData.map((item, index) =>(
                          <Error key={index} error={item} id={this.props.email.id}/>
                        ))): null}
                      </span>
                    </div> 
                  </div>
                </div>
              </div>
            </div>
          </React.Fragment>
        );
    } 
}
export default viewContent;