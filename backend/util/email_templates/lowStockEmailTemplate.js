const lowStockEmailTemplate = (supplierName, itemName, itemQuantity) => `
<!DOCTYPE html>
<html>
<head>
    <title>Low Stock Notification</title>
    <style>
        body { font-family: 'Arial', sans-serif; }
        .container { padding: 20px; }
        .alert { color: #D8000C; background-color: #FFD2D2; }
    </style>
</head>
<body>
    <div class="container">
        <h1 class="alert">Urgent: Low Stock Alert for ${itemName}</h1>
        <p>Dear ${supplierName},</p>
        <p>We are reaching out to notify you that stock levels for the following item are critically low:</p>
        <p><strong>Item Name:</strong> ${itemName}</p>
        <p><strong>Current Stock:</strong> ${itemQuantity}</p>
        <p>Please let us know as soon as possible when we can expect delivery of the additional stock. Your prompt response will help us continue to offer the best service to our customers without interruption.</p>
        <p>If you need to discuss this further, please feel free to contact us by replying to this email.</p>
        <p>Thank you for your immediate attention to this matter,</p>
        <p>Your Partner, Emerald Bay Restaurant</p>
    </div>
</body>
</html>
`;

module.exports = lowStockEmailTemplate;
