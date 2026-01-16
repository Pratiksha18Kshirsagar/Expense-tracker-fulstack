const cashfree = new Cashfree();
document.getElementById('premiumBtn').onclick = async () => {
    const token = localStorage.getItem('token');

    const res = await axios.get('http://localhost:4000/purchase', {
        headers: { Authorization: token }
    });

    const { paymentSessionId, order } = res.data;

    cashfree.checkout({
        paymentSessionId
    }).then(async (result) => {

        if (result.error) {
            await updateStatus(order.orderId, 'FAILED');
            alert('TRANSACTION FAILED');
        }

        if (result.paymentDetails) {
            await updateStatus(order.orderId, 'SUCCESS');
            alert('Transaction successful');
        }

    });
};

async function updateStatus(orderId, status) {
    const token = localStorage.getItem('token');

    await axios.post('http://localhost:4000/update-status', {
        orderId,
        status
    }, {
        headers: { Authorization: token }
    });
}