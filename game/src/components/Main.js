import React,{ useState} from 'react'
import "./Main.css"
import Swal from 'sweetalert2'
const Main = () => {
    const[attempt,setAttempt] = useState(4)
    const [secret,setSecret] = useState("");
    const [guess,setGuess] = useState("");
    const [value,setValue] = useState("");
    const [low,setLow] = useState("");
    const [high,setHigh] = useState("");
    const [toggle,setToggle] = useState(0);
    const clickLost = () => {
        Swal.fire({
            title:'Sorry! You lost the game',
            text: 'Secret Number : ' + secret,
            icon: 'error'
            
        })
    }
    const clickError = () => {
        Swal.fire({
            title: 'Error!',
            text: 'Enter a valid number',
            icon: 'error',
            confirmButtonText: 'OK!'
          })
    }
    const clickSuccess = () => {
        Swal.fire({
            title: 'Success!',
            text: 'You won the game . \nSecret Number : ' + secret,
            icon: 'success',
            confirmButtonText: 'Continue'
          })
    }
  
    //handleGuess starts
    const handleGuessChange = (e) => {
       setGuess(e.target.value);
       //console.log(guess)
    }
    //handleGuess ends

    //handleGame starts
    const handleGame = () => {
        //console.log(attempt)   
        var a = attempt - 1;
        setAttempt(a);
        //console.log(attempt);
        
        if(parseInt(guess) < parseInt(low) || parseInt(guess) > parseInt(high) ){
         clickError();
         setGuess("");return 0;
        }
        if(parseInt(guess) === parseInt(secret)){
           clickSuccess()
            //clickLost();
           setAttempt(4);
           setLow("");
           setHigh("");
           setValue("");
           setGuess("")
           setToggle(0)
           return 0;
        }  
        else if(attempt > 0 && parseInt(guess) > parseInt(secret)){
            setHigh(parseInt(guess) - 1);
        }
        else if(attempt > 0 && parseInt(guess) < parseInt(secret)){
            setLow(parseInt(guess) + 1);
        }
        if(attempt <= 0)
         {
           clickLost();
           setAttempt(4);
           setLow("");
           setHigh("");
           setValue("");
           setGuess("")
           setToggle(0)
           return 0;
         }
        setGuess("");
        
       
    }
    //handleGame ends
    //handleChange starts
    const handleLevelChange = (e) => {
        var val = e.target.value;
        setValue(val);
    }

    //handleChange ends
    


    //handleSubmit starts
    const handleSubmit = () => {
        var val = parseInt(value);
      if(parseInt(value) <= 0 || parseInt(value) > 5)
       {
        clickError();
        return 0;
       }
       else{
        setLow(1);
        setHigh(20 * val);
        setSecret(Math.ceil(Math.random() * (val * 20)));
        //alert(secret)
       }
       setToggle(1);
    
    }

  return (
    <div>
       <div className='main-container'>
        {/* Set the limit container. */}
        <div className='limit-container'>
            <div className='limit-text'>Set the difficulty : 
             <div className='limit-level'>
                Easy : 1 | Normal : 2 | Average : 3 | Hard : 4 | Very Hard : 5
             </div>
            </div>
            <div className='limit-button'>
                <input type="number" name="number" className='button button-input' value={value} onChange={handleLevelChange}/>
                <button className='button button-active'  onClick={handleSubmit}>Start Game</button>
            </div>
        </div>

        {/* Guess the number container .*/}
        <div className='guess-container'>
            <h1 className='guess-heading'>Guess the number {toggle ? "between" : ""} {low} {toggle ? "&" : ""}  {high}</h1>
        </div>
        {/* Enter the number. */}

        <div className='number-container'>
            <input type="number" name="guessnumber" className="number-input" value={guess} onChange={handleGuessChange}/><br/>
            <button className='number-send' onClick={handleGame}>Submit</button>

        </div>
        
        {/* Show the attempts. */}
         
        <div className='attempt-container'>
          <div className='attempt attempt-total'>Number of Attempts : {5}</div>
          
          <div className='attempt attempt-left'>Attempts Left : {attempt + 1}</div>
        </div>

       </div>
    </div>
  )
}

export default Main
