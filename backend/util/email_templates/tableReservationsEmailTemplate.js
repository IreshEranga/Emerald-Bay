const tableReservationsEmailTemplate = (name, reservationId, date, time, tableNo) => {
    return `
        <p>Dear ${name},</p>
        <p>Your table reservation with ID ${reservationId} has been successfully confirmed.</p>
        <p>Your reservation details</p>
        <p>Date: ${date}</p>
        <p>Time: ${time}</p>
        <p>Table Number: ${tableNo}</p>
        <p>Thank you for choosing our restaurant. We look forward to serving you!</p>
        <p>Best regards,</p>
        <p>The Restaurant Team</p>
    `;
};

module.exports = tableReservationsEmailTemplate;