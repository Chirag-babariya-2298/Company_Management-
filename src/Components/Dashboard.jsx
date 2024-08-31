import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';
import "../CSS/Dashboard.css";
import axios from 'axios';
import Chart1 from './Chart1';
import Chart2 from './Chart2';

const Dashboard = () => {
  const [cardData, setCardData] = useState({
    employees: 0,
    projects: 0,
    clients: 0,
    managers: 0,
  });

  useEffect(() => {
    const fetchCardData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://employee-system-nodejs.vercel.app/api/dashboard/getCardsData', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.isSuccess) {
          setCardData({
            employees: response.data.data.employees,
            projects: response.data.data.projects,
            clients: response.data.data.clients,
            managers: response.data.data.managers,
          });
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching card data:', error);
      }
    };

    fetchCardData();
  }, []);

  return (

    <div className="dashboard">
      <Container fluid className="dashboard-content ">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Row>
                  <Col md={3}>
                    <Card className="text-center shadow-lg">
                      <Card.Body>
                        <Card.Title>Total Employees</Card.Title>
                        <Card.Text>{cardData.employees !== undefined ? cardData.employees : 'Loading...'}</Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={3}>
                    <Card className="text-center shadow-lg">
                      <Card.Body>
                        <Card.Title>Total Projects</Card.Title>
                        <Card.Text>{cardData.projects !== undefined ? cardData.projects : 'Loading...'}</Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={3}>
                    <Card className="text-center shadow-lg">
                      <Card.Body>
                        <Card.Title>Total Clients</Card.Title>
                        <Card.Text>{cardData.clients !== undefined ? cardData.clients : 'Loading...'}</Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={3}>
                    <Card className="text-center shadow-lg">
                      <Card.Body>
                        <Card.Title>Total Managers</Card.Title>
                        <Card.Text>{cardData.managers !== undefined ? cardData.managers : 'Loading...'}</Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
                <Row className="mt-4">

                  <Col md={6}>
                    <Chart1 />
                  </Col>

                  <Col md={6}>
                    <Chart2 />
                  </Col>

                </Row>
              </>
            }
          />
        </Routes>
      </Container>
    </div>
  );
};

export default Dashboard;
