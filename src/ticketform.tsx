import React from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';

const TicketForm: React.FC = () => {

  const ticketNumber = Math.floor(1000 + Math.random() * 9000);
  const navigate = useNavigate();

  const handleBackToCalculator = () => {
    navigate('/');
  };

  return (
    <div className="ticket-form" onClick={handleBackToCalculator}>
      <h1 className="ticket-form-header">Support Ticket Form</h1>
      <div className="ticket-form-body">
        <div>
          <h2>Thank you for sending us your report, we will </h2>
          <h2>track the problem now</h2>
          <h5>ticket number: <span className="tickets">{ticketNumber}</span></h5>
        </div>
      </div>
    </div>
  );
};

export default TicketForm;
