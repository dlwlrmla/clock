import './App.css';
import {Clock} from "./pages/clock/Clock"


function App() {


  return (
    <div style={{textAlign: 'center'}}>
    <h1 style={{color : 'white',}} className="my-5">PlayGround</h1>
    
      <div style={{display: 'flex', justifyContent:'center', alignItems:'center', width: '100%'}} className=" ">
            <Clock/>
      </div>
    </div>
    

  );
}

export default App;
