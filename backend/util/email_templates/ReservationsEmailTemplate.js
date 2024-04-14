const ReservationsEmailTemplate = (name, reservationId, date, time, guests) => {
    return `
        <p>Dear ${name},</p>
        <p>Your reservation with ID ${reservationId} has been successfully confirmed.</p>
        <p>Here are your Reservation Details : </p>
        <p> • Date: ${date}</p>
        <p> • Time: ${time}</p>
        <p> • Number of Guests: ${guests}</p>
        <p>Thank you for choosing our restaurant. We look forward to serving you!</p>
        <p>Best regards,</p>
        <p>Emerald Bay Restaurant Team.</p>
    `;
};

module.exports = ReservationsEmailTemplate;