const getPremiumStatus = async (req, res) => {
    try {
        const isPremium = req.user.isPremium;
        res.status(200).json({ isPremium });
    }
    catch (error) {
        console.error("Error fetching premium status:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { getPremiumStatus };