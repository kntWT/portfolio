import { Routes, Route } from 'react-router-dom';
import  Home  from "./pages/Home";
import  About  from "./pages/About";
import  Research  from "./pages/Research";
import  Works  from "./pages/Works";
import NotFound from './pages/NotFound';

const Router = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/research' element={<Research />} />
            <Route path='/works' element={<Works />} />
            <Route path='*' element={<NotFound />} />
        </Routes>
    );
}

export default Router;