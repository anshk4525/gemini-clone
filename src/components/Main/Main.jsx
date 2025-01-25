import React, { useContext, useState } from "react"
import "./Main.css"
import { assets } from "../../assets/assets"
import { context } from "../../context/Context"

const App =()=>
{
       
        const { handleCardClick,onsent,recentPrompt,showResult,Loading,resultData,setInput,Input,} = useContext(context)
  return(
    <div className="main">
  <div className="nav">
    <p>Gemini</p>
    <img src={assets.user_icon} alt=""></img>
  </div>
  <div className="main-container">

    {!showResult?<>
      <div className="greet">
    <p>
      <span>
        hello,Ansh.
      </span></p>
      <p> How can i help you today?</p>
      </div>
    <div className="cards">
      <div onClick={() => handleCardClick('suggest beautiful places to an upcoming road trip')} className="card">
        <p>suggest beautiful places to 
          an upcoming road trip</p>
        <img src={assets.compass_icon} alt=""></img>
      </div>
      <div onClick={() => handleCardClick('briefly summarize this concept , urban planning')} className="card">
        <p>briefly summarize this concept , urban planning</p>
        <img src={assets.bulb_icon} alt=""></img>
      </div>
      <div onClick={() => handleCardClick('brainstorm team bonding activities for our work')}  className="card">
        <p>brainstorm team bonding activities for our work</p>
        <img src={assets.message_icon} alt=""></img>
      </div>
      <div onClick={() => handleCardClick('improve relaibility if followin code')}  className="card">
        <p>improve relaibility if followin code</p>
        <img src={assets.code_icon} alt=""></img>
      </div>
    </div>
    </>
   :<div className="result">
    <div className="result-title">
      <img src={assets.user_icon} alt=""/>
      <p> {recentPrompt}</p>
    </div>
    <div className="result-data">
      <img src={assets.gemini_icon} alt="" />
      {Loading
      ?<div className="loader">
       <hr/>
       <hr/>
       <hr/>
      </div>
      : <p dangerouslySetInnerHTML={{__html:resultData}}></p>}

     
    </div>
   </div> 
  }
    
    <div className="main-bottom">
      <div className="search">
        <input onChange={(e)=>setInput(e.target.value)} value={Input} type="text" placeholder="enter a prompt here"/>
        <div>
          <img src={assets.gallery_icon}/>
          <img src={assets.mic_icon}/>
          {Input?<img onClick={()=>onsent()} src={assets.send_icon}/> :null}
        </div>
      </div>
      <p className="bottom-info">
        Gemini may display inaccurate info,including about people, so double-check its resposes. your privacy and Gemini Apps
      </p>

    </div>
  </div>
  </div>
  )
}
export default App