import {
    BrowserRouter,
    Route,
    Routes
} from "react-router-dom";
import AdminHome from './pages/admin/AdminHome';
import SurveyIndex from "./pages/admin/SurveyIndex";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/admin' element={<AdminHome/>} />
                <Route path='/admin/survey/index' element={<SurveyIndex/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;