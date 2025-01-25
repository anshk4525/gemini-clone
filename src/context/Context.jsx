import { createContext, useState } from "react";
import runChat from "../config/gemini";

export const context = createContext();

const ContextProvider = (props) => { 
 

        const[Input,setInput] = useState("");
        const [recentPrompt, setrecentPrompt] = useState("");
        const [previousPrompts, setpreviousPrompts] =useState([]);
        const [showResult,setshowResult] =useState(false);
        const[ Loading, setLoading] = useState(false);
        const[resultData, setresultData] = useState("");
        const delayPara = (index, nextWord) => {
            setTimeout(function () {
              setresultData((prev) => prev + nextWord);
            }, 75 * index);
        }
        const handleCardClick = (text) => {
            setInput(text);
            onsent(text);
            setpreviousPrompts((prev) => [...prev, text]); }
        const newchat= ()=>{
            setLoading(false)
            setshowResult(false)
        }
        const onsent = async (prompt) => {

            setresultData("")
            setLoading(true)
            setshowResult(true)
             
            let response;
            if(prompt !==undefined){
              response = await runChat(prompt);
              setrecentPrompt(prompt)
            }
            else{
                setpreviousPrompts(prev=>[...prev,Input])
                setrecentPrompt(Input)
                response = await runChat(Input)
            }
           
         let responseArray = response.split("**");
         let newresponse ="" ;
         for(let i=0 ;i< responseArray.length;i++){

            if (i===0 || i%2 !== 1  )
            {
                newresponse+= responseArray[i];
            }
        else{
            newresponse+="<b>"+responseArray[i]+"</b>"
        }
         }
         let newResponse2 = newresponse.split("*").join("</br>");
         let newResponseArray = newResponse2.split(" ");
         for (let i = 0; i < newResponseArray.length; i++) {
           const nextWord = newResponseArray[i];
           delayPara(i, nextWord + " ");
        }
         setLoading(false)
         setInput("")
    };



    const contextvalue = {
        previousPrompts,
        setpreviousPrompts,
        onsent,
        recentPrompt,
        setrecentPrompt,
        showResult,
        Loading,
        resultData,
        Input,
        setInput,
        newchat,
        handleCardClick
    
    };

    return (
        <context.Provider value={contextvalue}>
            {props.children}
        </context.Provider>
    );
};

export default ContextProvider;
