import React from "react";
import useTopbar from "../../re-components/Student/useTopbar";
import "../../style/studentstyles/profile.css";
import logo from "../../assets/Images/adminImages/Chance.png"

const Profile = () => {
  useTopbar()
  return (
    <>
      <div className="main" id="main">
        <h1>Overview</h1>
        <div className="top">
          <div className="up"></div>
          <div className="cont">
            <img
              src={logo}
              alt="image"
            />
            <div className="info">
              <h2>User Name</h2>
              <p>Student</p>
            </div>
          </div>
        </div>

        <div className="body">
          <div className="info">
            <h2>User Info</h2>
            <p>
              Hi, I'm Alec, Decisions: If you can't decide, the answer is no. If
              two equally difficult paths, choose the one more painful in the
              short term (pain avoidance is creating an illusion of equality).
            </p>
            <p>Name : User</p>
            <p>Email : user@gmail.com</p>
            <p>Tel : +237 123 456 789</p>
            <p>Institution : Institution A </p>
          </div>
          <div className="employ">
            <h2>Employment Details</h2>
            <p>Name : User</p>
            <p>Employer: Google</p>
            <p>Contact : +237 123 456 789</p>
            <p>Salary : 150,000XAF</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;