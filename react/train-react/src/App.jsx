// Định nghĩa ứng dụng chứa Routes điều hướng tới các component khác dựa vào url

    import {Routes , Route } from 'react-router-dom';
    import Layout from './components/Layout';
    import Home from './pages/Home';
    import Blog from './pages/Blog';
    import Register from './pages/Register';
    import Step1 from './pages/Step1';
    import Step2 from './pages/Step2';
    import Step3 from './pages/Step3';
    import Success from './pages/Success';
    import Products from './pages/Products';
    import Categories from './pages/Categories';
    import ProductsInCate from './pages/ProductsInCate';

    function App(){
        return(
            <>
                <Routes>
                    <Route path='/' element={ <Layout/> }>
                        <Route index element={ <Home /> }></Route>
                        <Route path='blog/:id' element={ <Blog /> }></Route>
                        <Route path='register' element={ <Register />}>
                            <Route path='step1' element={ <Step1 />}></Route>
                            <Route path='step2' element={ <Step2 />}></Route>
                            <Route path='step3' element={ <Step3 />}></Route>
                            <Route path='success' element={ <Success />}></Route>
                        </Route>
                        <Route path='products' element={ <Products />}>
                            <Route index element={<Categories/>}></Route>
                            <Route path=':category' element={<ProductsInCate/>}>
                                
                            </Route>
                        </Route>
                    </Route>
                </Routes>
            </>
        )
    }

    export default App;
