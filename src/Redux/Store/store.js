import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../Slice/LoginSlice';
import registerReducer from '../Slice/RegisterSlice';
import clientReducer from '../Slice/ClientSlice';
import managerFormReducer from '../Slice/ManagerSlice';
import employeeFormReducer from '../Slice/EmployeeSlice';
import projectFormReducer from '../Slice/ProjectSlice'
import attendanceFormReducer from '../Slice/AttendanceSlice'

const store = configureStore({
  reducer: {
    login: loginReducer,
    register: registerReducer,
    clientForm: clientReducer,
    managerForm: managerFormReducer,
    employeeForm: employeeFormReducer,
    projectForm: projectFormReducer,
    attendanceForm: attendanceFormReducer,
  },
});

export default store;
