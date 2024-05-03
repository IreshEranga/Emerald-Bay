const updateVIPRoomReservationEmailTemplate = (name, reservationId, date, time, guests) => {
    return `
        <p>Dear ${name},</p>
        <p>Your vip room reservation with ID ${reservationId} has been successfully updated.</p>
        <p>Here are your new Reservation Details : </p>
        <p> • Date: ${date}</p>
        <p> • Time: ${time}</p>
        <p> • Number of Guests: ${guests}</p>
        <p>Thank you for choosing our restaurant. We look forward to creating an unforgettable reservation experience for you.</p>
        <p>Need to make changes to this reservation ? If so, call 0772120231.</p>
        <p>Feel free to sprinkle a touch of magic on your reservation by reaching out to our friendly team!</p>
        <p><br/></p>
        <p>Best regards,</p>
        <p>Emerald Bay Restaurant Team.</p>
    `;
};

module.exports = updateVIPRoomReservationEmailTemplate;