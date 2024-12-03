import { Route, Routes } from 'react-router-dom';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
const AuthRoute = () => {
    return (
        
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        
    )
}

export default AuthRoute;