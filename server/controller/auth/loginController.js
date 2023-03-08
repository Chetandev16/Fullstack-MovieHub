import JwtService from "../../services/JwtService"
import { User } from "../../models"
import bcrypt from "bcrypt"

const loginController = {
    login: async (req, res) => {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ msg: "Please enter all fields" });
        }

        let access_token = null;

        try {
            const user = await User.findOne({ email: email });
            if (!user) {
                return res.status(400).json({ msg: "User does not exists" });
            }

            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                return res.status(400).json({ msg: "Invalid credentials" });
            }

            access_token = JwtService.generateToken({ id: user._id, email: user.email, roles: user.roles });
        } catch (err) {
            return res.status(500).json("Internal server error");
        }

        res.json(access_token)
    },

    getUsername: async (req, res) => {
        try {
            const user = await User.findOne({ email: req.params.email });
            if (!user) return res.status(400).json({ msg: "User does not exists" });
            return res.status(200).json(user.name);
        } catch (err) {
            return res.status(500).json("Internal server error");
        }
    }
}

export default loginController