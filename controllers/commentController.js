const db = require("../models/db")

exports.addComment = (req, res) => {
    const { postId, comment } = req.body;
    const userId = req.user.id

    db.query(
        "INSERT INTO comments (post_id, user_id, comment) VALUES (?,?,?)",
        [postId, userId, comment],
        (err, result) => {
            if (err) return res.status(500).json({ err: "Ошибка базы данных" })
            res.status(201).json({ message: "Комментарий добавлен", commentId: result.insertId })
        }
    )
}