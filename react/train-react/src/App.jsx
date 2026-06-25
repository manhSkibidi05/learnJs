// Định nghĩa ứng dụng chứa Routes điều hướng tới các component khác dựa vào url

    import {Routes , Route } from 'react-router-dom';
    import Layout from './components/Layout';
    import Home from './pages/Home';
    import Blog from './pages/Blog';

    function App(){
        return(
            <>
                <Routes>
                    <Route path='/' element={ <Layout/> }>
                        <Route index element={ <Home /> }></Route>
                        <Route path='blog/:id' element={ <Blog /> }></Route>
                    </Route>
                </Routes>
            </>
        )
    }

    export default App;
