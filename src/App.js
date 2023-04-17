import "./App.css";
import { useState, useEffect } from "react";
import { FormControl } from "react-bootstrap";
import axios from "axios";

function App() {
  let [Data, setData] = useState({});
  let [input, setinput] = useState("");
  let [loc, setloc] = useState("");
  let [temp, settemp] = useState("");
  let [cond, setcond] = useState("");
  let [fell, setfell] = useState("");
  let [hum, sethum] = useState("");
  let [wind, setwind] = useState("");
  let [loading, setLoading] = useState(false);
  let url = `http://api.weatherapi.com/v1/current.json?key=912b188ebf494e7f853184345231003&q=${input}`;
  let searchLocationurl = async () => {
    setLoading(true);
    try {
      const res = await axios.get(url);
      setData(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  let focus = () => {
    setloc("");
    settemp("");
    setcond("");
    setfell("");
    sethum("");
    setwind("");
    setData("");
  };
  let searchLocation = () => {
    if (input && Data.location) {
      setloc(Data.location.country);
      settemp(Data.current.temp_c);
      setcond(Data.current.condition.text);
      setfell(Data.current.feelslike_c);
      sethum(Data.current.humidity);
      setwind(Data.current.wind_mph);
    }
  };
  const handleInputChange = (event) => {
    setinput(event.target.value);
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      searchLocation();
    }
  };
  useEffect(() => {
    searchLocation();
  }, [Data]);
  return (
    <div className="App">
      <div className="bg">
        <FormControl
          type="text"
          placeholder="Enter Location"
          className="my-input"
          onChange={handleInputChange}
          onFocus={focus}
          onBlur={searchLocationurl}
          onKeyDown={handleKeyDown}
        />
        <button className="search" onClick={searchLocation} disabled={loading}>
          {loading ? "Loading..." : "Search"}
        </button>
        <div className="container">
          <div className="result">
            <p className="c_name">{loc}</p>
            <p className="degree">{temp}°C</p>
          </div>
          <p className="status">{cond}</p>
        </div>
        {/* ////////////////////////////////////////////////// */}

        <div className="prediction">
          <div className="comp">
            <p>{fell} °C</p>
            <p>Feels Like</p>
          </div>
          <div className="comp">
            <p>{hum} %</p>
            <p>Humidity</p>
          </div>
          <div className="comp">
            <p>{wind} MPH</p>
            <p>Wind Speed</p>
          </div>
        </div>
        {/* //////////////////////////////////////////////////////////////////////// */}
      </div>
    </div>
  );
}

export default App;