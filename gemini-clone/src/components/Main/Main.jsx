import React,{useContext} from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/context';

  

const Main = () => {

  const {onSent,recentPrompt,showResult,loading,resultData,setInput,input} = useContext(Context)

  return (
 <div className='main' >
    <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="" />
    </div>

    <div className="main-container">

    {!showResult
    ?<>
{/* If show result is not true it will return this */}
<div className="greet">
        <p><span>Hello , Ayush.</span></p>
        <p>How Can i help you , Today?</p>
      </div>
      <div className="cards">
        <div className="card">
          <p>Suggest beuatiful places for the trip.</p>
          <img src={assets.compass_icon} alt="" />
        </div>
        <div className="card">
          <p>Briefly summarize this concept : urban planning</p>
          <img src={assets.bulb_icon} alt="" />
        </div>
        <div className="card">
          <p>Brainstorm team bonding activites for our work retreat</p>
          <img src={assets.message_icon} alt="" />
        </div>
        <div className="card">
          <p>Improve the readability of the following code</p>
          <img src={assets.code_icon} alt="" />
        </div>
      </div>

    </>
    // If result is true then
    : <div className='result'>
          <div className="result-title">
            <img src={assets.user_icon} alt="" />
            <p>{recentPrompt}</p>
          </div>
          <div className="result-data">
            <img src={assets.gemini_icon} alt="" />

              {loading //if loading is true that means response is not generated yet
              ?<div className='loader'>

                <hr />
                <hr />
                <hr />

              </div>
              :   <p dangerouslySetInnerHTML={{__html:resultData}}></p>
              /* When result data is directly written here it will display all the tags which are available in the text  to hide those tags and display as html tag for that this propoerty is used*/
            }

            
          </div>
    </div>
    }

      
      <div className="main-bottom">
        <div className="search-box">
          <input onChange={(e)=>setInput(e.target.value)}  value={input} type="text" placeholder='Enter a prompt here' />
          <div>
            <img src={assets.gallery_icon} alt="" />
            <img src={assets.mic_icon} alt="" />

            {input?<img onClick={()=>onSent()} src={assets.send_icon} alt="" />:null}

          </div>
        </div>
        <p className="bottom-info">
          Gemini may display inaccurate info , including about people , so double-check its responses.Your privacy and gemini apps.
        </p>
      </div>
    </div>
 </div>
  )
}

export default Main