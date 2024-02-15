import { Routes, Route } from 'react-router-dom';
import { pages } from "./configs/pageConfig";
import NotFound from './pages/NotFound';

const Router = () => {
    return (
        <Routes>
            {pages.map(page => (
                <Route key={page.title} path={page.path} element={<page.component />} />
            ))}
            <Route path='*' element={<NotFound />} />
        </Routes>
    );
}

export default Router;