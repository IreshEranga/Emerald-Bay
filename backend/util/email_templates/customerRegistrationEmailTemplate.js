const customerRegistrationEmailTemplate = ( name, email, mobile, password, address) => {
    return `
        <p>Dear ${name},</p>
  
        <p>Here are your Registration Details : </p>
        <p> • Email: ${email}</p>
        <p> • Mobile Number: ${mobile}</p>
        <p> • Password: ${password}</p>
        <p> • Address: ${address}</p>
        <p>The message expresses heartfelt gratitude to the recipient for choosing to dine at Emerald Bay Restaurant. It emphasizes the restaurant's
         commitment to providing a memorable culinary experience, highlighting signature dishes and the attentive service of its staff.
          The recipient is encouraged to communicate any special requests or dietary preferences to ensure a tailored dining experience.
         The message ends with a warm welcome and anticipation for the recipient's visit.</p>
      
        <p><br/></p>
        <p>Best regards,</p>
        <p>Emerald Bay Restaurant Team.</p>
    `;
};

module.exports = customerRegistrationEmailTemplate;