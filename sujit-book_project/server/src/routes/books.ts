import { Router } from "express";
import { readDB } from "../db";

const router = Router();

// GET all books
router.get("/", async (req, res) => {
    const db = await readDB();
    res.json(db.books);
});

// GET single book
router.get("/:id", async (req, res) => {
    const db = await readDB();
    const book = db.books.find((b: any) => b.id == req.params.id);

    if (!book) return res.status(404).json({ message: "Book not found" });

    res.json(book);
});

export default router;
