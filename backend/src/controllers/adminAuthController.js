import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../config/dataSource.js";
import Admin from "../entities/Admin.js";

export const adminLogin = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const adminRepo = AppDataSource.getRepository("Admin");
    const admin = await adminRepo.findOne({ where: { username } });

    if (!admin) {
      return res.status(401).json({ message: "Login yoki parol noto‘g‘ri" });
    }

    const isMatch = await bcrypt.compare(password, admin.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: "Login yoki parol noto‘g‘ri" });
    }

    const token = jwt.sign(
      { id: admin.id, username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token });
  } catch (err) {
    next(err);
  }
};
