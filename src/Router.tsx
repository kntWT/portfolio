import { Routes, Route } from 'react-router-dom';
import pages from "./configs/pageConfig";

const Router = () => {
    return (
        <Routes>
            {pages.map(page => (
                <Route path={page.path} element={<page.component />} />
            ))}
        </Routes>
    );
}

export default Router;