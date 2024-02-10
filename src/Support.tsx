import React, { useState, ChangeEvent, FormEvent,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  topic: string;
  description: string;
}

function Support() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    topic: 'General', 
    description: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    navigate('/TicketForm');
  }

  const allFieldsFilled = formData.firstName && formData.lastName && formData.email && formData.topic;

  const [buttonClass, setButtonClass] = useState("button-grey");

  useEffect(() => {
    if (allFieldsFilled) {
      setButtonClass("button-yellow");
    } else {
      setButtonClass("button-grey");
    }
  }, [formData]);

  return (
    <body className="body-support">
      <div className="support-form-container">
      <h1 className="support-form-header">Support Ticket Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="input">
            {/* name */}
            <div className="form-group">
              <label htmlFor="firstName">Name <span className="required">*</span></label>
              <div className="input-container">
                <div>
                  <input
                    className='margin-left'
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    placeholder="First"
                  />
                  <div className='kl'>First</div>
                </div>
                <div>
                  <input
                    className='margin-left'
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    placeholder="Last"
                  />
                  <div className='kl'>Last</div>
                </div>
            </div>  
            </div>   
            {/* Email */}
            <div className="form-group">
            <label htmlFor="email">Email <span className="required">*</span></label>
            <input
              className="emailss"
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            </div>
            {/* Bug */}
            <div className="form-group">
              <label>Topic <span className="required">*</span></label>
              <div className="radio-options">
                <div>
                  What can we help you today?
                </div>
                <div>
                  <input 
                    type="radio" 
                    id="general" 
                    name="topic" 
                    value="General" 
                    checked={formData.topic === 'General'} 
                    onChange={handleChange} 
                    required 
                  />
                  <label htmlFor="general">General</label>
                </div>
                <div>
                  <input 
                    type="radio" 
                    id="bug" 
                    name="topic" 
                    value="Bug" 
                    checked={formData.topic === 'Bug'} 
                    onChange={handleChange} 
                    required 
                  />
                  <label htmlFor="bug">Bug</label>
                </div>
              </div>
            </div>
          </div>

          {/* Desc */}
          <div className="desc">
              <div className="form-group">
                <label htmlFor="description">Description <span className="optional">optional</span></label>
                  <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Description Report"
                />
                </div>
                <div className='end'>
                <button type="submit" className={`submit-button ${buttonClass}`}>SEND</button>
                </div>
          </div>
        </div>
      </form>
    </div>
    </body>
    
  );
}

export default Support;


