const { Cashfree } = require("cashfree-pg");
const Order = require("../models/order");
const User = require("../models/user");

// Cashfree configuration
Cashfree.XClientId = "TEST430329ae80e0f32e41a393d78b923034";
Cashfree.XClientSecret = "TESTaf195616268bd6202eeb3bf8dc458956e7192a85";
Cashfree.XEnvironment = "SANDBOX";


const purchasePremium = async (req, res) => {
    try {
        const request = {
            order_amount: 199,
            order_currency: "INR",
            customer_details: {
                customer_id: req.user.id.toString(),
                customer_email: req.user.email,
                customer_phone: "9999999999"
            }
        };

        const response = await Cashfree.PGCreateOrder(request);

        const order = await Order.create({
            orderId: response.data.order_id,
            status: "PENDING",
            userId: req.user.id
        });

        res.status(201).json({
            order,
            paymentSessionId: response.data.payment_session_id
        });

    } catch (error) {
        console.error("Purchase error:", error);
        res.status(500).json({ message: "Order creation failed" });
    }
};


const updateTransactionStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;

        const order = await Order.findOne({ where: { orderId } });

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        // Update order status
        order.status = status;
        await order.save();

        // If successful → make user premium
        if (status === "SUCCESS") {
            const user = await User.findByPk(order.userId);
            user.isPremium = true;
            await user.save();
        }

        res.status(200).json({ message: "Order status updated" });

    } catch (error) {
        console.error("Update status error:", error);
        res.status(500).json({ message: "Status update failed" });
    }
};


const fetchPaymentStatus = async (req, res) => {
    try {
        const { orderId } = req.params;

        const response = await Cashfree.PGOrderFetchPayments(orderId);

        res.status(200).json(response.data);

    } catch (error) {
        console.error("Fetch payment error:", error);
        res.status(500).json({ message: "Failed to fetch payment details" });
    }
};

module.exports = {
    purchasePremium,
    updateTransactionStatus,
    fetchPaymentStatus
};  