const riderAssignEmailTemplate = (name, orderid, deliveryaddress) => {
    return `
        <p>Dear ${name},</p>
        <p>Your have an  order delivery : ${orderid} </p>
        <p>Your delivery details</p>
        <p>OrderId: ${orderid}</p>
        <p>Address: ${deliveryaddress}</p>
        
        <p></p>
        <p>Best regards,</p>
        <p>The Restaurant Team</p>
    `;
};

module.exports = riderAssignEmailTemplate;