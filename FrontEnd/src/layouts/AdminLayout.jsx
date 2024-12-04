import Sidebar from "../re-components/Admin/Sidebar";
import { UserProvider } from "../pages/Auth/AuthContext";

const AdminLayout = ({ children }) => {
    return (
       <UserProvider>
         <div className="admin-layout">
        <Sidebar />
        <div className="main-content">
            {children}
        </div>
    </div>
       </UserProvider>
    );
};

export default AdminLayout;