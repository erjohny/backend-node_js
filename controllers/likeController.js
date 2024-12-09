const db = require("../models/db")

exports.toggleLike = (req, res) => {
    const { postId } = req.body;
    const userId = req.user.id;

    db.query(
        "SELECT * FROM likes WHERE post_id = ? AND user_id = ?",
        [postId, userId],
        (err, results) => {
            if (err) return res.status(500).json({ error: "Ошибка базы данных" })

            if (results.length > 0) {
                db.query(
                    "DELETE FROM likes WHERE post_id = ? user_id = ?",
                    [postId, userId],
                    (deleteErr) => {
                        if (deleteErr) return res.status(500).json({ error: "Ошибка базы данных" })
                        res.status(200).json({ message: "Лайк удален" })
                    }
                )
            } else {
                db.query(
                    "INSERT INTO likes (post_id, user_id) VALUES (?,?)",
                    [postId, userId],
                    (insertErr) => {
                        if (insertErr) return res.status(500).json({ error: "Ошибка базы данных" })
                        res.status(201).json({ message: "Лайк добавлен" })
                    }
                )
            }
        }
    )
}