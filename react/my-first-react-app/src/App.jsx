import {useState} from 'react';
import Button from './Button.jsx';
import UserCard from './UserCard.jsx';
import Counter from './Counter.jsx';
import Student from './StudentForm.jsx';
import Note from './Note.jsx';
import TodoList from './TodoListMini.jsx';
import DataFetcher from './DataFetcher.jsx';
import ProductList from './ProductList.jsx';
import Timer from './Timer.jsx';
import ThemeToggle from './ThemeToggle.jsx';
import ShowWindowSize from './ShowWindowSize.jsx';
import Container from './Container.jsx'

function App(){
  const [isVisible , setVisible] = useState(true);
  const randomNum = Math.floor(Math.random() * 1000); 
    return (
      <div>
        {/* <h1 style={{visibility: isVisible ? 'visible' : 'hidden', color : 'red' }}>Hello REACT REACT </h1>
        <button onClick={() => setVisible(isVisible => !isVisible)}>Thay đổi h1</button>
        <div className='container' style={{color : 'red' , fontSize : '20px' , padding: '10px' , backgroundColor : 'white'}}>
          Con số gì đây : {randomNum} 
        </div>
        <Button label='Dont click me' func={() => alert('fah')} />
        <UserCard avt='https://randomuser.me/api/portraits/women/68.jpg' name='A long' role='Admin' email='moy@gaming.com'></UserCard>
        <br />
        
        <br />
        <DataFetcher></DataFetcher>
        <br />
        <Student></Student>
        <Note></Note> */}
        
        <TodoList></TodoList>
        <Counter></Counter>
        {/* <ThemeToggle></ThemeToggle> */}
        <br />
        {/* <Timer></Timer> */}
        {/* <ProductList></ProductList> */}
        <ShowWindowSize></ShowWindowSize>
        <Container></Container>
      </div>
    );
  }

  export default App;

