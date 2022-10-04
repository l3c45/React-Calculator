import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';


function Buttons(props){
  return (
    <div id="pads">
      <button
      onClick={props.clear}
       id="clear"
       class="small">
        AC
      </button>
      <button
       onClick={props.operator}
       id="divide"
       class="small">
        /
      </button>
      <button
      onClick={props.operator}
       id="multiply"
       class="small">
        *
      </button>
      <button
      onClick={props.inputKey}
       id="seven"
       class="small">
        7
      </button>
      <button
      onClick={props.inputKey}
       id="eight"
       class="small">
        8
      </button>
      <button
      onClick={props.inputKey}
       id="nine"
       class="small">
        9
      </button>
      <button
      onClick={props.operator}
       id="subtract"
       class="small">
        -
      </button>
      <button
      onClick={props.inputKey}
       id="four"
       class="small">
        4
      </button>
      <button
      onClick={props.inputKey}
       id="five"
       class="small">
        5
      </button>
      <button
      onClick={props.inputKey}
       id="six"
       class="small">
        6
      </button>
      <button
      onClick={props.operator}
       id="add"
       class="small">
        +
      </button>
      <button
      onClick={props.inputKey}
       id="one"
       class="small">
        1
      </button>
      <button
      onClick={props.inputKey}
       id="two"
       class="small">
        2
      </button>
      <button
      onClick={props.inputKey}
       id="three"
       class="small">
        3
      </button>
      <button
      onClick={props.evaluate}
       id="equals"
       >
        =
      </button>
      <button
      onClick={props.inputKey}
       id="zero"
       class="small">
        0
      </button>
      <button
      onClick={props.inputKey}
       id="decimal"
       class="small">
        .
      </button>
    </div>
  )
}

function Display(props){
  return (
    <div id="down"> 
      <div id="up">{props.output}</div>
      <div id="display">{props.input}</div>
    </div>
  )
}


class Calculator extends React.Component{
  constructor(props){
    super(props)
    this.state={
      input:"0",
      output:"",
      limit:false,
      prev:"",
      message:false,
      dot:false,
      result:"",
      prevIsNumber:false,
      prevOperator:""
      
    }
    this.clear=this.clear.bind(this)
    this.inputKey=this.inputKey.bind(this)
    this.limitReach=this.limitReach.bind(this)
    this.operator=this.operator.bind(this)
    this.evaluate=this.evaluate.bind(this)
  }
  
  evaluate(){
    let b=this.state.output.slice(
      this.state.output.lastIndexOf("=")+1,this.state.output.length
      )

    let cuenta=eval(b.replace(/[-]{2}|[+]{2}/g, '+'))
    this.setState({
      output:this.state.output.concat("="+cuenta),
      input:cuenta
    })
  }

  operator(e){
    let keyPressed=(e.target.innerText)
    
    if(!this.state.prevIsNumber){
      if(this.state.prevOperator==="-"&&keyPressed==="+"){
        this.setState((state)=>({
           input:keyPressed,
           output:state.output.slice(0,state.output.slice.length-1),
           dot:false,
           prevIsNumber:false,
           prevOperator:keyPressed
          })
        )
      }

    }

    this.setState((state)=>({
      input:keyPressed,
      output:state.output.concat(keyPressed),
      dot:false,
      prevIsNumber:false,
      prevOperator:keyPressed
      })
    )
  }

  clear(){
    this.setState((state)=>({
      input:"0",
      output:"",
      limit:false,
      dot:false,
      prevIsNumber:false,
      prevOperator:""
      })
    )
  }

  inputKey(e){
    //MENSAJE LIMITE DE CARACTERES
    if (this.state.input.length===11&&this.state.message===false){
      return this.limitReach()
    }

    if(this.state.limit===false){
      let keyPressed=(e.target.innerText)
      let regex=/^[0+-/*]+/g;
      
        if(keyPressed==="."){
          this.setState({
            dot:true
          })
        }

      if(!this.state.dot||(this.state.dot&&keyPressed!=="."))

        if(regex.test(this.state.input)){
         this.setState((state)=>({
            input:keyPressed,
            output:state.output.concat(keyPressed),
            prevIsNumber:true
            })
          )
        } else {
          this.setState((state)=>({
           input:state.input.concat(keyPressed),
           output:state.output.concat(keyPressed),
           prevIsNumber:true
           })
          )
          }
    }
  }
  
  limitReach(){
     this.setState({
     limit:true,
     prev:this.state.input,
     input:"LIMIT REACH",
     message:true
    })

    setTimeout(()=>(
     this.setState({
       input:this.state.prev,
       message:false,
       limit:false
      })
    ),1000)
  }

  render(){

    return (
      <div id="calculator">
     
       <Display
        input={this.state.input} 
        output={this.state.output}/>
       
       <Buttons 
        clear={this.clear}
        operator={this.operator}
        evaluate={this.evaluate}
        inputKey={this.inputKey}/>
       
      </div>
    )
  }
}


function App(){
  return <Calculator/>
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />)


