import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, Table, Form } from 'react-bootstrap';
import moment from 'moment';
import { getEmployeeApi } from '../Redux/Slice/EmployeeSlice';
import { getManagerApi } from '../Redux/Slice/ManagerSlice';
import { getAttendanceApi, addAttendanceApi } from '../Redux/Slice/AttendanceSlice';

const Attendance = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState('employees');
  const [selectedUser, setSelectedUser] = useState(null);
  const [date, setDate] = useState(new Date());
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [comment, setComment] = useState('');
  const [attendanceData, setAttendanceData] = useState({});

  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employeeForm.value);
  const managers = useSelector((state) => state.managerForm.value);
  const loading = useSelector((state) => state.employeeForm.loading || state.managerForm.loading);

  useEffect(() => {
    dispatch(getEmployeeApi());
    dispatch(getManagerApi());
  }, [dispatch]);

  const openModal = async (user, userType) => {
    setSelectedUser(user);
    setSelectedUserType(userType);
    const userId = user._id;
    await dispatch(getAttendanceApi(userId));
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  const toggleUserType = (userType) => {
    setSelectedUserType(userType);
  };

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setDate(selectedDate);
    const dateKey = moment(selectedDate).format('YYYY-MM-DD');
    if (attendanceData[dateKey]) {
      const duration = attendanceData[dateKey].duration || '';
      const [hr, min] = duration.split(':');
      setHour(hr || '');
      setMinute(min || '');
      setComment(attendanceData[dateKey].comment || '');
    } else {
      setHour('');
      setMinute('');
      setComment('');
    }
  };

  const handleSave = () => {
    const dateKey = moment(date).format('YYYY-MM-DD');
    const attendanceDetails = {
      hour: hour || '00',
      minute: minute || '00',
      userId: selectedUser._id,
      comment: comment,
      date: moment(date).toISOString(),
    };
    dispatch(addAttendanceApi(attendanceDetails));
    setShowModal(false);
  };

  const LoadingScreen = () => (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999
    }}>
      <div className="spinner-border text-light" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );

  const UserTable = ({ users, userType }) => (
    <Table striped bordered hover className="user-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Surname</th>
          <th>Email</th>
          <th>Mobile Number</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr key={index}>
            <td>{user.name}</td>
            <td>{user.surname}</td>
            <td>{user.email}</td>
            <td>{user.mobileNo}</td>
            <td>
              <Button
                variant="primary"
                onClick={() => openModal(user, userType)}>
                Open
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );

  return (
    <div className="attendance-container">
      {loading && <LoadingScreen />}
      <div className="header">
        <h2>Attendance</h2>
      </div>

      <div className="user-list-toggle">
        <Button
          variant={selectedUserType === 'employees' ? 'primary' : 'secondary'}
          onClick={() => toggleUserType('employees')}
        >
          Employees
        </Button>
        <Button
          variant={selectedUserType === 'managers' ? 'primary' : 'secondary'}
          onClick={() => toggleUserType('managers')}
        >
          Managers
        </Button>
      </div>

      {selectedUserType === 'employees' && <UserTable users={employees} userType="employee" />}
      {selectedUserType === 'managers' && <UserTable users={managers} userType="manager" />}

      <Modal show={showModal} onHide={closeModal} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Attendance Sheet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="attendance-form">
            {selectedUser && (
              <>
                <p><strong>{selectedUserType === 'employee' ? 'Employee' : 'Manager'}:</strong> {selectedUser.name} {selectedUser.surname}</p>
                <div>
                  <label>Date:</label>
                  <input
                    type="date"
                    value={date}
                    onChange={handleDateChange}
                    className="form-control"
                  />
                </div>
                <div>
                  <label>Duration:</label>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <Form.Group controlId="formHour">
                      <Form.Label>Hour:</Form.Label>
                      <Form.Control
                        type="number"
                        value={hour}
                        onChange={(e) => setHour(e.target.value)}
                        placeholder="Hour"
                      />
                    </Form.Group>
                    <Form.Group controlId="formMinute">
                      <Form.Label>Minute:</Form.Label>
                      <Form.Control
                        type="number"
                        value={minute}
                        onChange={(e) => setMinute(e.target.value)}
                        placeholder="Minute"
                      />
                    </Form.Group>
                  </div>
                </div>
                <div>
                  <label>Comment:</label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="form-control"
                  />
                </div>
                <div className="date-popup-buttons mt-3">
                  <Button variant="secondary" onClick={closeModal}>Cancel</Button>
                  <Button variant="primary" onClick={handleSave}>Save</Button>
                </div>
              </>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Attendance;
