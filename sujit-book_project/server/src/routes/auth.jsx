import { Router } from "express";
const router = Router();

// Demo login – no password check
router.post("/login", (req, res) => {
    const { username } = req.body;

    if (!username) return res.status(400).json({ message: "Username required" });

    res.json({ message: "Login successful", user: username });
});

export default router;
