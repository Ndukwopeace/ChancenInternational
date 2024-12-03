import { useState } from 'react';
import axios from 'axios';
import useSideBar from "../../re-components/Admin/UseSidebar";
import { TextField, Select, MenuItem, Button, Snackbar } from '@mui/material';

const FundingForm = ({ students }) => {
  useSideBar();

  const [studentId, setStudentId] = useState('');
  const [tuitionFees, setTuitionFees] = useState('');
  const [financialAid, setFinancialAid] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/fundings', {
        studentId,
        tuitionFees: parseFloat(tuitionFees),
        financialAid: parseFloat(financialAid),
      });
      console.log('Funding Created:', response.data);
      setSuccess(true);
      // Reset the form
      setStudentId('');
      setTuitionFees('');
      setFinancialAid('');
    } catch (err) {
      console.error(err);
      setError('Failed to create funding. Please try again.');
    }
  };

  return (
    <div className='main' id='main'>
      <form onSubmit={handleSubmit}>
        <Select
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          required
          displayEmpty
        >
          <MenuItem value="" disabled>
            Select a Student
          </MenuItem>
          {(students || []).map((student) => (
            <MenuItem key={student.id} value={student.id}>
              {student.name}
            </MenuItem>
          ))}

        </Select>
        <TextField
          label="Tuition Fees"
          type="number"
          value={tuitionFees}
          onChange={(e) => setTuitionFees(e.target.value)}
          required
        />
        <TextField
          label="Financial Aid"
          type="number"
          value={financialAid}
          onChange={(e) => setFinancialAid(e.target.value)}
          required
        />
        <Button type="submit">Create Funding</Button>
        {error && <Snackbar open={true} message={error} onClose={() => setError('')} />}
        {success && <Snackbar open={true} message="Funding created successfully!" onClose={() => setSuccess(false)} />}
      </form>
    </div>
  );
};

export default FundingForm;
