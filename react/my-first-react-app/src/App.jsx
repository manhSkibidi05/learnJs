import Greeting from './Greeting.jsx';
import Button from './Button.jsx'

function App(){
  const randomNum = Math.floor(Math.random() * 1000); 
    return (
      <div>
        <h1>Hello REACT REACT </h1>
        <Greeting name='hihi'></Greeting>
        <Greeting name='moy' />
        <Greeting name='skibidi' />
        <div className='container' style={{color : 'red' , fontSize : '20px' , padding: '10px' , backgroundColor : 'white'}}>
          Con số gì đây : {randomNum} 
        </div>
        <Button label='Dont click me' onClick={() => console.log('fuck')} />
      </div>
    );
  }

  export default App;

