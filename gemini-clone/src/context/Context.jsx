import { createContext, useState } from "react"
import main from "../config/gemini";


export const Context = createContext();

const ContextProvider = (props) =>{

    const [input,setInput] = useState(""); //to save input data
    const [recentPrompt,setRecentPrompt] = useState(""); //input data will be stored in recent prompt and will display in main component
    const [prevPrompt,setPrevPrompt] = useState([]); //declared in array and used to all the input history and diplay in main page
    const [showResult,setShowResult] = useState(false);//once it is true it will hide the greet text and the boxes in main page , then it will display result
    const [loading,setLoading] = useState(false); //if its true , it will display loading animation and after getting data we can make it false
    const [resultData,setResultData] = useState("");

    const delayPara = (index,nextWord)=>{
        setTimeout(function (){
            setResultData(prev=>prev+nextWord);
        },75*index)
    }

    const newChat = ()=>{
        setLoading(false)
        setShowResult(false)
    }

    const onSent = async (prompt) => {

        setResultData("") //result data will be reset that is previous response will be removed
        setLoading(true); //for some animation
        setShowResult(true); //when data will be generated before that it will be true

        let response;
        if(prompt !== undefined){
            response = await main(prompt)
            setRecentPrompt(prompt)
        }
        else{
            setPrevPrompt(prev=>[...prev,input]) //input will be stored
            setRecentPrompt(input)
            response = await main(input)
        }


        let responseArray = response.split("**")
        let newResponse ="";
        for(let i =0; i<responseArray.length;i++){
            if(i === 0 || i%2 !== 1 ){
                newResponse += responseArray[i]
            }else{
                newResponse += "<b>" + responseArray[i] + "</b>"
            }
        }
        let newResponse2 = newResponse.split("*").join("</br>")
        let newResponseArray = newResponse2.split(" ")
        for(let i=0;i<newResponseArray.length;i++){

            const nextWord = newResponseArray[i]
            delayPara(i,nextWord + " ")

        }


        // setResultData(newResponse2);

        setLoading(false); //hide loading animation
        setInput("") //input field will be reset

  
      };
      

    const contextValue={
        prevPrompt,
        setPrevPrompt,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat
    }

return (
    <Context.Provider value={contextValue}>
        {props.children}
    </Context.Provider>
)
}

export default ContextProvider