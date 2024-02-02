import { useReducer,useRef } from "react";
import "./App.css";

function reducefunc(curstate, Actiondone){
  if (Actiondone.type === "ADD_ITEM" ){
    return [...curstate, {text:Actiondone.payload , Hidden: false}];
  }else if (Actiondone.type==="MAP_ARRAY"){
    return [...Actiondone.payload]
  }
  else{
    return curstate;
  }
}
function Giventask(){
  const [curstate, dispatch] = useReducer(reducefunc, [])
  const stroll = useRef();
  const Toggle =(datasent)=>{
    let totalArray = curstate.map((ele ,i)=>{
      if (i===datasent){
        return {
          text: ele.text,
          Hidden: !ele.Hidden,
        }
      }
      else{
        return ele;
      }
    })
    dispatch({
      type:"MAP_ARRAY",
      payload: totalArray,
    })
  }
  return (
    <div>
      <div>
        <input type="text" 
        ref={stroll} 
        onKeyDown={(e)=>{
          if (e.key == "Enter"){
            dispatch({
              type:"ADD_ITEM",
              payload: e.target.value
            })
          }
        }}
        />
      </div>
      <div>
        {curstate.map(function(ele,i){
          return (
            <div key={i} className="content">
              <h3>{ele.Hidden==true? "Text is Hidden": ele.text}</h3>
              <button onClick={()=>{
                Toggle(i)
              }}> Toggle </button>
            </div>
          )
        })}
      </div>
      <div>
        <button onClick={()=>{
          stroll.current.focus()
        }}> 
{' '} Focus Top
        </button>
      </div>
    </div>
  )
}
export default Giventask