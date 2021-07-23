import React from "react";
import Lottie from "react-lottie";
import { create } from "apisauce";

import DayData from "./DayData";

import animation from "./lotties/226-splashy-loader.json";
import './App.css';


class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      latitude: 0,
      longitude: 0,
      current: {},
      daily: [],
      status: "Loading weather app",
      loadingState: true,
      error: false
    };

    this.getData = this.getData.bind(this);
  }

  getData() {
    this.setState({ error: false });
    navigator.geolocation.getCurrentPosition((position) => {

      const lat = position.coords.latitude;
      const long = position.coords.longitude;
      const API_KEY = "2cca3eb304406c87f3cbf9857743ee40";
      let api_url = `/onecall?lat=${lat}&lon=${long}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`;  
      
      const api = create({ baseURL: "https://api.openweathermap.org/data/2.5" });
      
      api.get(api_url).then(response => {
        
        this.setState({
          latitude: lat,
          longitude: long, 
          current: response.data.current,
          daily: response.data.daily,
          loadingState: false 
        });
      }).catch((errors) => {
        // Network Error
        this.setState({ error: true });
      });
      
    }, (error) => {
      // Geolocation API Errors
      this.setState({ error: true });
    });
  }
  
  componentDidMount() {
    setTimeout(() => {
      this.getData();
      document.getElementById("load").style.display = "none";
    }, 6000);
  }
  
  options = {
    loop: true,
    autoplay: true,
    animationData: animation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  render() {
    return (
      <>
      { this.state.error && 
          <div className="container">
            <h2>Something went wrong at our end</h2>
            <button style={{width: "100px", height: "50px"}} onClick={this.getData}>Retry</button>
          </div>
      }
      <div id="load" className="container">
        { this.state.loadingState && 
          <>
            <Lottie 
	            options={this.options}
              height={250}
              width={250}
            />
            <h3>{ this.state.status }</h3>
          </> 
        }
      </div>

      { !this.state.loadingState && <div className="data">
        <h1>{ Math.floor(this.state.current.temp) }&deg;C</h1>
        <ul>
          { this.state.daily.map((day) => (
            <DayData dt={day.dt} temp={day.temp.day}></DayData>
          ))}
        </ul>
      </div>}
      </>
    );
  }
}

export default App;
