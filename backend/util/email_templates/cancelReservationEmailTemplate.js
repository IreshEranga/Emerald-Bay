const cancelReservationEmailTemplate = (name, reservationId) => {
    return `
        <p>Dear ${name},</p>
        <p>Your table reservation with ID ${reservationId} has been successfully cancelled.</p>
        
        <p>Thank you for choosing our restaurant.</p>
        <p>As requested, your reservation will no longer be available as your reservation has been successfully cancelled.</p>
        <p>Feel free to sprinkle a touch of magic on your reservation by reaching out to our friendly team!</p>
        <p><br/></p>
        <p>Best regards,</p>
        <p>Emerald Bay Restaurant Team.</p>
    `;
};

module.exports = cancelReservationEmailTemplate;