import {useState} from 'react';
import Greeting from './Greeting.jsx';
import Button from './Button.jsx';
import UserCard from './UserCard.jsx';
import Counter from './Counter.jsx';
import Student from './StudentForm.jsx';
import Note from './Note.jsx';
import TodoList from './TodoListMini.jsx';
import DataFetcher from './DataFetcher.jsx';
import ProductList from './ProductList.jsx'

function App(){
  const [isVisible , setVisible] = useState(true);
  const randomNum = Math.floor(Math.random() * 1000); 
    return (
      <div>
        {/* <h1 style={{visibility: isVisible ? 'visible' : 'hidden', color : 'red' }}>Hello REACT REACT </h1>
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
        
        <br />
        <Student></Student>
        <Note></Note> */}
        <Counter></Counter>
        <br />
        <TodoList></TodoList>
        <br />
        <DataFetcher></DataFetcher>
        <br />
        {/* <ProductList></ProductList> */}
      </div>
    );
  }

  export default App;
// {id : 1 , name : 'Iphone 11' , price : 101},
//             {id : 2 , name : 'Iphone 12' , price : 15},
//             {id : 3 , name : 'Iphone 13' , price : 131},
//             {id : 4 , name : 'Iphone 14' , price : 1},
//             {id : 5 , name : 'Iphone 15' , price : 1012},
