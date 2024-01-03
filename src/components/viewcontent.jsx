import React from "react";
import Error from "./error";
import "../assets/css/viewcontent.css";


class viewContent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          grupedData:[]
        }
    }

    componentDidMount() {
      this.groupData();
    }

    // groupData = () => {
    //   const originalData  = this.props.error;
    //   const groupedData = {};
  
    //   originalData.forEach(item => {
    //     const eventname = item.event_name;
    //     if (!groupedData[eventname]) {
    //       groupedData[eventname] = [];
    //     }
    //     groupedData[eventname].push(item);
    //   });
  
    //   this.setState({ groupedData });

    //   this.setState({ groupedData }, () => {
    //     console.log("Grouped Data:", this.state.groupedData);
    //   });
    // };

    groupData = () => {
      const originalData = this.props.error;
      const groupedData = [];
    
      originalData.forEach(item => {
        const eventName = item.event_name;
        const eventData = item;  // Puedes ajustar esto según la estructura real de tus datos
    
        // Buscar si ya existe un grupo con el mismo eventName
        const existingGroup = groupedData.find(group => group.name === eventName);
    
        if (existingGroup) {
          existingGroup.events.push(eventData);
        } else {
          // Si no existe, crea un nuevo grupo
          groupedData.push({
            name: eventName,
            events: [eventData]
          });
        }
      });
    
      
    };
    

    render(){
        return (
          <React.Fragment>
          <div className="container">
            <div className="row justify-content-center align-items-center contenedo2 ">
              <div className="col-lg-12 col-xl-12 col-xxl-12 col-md-8 col-sm-8">
              
                  <div>
                  <p className="d-flex justify-content-center">
                    <span className="cardpp card card-body" data-bs-toggle="collapse" href={"#collapseExample"+this.props.id} role="button" aria-expanded="true" aria-controls={"#collapseExample"+this.props.id}>
                     {this.props.name}
                    </span>
                  </p>
                  <div className="collapse" id={"collapseExample"+this.props.id}>
                    <span className="carcollapp card card-body" data-bs-toggle="collapse" href={"#collapseData"+this.props.id} role="button" aria-expanded="true" aria-controls={"#collapseData"+this.props.id}>
                      {this.props.error.map((item, index) =>(
                        <Error error={item.event_name} fecha={item.event_date} id={item.id} counter={item.counter}/>
                      ))}
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
export default viewContent