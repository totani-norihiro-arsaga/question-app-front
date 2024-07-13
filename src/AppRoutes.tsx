import {
    BrowserRouter,
    Route,
    Routes
} from "react-router-dom";
import AdminHome from './pages/admin/AdminHome';
import SurveyIndex from "./pages/admin/SurveyIndex";
import SurveyForm from "./pages/User/SurveyForm";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/admin' element={<AdminHome/>} />
                <Route path='/admin/survey/index' element={<SurveyIndex/>} />
                <Route path='/survey/:id' element={<SurveyForm/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;