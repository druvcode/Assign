import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { userExistModel} from '../../models/auth.model.js';

export const login = async (req, res) => {
    try {
        let result;
        const { email, password } = req.body;
        if(email){
         result = await userExistModel(email)
        }
        if (result[0].status == "inactive") {
            return res.status(400).json({ message: "Your account is inactive" })
        }
        if (result.length != 0) {
            const user = result[0];
            const hash = user.password;
            bcrypt.compare(password, hash, function (err, result) {
                if (err) {
                    console.log(err)
                    return res.status(500).json({ message: "Something wrong in comparing" })
                } else {
                    if (result) {
                        const token = jwt.sign(
                            { id: user.user_id, email: user.email},
                            process.env.JWT_SECRET_KEY,
                            { expiresIn: '1h' }
                        );
                        delete user.password;
                        return res.cookie('accessToken', token, {
                            httpOnly: true,
                        }).status(200).json({
                            message: 'Login successful',
                            // token,
                            user: {
                                id: user.user_id,
                                email: user.email,
                                name: user.name,
                                phone: user.phone,
                            }
                        })
                    } else {
                        return res.status(400).json({ message: "Invalid Crediential" })
                    }
                }
            });
        } else {
            return res.status(400).json({ message: "User not registered" })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}
