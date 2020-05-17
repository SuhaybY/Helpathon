import React, {useState} from 'react';
import emailjs from 'emailjs-com';

export default function User() {
    const [name, setUsername] = useState();
    const [email, setEmail] = useState();
    const [mssg, setMssg] = useState();
    

  function sendEmail(e) {
    e.preventDefault();    //This is important, i'm not sure why, but the email won't send without it

    emailjs.send("gmail", "template_VzSEwjSD", {"to_email":email,"to_name":name,"from_name":"HelpathonOrg","message_html":mssg},'user_zYnljTsUoMvO5zCawfDVa')
    .then(function(response) {
       console.log('SUCCESS!', response.status, response.text);
    }, function(error) {
       console.log('FAILED...', error);
    });

  }

  return (
    <form className="contact-form" onSubmit={sendEmail}>
      <label>Name</label>
      <input type="text" name="from_name" onChange={e => setUsername(e.target.value)}/>
      <label>Email</label>
      <input type="email" name="to_email" onChange={e => setEmail(e.target.value)} />
      <label>Message</label>
      <textarea name="html_message" onChange={e => setMssg(e.target.value)} />
      <input type="submit" value="Send"  />
    </form>
  );
}