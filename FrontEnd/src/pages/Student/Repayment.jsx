import React, { useState } from "react";
import useTopbar from "../../re-components/Student/useTopbar";
import { PieChart } from "@mui/x-charts/PieChart";
import "../../style/studentstyles/repayment.css";
import {Grid,Card, CardContent,Typography,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,} from "@mui/material";

const Repayment = () => {
  useTopbar();


  const payments = [
    {
      installment: 1,
      amount: "90,000 XAF",
      status: "Paid",
      dueDate: "Sept 1, 2024",
      paidOn: "Sept 1, 2024",
    },
    {
      installment: 2,
      amount: "90,000 XAF",
      status: "Paid",
      dueDate: "Oct 1, 2024",
      paidOn: "Oct 1, 2024",
    },
    {
      installment: 3,
      amount: "90,000 XAF",
      status: "Overdue",
      dueDate: "Nov 1, 2024",
      paidOn: "...",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Paid":
        return "green"; // Color for paid status
      case "Overdue":
        return "red"; // Color for overdue status
      default:
        return "black"; // Default color for other statuses
    }
  };

  // Handlers for modals
  const handleViewDetails = (payment) => {
    setSelectedStudent(payment);
    setDetailModalOpen(true);
  };

  return (
    <div className="main" id="main">
      <Grid container spacing={4} style={{ padding: "20px" }}>
        {/* Page Title */}
        <Grid item xs={12} style={{   background: 'linear-gradient(to right, #1976d2, #64b5f6)',color:'white',height:'25vh',borderRadius:'1rem',padding:'3rem' }}>
  <Typography variant="h3" width="100%" gutterBottom >
            Repayments
          </Typography>
          <Typography variant="h5">Summary Of Total Dept Of 600,000 XAF</Typography>
        </Grid>

        {/* Students Table */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <TableContainer>
                <Table>
                  <TableHead >
                    <TableRow > 
                      <TableCell style={{ fontWeight:'bold'}}>Installment</TableCell>
                      <TableCell style={{ fontWeight:'bold'}}> Amount</TableCell>
                      <TableCell style={{ fontWeight:'bold'}}>Status</TableCell>
                      <TableCell style={{ fontWeight:'bold'}}>Due Date</TableCell>
                      <TableCell style={{ fontWeight:'bold'}}>Paid On</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {payments.map((payment, index) => (
                      <TableRow key={index}>
                        <TableCell>{payment.installment}</TableCell>
                        <TableCell>{payment.amount}</TableCell>
                        <TableCell style={{ color: getStatusColor(payment.status) }}>
                          {payment.status}
                        </TableCell>
                        <TableCell>{payment.dueDate}</TableCell>
                        <TableCell>{payment.paidOn}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

      </Grid>
      <div className="charts">
        <div className="upcoming">
          <h1>Upcoming Installments</h1>
          <p>- Fourth Installment</p>
          <p> - Amount = 90,000 XAF</p>
          <p> - Due Date = Dec 1, 2024</p>
        </div>

        <div className="pie">
          <h1>Amount Paid VS Amount Pending</h1>
          <PieChart
            series={[
              {
                data: [
                  { id: 0, value: 25, label: " Paid", color: "green" },
                  { id: 1, value: 75, label: "Pending", color: "#880808" },
                ],
              },
            ]}
            width="300"
            height={250}
          />
        </div>
      </div>
    </div>
  );
};

export default Repayment;
