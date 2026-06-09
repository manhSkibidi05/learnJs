import {useState} from 'react';
import Greeting from './Greeting.jsx';
import Button from './Button.jsx';
import UserCard from './UserCard.jsx';
import Counter from './Counter.jsx';
import Student from './StudentForm.jsx';

function App(){
  const [isVisible , setVisible] = useState(true);
  const randomNum = Math.floor(Math.random() * 1000); 
    return (
      <div>
        <h1 style={{visibility: isVisible ? 'visible' : 'hidden', color : 'red' }}>Hello REACT REACT </h1>
        <button onClick={() => setVisible(isVisible => !isVisible)}>Thay đổi h1</button>
        <Greeting name='hihi'></Greeting>
        <Greeting name='moy' />
        <Greeting name='skibidi' />
        <div className='container' style={{color : 'red' , fontSize : '20px' , padding: '10px' , backgroundColor : 'white'}}>
          Con số gì đây : {randomNum} 
        </div>
        <Button label='Dont click me' func={() => alert('fah')} />
        <UserCard avt='https://randomuser.me/api/portraits/women/68.jpg' name='A long' role='Admin' email='moy@gaming.com'></UserCard>
        <br />
        <Counter></Counter>
        <br />
        <Student></Student>
      </div>
    );
  }

  export default App;

