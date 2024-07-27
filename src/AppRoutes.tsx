import {
    BrowserRouter,
    Route,
    Routes
} from "react-router-dom";
import AdminHome from './pages/admin/AdminHome';
import SurveyIndex from "./pages/admin/SurveyIndex";
import SurveyForm from "./pages/User/SurveyForm";
import SurveyShow from "./pages/admin/SurveyShow";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/admin' element={<AdminHome/>} />
                <Route path='/admin/survey/index' element={<SurveyIndex/>} />
                <Route path='/admin/survey/:id' element={<SurveyShow/>} />
                <Route path='/survey/:id' element={<SurveyForm/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;