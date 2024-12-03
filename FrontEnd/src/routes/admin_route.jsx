import { Route, Routes } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import Home from '../pages/AdminDashboard/Home';
import Students from '../pages/AdminDashboard/Students';
import StudentForm from '../pages/AdminDashboard/StudentForm';
import Repayments from '../pages/AdminDashboard/Repayments';
import Notifications from '../pages/AdminDashboard/Notifications';
import Settings from '../pages/AdminDashboard/Settings';
import FundingForm from '../pages/AdminDashboard/FundingForm';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const AdminRoute = () => {
    const navigate = useNavigate();
    
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get('http://localhost:3000/students');
                setStudents(response.data);
            } catch (err) {
                console.error('Error fetching students:', err); // Log the error
                setError('Failed to load students');
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <AdminLayout>
            <Routes>
                <Route path="/admin-dashboard" element={<Home />} />

                <Route path="/students" element={<Students />} />
                <Route path="/students-form" element={<StudentForm onSave={() => navigate('/admin/students')} />} />
                <Route path="/students/:id/edit" element={<StudentForm onSave={() => navigate('/admin/students')} />} />

                <Route path="/repayments" element={<Repayments />} />
                <Route path="/funding-form" element={<FundingForm students={students} />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/settings" element={<Settings />} />
            </Routes>
        </AdminLayout>
    )
}

export default AdminRoute;