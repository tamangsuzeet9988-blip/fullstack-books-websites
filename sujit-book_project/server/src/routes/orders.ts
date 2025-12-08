import { Router } from "express";
import { readDB, writeDB } from "../db";

const router = Router();

// GET all orders
router.get("/", async (req, res) => {
    const db = await readDB();
    res.json(db.orders);
});

// POST new order
router.post("/", async (req, res) => {
    const { items, total } = req.body;

    const db = await readDB();

    const newOrder = {
        id: Date.now(),
        items,
        total,
        date: new Date().toISOString(),
    };

    db.orders.push(newOrder);
    await writeDB(db);

    res.json({ message: "Order placed", order: newOrder });
});

export default router;
