const User = require('../models/user');



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

const getLeaderboard = async(req,res)=>{
    try {
        const users = await User.find({}, 'name totalExpense')
            .sort({ totalExpense: -1 });
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching leaderboard:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = { getPremiumStatus, getLeaderboard };