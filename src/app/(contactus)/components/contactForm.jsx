'use client'

 
import { handelAsyncErrors } from '@/helpers/asyncErrors';
import { EXPORT_ALL_APIS } from '@/utils/apis/api';
import { useState } from 'react';

const ContactForm = () => {
  let api=EXPORT_ALL_APIS()
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone_number: '',
    message: '',
  });

  const [error, setError] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  console.log(error)

   

  const handleSubmit = (e) => {
    e.preventDefault()
    let formData=new FormData()
    formData.append('name',user.name)
    formData.append('email',user.name)
    formData.append('phone_number',user.phone_number)
    formData.append('message',user.message)
    formData.append('form_unit_tag','query_unit_tag_9630')
    return handelAsyncErrors(async()=>{
      let resp=await api.sendQueryContactUs(formData)
      if(resp.success===true){
        console.log(resp)
      }else if(resp.success===false){
        setError(resp.errors) 
      }
    })
  }
    
       

  return (
    <><h3>Send us Message</h3>
    <form onSubmit={handleSubmit} className="form" noValidate>
          <div className="form-group">
              <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter Your Name"
                  value={user.name}
                  onChange={handleChange}
                  className="input" />
               
          </div>

          <div className="form-group">
              <input
                  id="email"
                  name="email"
                  type="text"
                  placeholder="Enter Your Email"
                  value={user.email}
                  onChange={handleChange}
                  className="input" />
               
          </div>

          <div className="form-group">
              <input
                  id="phone"
                  name="phone_number"
                  type="number"
                  placeholder="Phone Number"
                  value={user.phone_number}
                  onChange={handleChange}
                  className="input" />
               
          </div>

          <div className="form-group">
              <textarea
                  id="message"
                  name="message"
                  placeholder="Enter Your Message"
                  value={user.message}
                  onChange={handleChange}
                  className="textarea"
              ></textarea>
               
          </div>

          <button type="submit" className="button">Send Message</button>
      </form></>
  );
};

export default ContactForm;
