import { Link } from 'react-router-dom'

const AdminHome = () => {
    return (
        <div>
            <h1>ホーム</h1>
            <Link to='/admin/survey/index'> 一覧 </Link>
        </div>
    )
}
export default AdminHome;