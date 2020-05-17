import emailjs from 'emailjs-com';

export const sendEmail = (email, name, msg) => {
    const mssg = "Thank you for signing up! We will review your application and get back to you ASAP. Thank you!";
    emailjs.send("gmail", "template_VzSEwjSD", { "to_email": email, "to_name": name, "from_name": "HelpathonOrg", "message_html": msg }, 'user_zYnljTsUoMvO5zCawfDVa')
        .then(function (response) {
            console.log('SUCCESS!', response.status, response.text);
        }, function (error) {
            console.log('FAILED...', error);
        });

}
