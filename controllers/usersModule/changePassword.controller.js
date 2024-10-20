import {updatePasswordModel,getUserByIdModel } from "../../models/users.model.js";
import bcrypt from "bcrypt";


export const changePassword = async (req, res) => {
    const { currentPassword, newPassword, confirmPassword } = req.body;
    const userId = req.params.id;

    if (!currentPassword || !newPassword || !confirmPassword) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    if (newPassword !== confirmPassword) {
        return res.status(400).json({ message: 'New password do not match' });
    }

    try {
        // Get user from database
        const result = await getUserByIdModel(userId);
        const user = result[0];

        if (result.length===0) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check current password
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Current password is incorrect' });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update password in database
        await updatePasswordModel(userId, hashedPassword);

       return res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
};
