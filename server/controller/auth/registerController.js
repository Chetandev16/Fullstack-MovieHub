import { User } from "../../models";
import bcrypt from "bcrypt";

const registerController = {
    register: async (req, res, next) => {
        const { name, email, password } = req.body;
        // res.send({ name, email, password });
        if (!name || !email || !password) {
            return res.status(400).json({ msg: "Please enter all fields" });
        }

        // Check for existing user
        try {
            const exist = await User.exists({ email: email });
            if (exist) {
                return res.status(400).json({ msg: "User already exists" });
            }

            const newPassword = await bcrypt.hash(password, 10);

            const newUser = new User({
                name,
                email,
                password: newPassword
            })
            await newUser.save();
        } catch (err) {
            return res.status(500).json("Internal server error");
        }

        res.json({ msg: "User registered!!" })
    }
}

export default registerController