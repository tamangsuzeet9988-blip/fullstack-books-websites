import { Router } from "express";
import { readDB } from "../db";

const router = Router();

// POST → Calculate total price
router.post("/calculate", async (req, res) => {
    const { items } = req.body;

    const db = await readDB();
    let total = 0;

    items.forEach((cartItem: any) => {
        const book = db.books.find((b: any) => b.id === cartItem.bookId);
        if (book) {
            total += book.price * cartItem.qty;
        }
    });

    res.json({ total });
});

export default router;
