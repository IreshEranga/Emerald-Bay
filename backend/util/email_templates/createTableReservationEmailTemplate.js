const createTableReservationEmailTemplate = (name, reservationId, date, time, tableNo) => {
    return `
        <p>Dear ${name},</p>
        <p>Your table reservation with ID ${reservationId} has been successfully confirmed.</p>
        <p>Here are your Reservation Details : </p>
        <p> • Date: ${date}</p>
        <p> • Time: ${time}</p>
        <p> • Table Number: ${tableNo}</p>
        <p>Thank you for choosing our restaurant. We look forward to creating an unforgettable reservation experience for you.</p>
        <p>Need to make changes to this reservation ? If so, call 0772120231</p>
        <p>Feel free to sprinkle a touch of magic on your reservation by reaching out to our friendly team!</p>
        <p><br/></p>
        <p>Best regards,</p>
        <p>Emerald Bay Restaurant Team.</p>
    `;
};

module.exports = createTableReservationEmailTemplate;