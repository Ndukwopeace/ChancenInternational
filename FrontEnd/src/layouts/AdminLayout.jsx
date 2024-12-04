import Sidebar from "../re-components/Admin/Sidebar";

const AdminLayout = ({ children }) => {
    return (
        <div className="admin-layout">
        <Sidebar />
        <div className="main-content">
            {children}
        </div>
    </div>
    );
};

export default AdminLayout;