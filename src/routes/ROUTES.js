import AdminRoot from "../pages/Admin/AdminRoot";
import Employees from "../pages/User/Employees";
import EmployeesDetail from "../pages/User/EmployeesDetail";
import Favorite from "../pages/User/Favorite";
import Home from "../pages/User/Home";
import UserRoot from "../pages/User/UserRoot";
import EditEmployee from "../pages/Admin/EditEmployee";
import AddEmployee from "../pages/Admin/AddEmployee";
import EmployeesAdmin from "../pages/Admin/EmployeesAdmin";

export const ROUTES = [
    {
        path:"/",
        element:<UserRoot/>,
        children:[
            {
                path: '',
                element: <Home/>
            },
            {
                path: 'employees',
                element: <Employees/>
            },
            {
                path: 'favorite',
                element: <Favorite/>
            },
            {
                path: 'employees/:id',
                element: <EmployeesDetail/>
            },
        ]
    },
    {
        path:"/admin",
        element:<AdminRoot/>,
        children:[
            {
                path: '',
                element: <EmployeesAdmin/>
            },
            {
                path: '/admin/add-employees',
                element: <AddEmployee/>
            },
            {
                path: '/admin/employees/edit/:id',
                element: <EditEmployee/>
            },
        ]
    }
];