import React, { useState, useEffect } from "react";
import axios from "axios";
import useSideBar from "../../re-components/Admin/UseSidebar";
import {
    Grid,
    Card,
    CardContent,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    TextField,
    Select,
    MenuItem,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";

const Students = () => {
    useSideBar();

    // State management
    const [students, setStudents] = useState([]);
    const [institutions, setInstitutions] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterInstitution, setFilterInstitution] = useState("All");
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [isDetailModalOpen, setDetailModalOpen] = useState(false);

    // Fetch data on component load
    useEffect(() => {
        fetchStudents();
        fetchInstitutions();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await axios.get("http://localhost:3000/students");
            console.log(response.data);
            setStudents(response.data);
        } catch (error) {
            console.error("Error fetching students:", error);
        }
    };

    const fetchInstitutions = async () => {
        try {
            const response = await axios.get("http://localhost:3000/institutions");
            setInstitutions(["All", ...response.data.map((inst) => inst.name)]);
        } catch (error) {
            console.error("Error fetching institutions:", error);
        }
    };



    // Handlers
    const handleViewDetails = async (studentId) => {
        try {
            const response = await axios.get(`/students/${studentId}`);
            setSelectedStudent(response.data);
            setDetailModalOpen(true);
        } catch (error) {
            console.error("Error fetching student details:", error);
        }
    };

    const handleSearchChange = (e) => setSearchTerm(e.target.value);
    const handleFilterChange = (e) => setFilterInstitution(e.target.value);

    // Filtered and searched student list
    const filteredStudents = Array.isArray(students)
        ? students.filter((student) => {
            const matchesInstitution =
                filterInstitution === "All" || student.institution.name === filterInstitution;
            const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesInstitution && matchesSearch;
        })
        : [];


    return (
        <div className="main" id="main">
            <Grid container spacing={4} style={{ padding: "20px" }}>
                {/* Page Title */}
                <Grid item xs={12}>
                    <Typography variant="h4" gutterBottom>
                        Students List
                    </Typography>
                </Grid>

                {/* Search and Filter Section */}
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Search by Name"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <Select
                        fullWidth
                        value={filterInstitution}
                        onChange={handleFilterChange}
                        displayEmpty
                    >
                        {institutions.map((institution, index) => (
                            <MenuItem key={index} value={institution}>
                                {institution}
                            </MenuItem>
                        ))}
                    </Select>
                </Grid>

                {/* Students Table */}
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Student Name</TableCell>
                                            <TableCell>Institution</TableCell>
                                            <TableCell>Total Debt</TableCell>
                                            <TableCell>Repayments Completed (%)</TableCell>
                                            <TableCell>Status</TableCell>
                                            <TableCell>Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {students.map((student) => {
                                            const funding = student.funding || {}; // Fallback to an empty object if funding is undefined
                                            const totalDebt = funding.totalDebt || 0;
                                            const amountRepaid = funding.amountRepaid || 0;
                                            const repaymentPercentage = totalDebt > 0 ? ((amountRepaid / totalDebt) * 100).toFixed(2) : "0.00";

                                            return (
                                                <TableRow key={student.id}>
                                                    <TableCell>{student.name}</TableCell>
                                                    <TableCell>{student.institution}</TableCell>
                                                    <TableCell>${totalDebt.toFixed(2)}</TableCell>
                                                    <TableCell>{repaymentPercentage}%</TableCell>
                                                    <TableCell>{funding.isActive ? "In Progress" : "Suspended"}</TableCell>
                                                    <TableCell>
                                                        <Button
                                                            size="small"
                                                            variant="contained"
                                                            color="primary"
                                                            onClick={() => handleViewDetails(student.id)}
                                                        >
                                                            View Details
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>


                                </Table>
                            </TableContainer>
                        </CardContent>
                    </Card>
                </Grid>

                {/* View Details Modal */}
                <Dialog open={isDetailModalOpen} onClose={() => setDetailModalOpen(false)}>
                    <DialogTitle>Student Details</DialogTitle>
                    <DialogContent>
                        {selectedStudent && (
                            <>
                                <Typography variant="subtitle1">Name: {selectedStudent.name}</Typography>
                                <Typography variant="subtitle1">Institution: {selectedStudent.institution}</Typography>
                                {selectedStudent.funding ? (
                                    <>
                                        <Typography variant="subtitle1">Total Debt: ${selectedStudent.funding.totalDebt.toFixed(2)}</Typography>
                                        <Typography variant="subtitle1">Amount Repaid: ${selectedStudent.funding.amountRepaid.toFixed(2)}</Typography>
                                        <Typography variant="subtitle1">
                                            Repayment Progress: {((selectedStudent.funding.amountRepaid / selectedStudent.funding.totalDebt) * 100).toFixed(2)}%
                                        </Typography>
                                        <Typography variant="subtitle1">
                                            Status: {selectedStudent.funding.isActive ? "In Progress" : "Suspended"}
                                        </Typography>
                                    </>
                                ) : (
                                    <Typography variant="subtitle1">No funding information available.</Typography>
                                )}
                            </>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setDetailModalOpen(false)}>Close</Button>
                    </DialogActions>
                </Dialog>

            </Grid>
        </div>
    );
};

export default Students;
