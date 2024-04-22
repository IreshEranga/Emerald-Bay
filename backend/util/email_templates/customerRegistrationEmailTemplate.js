const customerRegistrationEmailTemplate = ( name, email, mobile, password, address) => {
    return `
        <p>Dear ${name},</p>
  
        <p>Here are your Registration Details : </p>
        <p> • Email: ${email}</p>
        <p> • Mobile Number: ${mobile}</p>
        <p> • Password: ${password}</p>
        <p> • Address: ${address}</p>
        <p>I hope this message finds you well and eagerly anticipating your dining experience with us. On behalf of the entire team at Emerald Bay Restaurant, I want to extend our sincerest gratitude for choosing to dine with us.

        Your recent reservation is truly appreciated, and we are thrilled to have the opportunity to serve you. We understand that there are many dining options available, and we are honored that you have chosen to enjoy your meal at [Restaurant Name].
        
        We are committed to providing you with a memorable culinary experience from start to finish. Our talented chefs have prepared a delectable menu featuring [highlight a few signature dishes or specialties], and our attentive staff is ready to ensure that your dining experience exceeds your expectations.
        
        If you have any special requests or dietary preferences, please don't hesitate to inform us. We want to ensure that your visit is tailored to your preferences and that you leave our restaurant fully satisfied.
        
        Once again, thank you for choosing [Restaurant Name]. We can't wait to welcome you and to delight your taste buds with our exquisite cuisine.</p>
      
        <p><br/></p>
        <p>Best regards,</p>
        <p>Emerald Bay Restaurant Team.</p>
    `;
};

module.exports = customerRegistrationEmailTemplate;