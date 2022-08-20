import { useEffect, useState } from "react"
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import noice from "../../assets/sound/RZFWLXE-bell-hop-bell.mp3"

export const Clock = () => {
  const [minutes, setMinutes] = useState(0)
  const [time, setTime] = useState(0)
  const [secs, setSecs] = useState(0)
  const [on, setOn] = useState(false) 
  const [audio] = useState(new Audio(noice))
  const [inicio, setInicio ] = useState(false)
  const [counter, setCounter] = useState(0)
  const [rounds, setRounds] = useState(1)
  const [total, setTotal] = useState(0)


  const [data, setData ] = useState({
    fecha : '',
    tiempo: 25
  })

  const date = new Date()
  
  const start = () => {
    setInicio(true)
    setData({...data, fecha : date })
  }

  const reset = () => {
    setOn(false)
    setMinutes(0)
    setSecs(0)
    setCounter(0)
  }

  const handleTime = (e) => {
    setTime(e.target.value)
    setData({...data, tiempo: e.target.value})
  }

  const run = on => {
    if(on){
      setTimeout(() => {
        if(secs === 60){
          setMinutes(minutes + 1)
          setTotal(total + 1)
          setSecs(0)
        }else{
          setSecs(secs + 1)
        }
      if(minutes === time && 60-secs === 0 && counter < rounds) {
        audio.play()
        setCounter(counter + 1)
        setMinutes(0)
        setSecs(0)
      }else if(counter === rounds){
          alert(`completed \n tiempo estudiando ${total * rounds} minutos`)
          setOn(false)
          setMinutes(0)
          setSecs(0)
          setCounter(0)
      }
      
      
    },1000)
    }

  }
  run(on)

  return (
    <div >
      {
        inicio ? (
          <>
          <h4 style={{color:'white'}}>remaining time {time-minutes > 0 ? time-minutes : 60-secs } vueltas {counter}</h4>
          <div className="w-100 clock d-flex flex-column flex-md-row" >    
          <div style={{width: "100%", display:'grid', gap: '2rem'}}>
            <button className="btn btn-danger w-50" onClick={() => setOn(!on)} >{on ? "Pausar": "Iniciar"}</button>
            <button className="btn btn-danger w-50" onClick={reset} >Reset</button>  
          </div>
          
          <CircularProgressbar className="" value={minutes} maxValue={time} text={`${minutes} min `} />
          
          <CircularProgressbar value={secs} maxValue={60} text={`${secs} secs`} />
          </div>
          <button onClick={() => setInicio(false)} className="btn btn-success w-50" style={{marginTop: '6rem'}}>back</button>
          
          </>
            
        ) : <>
            <div>
            <select className="form-select" defaultValue={25} onChange={handleTime} aria-label="Default select example">
              <option value={1}>25 min/ 5 min</option>
              <option value={30}>30 min/ 6 min</option>
              <option value={50}>50 min/ 15 min</option>
            </select>
            <label style={{color: 'white'}} className="mx-2">rounds</label>
            <input  type="number" value={rounds} onChange={(e)=>setRounds(e.target.value)}/>
            

            
            <button onClick={start} className="btn btn-success w-100 mt-4" >start</button>
            </div>
        </>
      }
    
      
    
    </div>

  );
}


