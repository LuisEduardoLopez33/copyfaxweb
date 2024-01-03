import React, { useState, useEffect } from 'react';
import Header from "../components/header";
import Footer from '../components/footer';
import "../assets/css/homePage.css"
import ViewContent from "../components/viewcontent";
import axios from 'axios';
import svgBackground from "../assets/delete-svgrepo-com.svg"


function HomePage(){
    
  const [eventos, setEventos] = useState([]);
  const [filter, setFilter] = useState('');
  const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/email/all');
        setEventos(response.data.data);
    
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

  useEffect(() => {
   
      fetchData();
      const interval = setInterval(() => {
        fetchData();
      }, 300000); 
      return () => clearInterval(interval);
    }, []);

    const handleButtonClick = async (index) => {
      try {
        await axios.delete(`http://localhost:5000/email/delete/${index}`);
        fetchData();
      } catch (error) {
        console.error('Error al eliminar el elemento:', error);
      }
      
    };
    
    const filteredEventos = eventos.filter((item) =>
    item.serie.toLowerCase().includes(filter.toLowerCase())
    );
    return (
        <div className=" fondo container-lg-11 container-xl-11 container-xxl-11 container-md-11 container-sm-10 ">
            <div>
                <Header/>
            </div>
            <div>
              
            </div>
            <div className=" fila container-lg-10 container-xl-10 container-xxl-10 container-md-12 container-sm-12 ">
            {filteredEventos.map((item, index) => (
              <div className='row lg-12 xl-12 xxl-12 md-8 sm-8'>
                <div className='col-lg-2 col-xl-2 col-xxl-2 col-md-2 col-sm-2 '>

                </div>
                <div className='col-lg-8 col-xl-8 col-xxl-8 col-md-3 col-sm-3 '>
                  <ViewContent key = {index} name={item.serie+" | "+ item.device_name} error={item.events}  id={"item"+index}/>
                </div>
                
                {/* <div className="columnbuton col-lg-1 col-xl-1 col-xxl-1 col-md-1 col-sm-1 ">
                  <span className="deletebuton card "   role="button" onClick={() => handleButtonClick(item.id)}  >
                    <img src={svgBackground} width="20" height="20" className='card-img'/>
                  </span>
                </div> */}
              </div>
            ))}
            
            </div>
            <div>
                <Footer/>
            </div>
            
        </div>
       
    )
}
export default HomePage;