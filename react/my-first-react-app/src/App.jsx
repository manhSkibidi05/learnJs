import Greeting from './Greeting.jsx';
import Button from './Button.jsx';
import UserCard from './UserCard.jsx'

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
        <Button label='Dont click me' func={() => alert('fah')} />
        <UserCard avt='https://randomuser.me/api/portraits/women/68.jpg' name='A long' role='Admin' email='moy@gaming.com'></UserCard>
      </div>
    );
  }

  export default App;

