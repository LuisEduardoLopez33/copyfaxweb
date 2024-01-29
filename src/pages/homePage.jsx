import React, { useState, useEffect } from 'react';
import Header from "../components/header";
import Footer from '../components/footer';
import "../assets/css/homePage.css"
import ViewContent from "../components/viewcontent";
import axios from 'axios';
import svgBackground from "../assets/delete-svgrepo-com.svg"


function HomePage(){
    
  const [eventos, setEventos] = useState([]);
 

  const fetchData = async () => {
    try {
      const axiosInstance = axios.create({
        baseURL: 'http://189.250.23.54',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*', 
        },
      });

      const response = await axiosInstance.get('/email/all');
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
    const filtrarEventosRecientes = () => {
      
      const eventosFiltrados = eventos.filter(item => item.events).sort((a, b) => new Date(b.events[0].event_date) - new Date(a.events[0].event_date));
      setEventos(eventosFiltrados);
    };
    const calcularTotalEventos = (dataevent) => {
      let totalEventos = 1;
    
      if (Array.isArray(dataevent)) {
        dataevent.forEach(item => {
          if (item.events && Array.isArray(item.events)) {
            totalEventos += item.events.length;
          }
        });
      }
    
      return totalEventos;
    };

    return (
        <div className=" fondo container-lg-11 container-xl-11 container-xxl-11 container-md-11 container-sm-10 ">
            <div>
                <Header/>
            </div>
            <div>
            
            </div>
            <div className=" fila container-lg-10 container-xl-10 container-xxl-10 container-md-12 container-sm-12 ">
            {eventos.map((item, index) => (
              <div className='row lg-12 xl-12 xxl-12 md-8 sm-8'>
                <div className='col-lg-2 col-xl-2 col-xxl-2 col-md-2 col-sm-2 '>

                </div>
                <div className='col-lg-8 col-xl-8 col-xxl-8 col-md-3 col-sm-3 '>
                  <ViewContent key = {index} name={item.serie+" | "+ item.device_name} error={item.events}  id={"item"+index} total={calcularTotalEventos(item)}/>
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