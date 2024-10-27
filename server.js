const express = require('express');
const path = require('path');
const bodyParser = require('body-parser'); // Add body-parser for handling JSON requests

const app = express();
const port = 3000;

app.use(express.json());
app.use(bodyParser.json()); // Add this line

const orders = {
    '12345': { status: 'Shipped', deliveryDate: '2024-10-30', trackingNumber: 'TRACK123' },
    '67890': { status: 'Processing', deliveryDate: '2024-11-05', trackingNumber: '' },
};

app.get('/', (req, res) => {
    res.send('Order Status Bot is running!');
});

// Endpoint for Dialogflow fulfillment
app.post('/webhook', (req, res) => {
    const orderId = req.body.queryResult.parameters.orderId; // Get orderId from the parameters
    const order = orders[orderId];

    if (order) {
        res.json({
            fulfillmentText: `Order ID: ${orderId}\nStatus: ${order.status}\nDelivery Date: ${order.deliveryDate}\nTracking Number: ${order.trackingNumber}`,
        });
    } else {
        res.json({
            fulfillmentText: 'Sorry, I could not find that order. Please check the Order ID.',
        });
    }
});

// Serve the index.html file
app.get('/chat', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
