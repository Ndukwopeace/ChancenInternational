import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useSideBar from "../../re-components/Admin/UseSidebar";

const StudentForm = ({ studentId, onSave }) => {
    useSideBar();
    const navigate = useNavigate();

    const [studentData, setStudentData] = useState({
        name: '',
        email: '',
        salary: '',
        institutionId: '',
    });
    const [institutions, setInstitutions] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchStudentDetails = async () => {
        if (studentId) {
            try {
                const response = await axios.get(`http://localhost:3000/students/${studentId}`);
                setStudentData({
                    name: response.data.name,
                    email: response.data.email,
                    salary: response.data.salary || '',
                    institutionId: response.data.institution?.id || '',
                });
            } catch (error) {
                console.error('Error fetching student details:', error);
            }
        }
    };

    const fetchInstitutions = async () => {
        try {
            const response = await axios.get('http://localhost:3000/institutions');
            setInstitutions(response.data);
        } catch (error) {
            console.error('Error fetching institutions:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInstitutions();
        fetchStudentDetails(); // Now this function is defined
    }, [studentId]);

    const handleChange = (e) => {
        setStudentData({ ...studentData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (studentId) {
                await axios.patch(`http://localhost:3000/students/${studentId}`, studentData);
            } else {
                await axios.post('http://localhost:3000/students', studentData);
            }
            alert('Student saved successfully!');
            onSave(); // Callback to parent for refreshing data or closing the form
            navigate('/admin/students');
        } catch (error) {
            console.error('Error saving student:', error);
            alert('Failed to save student.');
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className='main' id='main'>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={studentData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={studentData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Salary:</label>
                    <input
                        type="number"
                        name="salary"
                        value={studentData.salary}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Institution:</label>
                    <select
                        name="institutionId"
                        value={studentData.institutionId}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Institution</option>
                        {institutions.map((inst) => (
                            <option key={inst.id} value={inst.id}>
                                {inst.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit">{studentId ? 'Update' : 'Create'} Student</button>
            </form>
        </div>
    );
};

export default StudentForm;