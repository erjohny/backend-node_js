const db = require("../models/db")

exports.createPost = (req, res) => {
    const { content } = req.body;
    const userId = req.user.id;

    db.query('INSERT INTO posts (user_id, content) VALUES (?, ?)',
        [userId, content],
        (err, result) => {
            if (err) return res.status(500).json({ error: 'Ошибка базы данных' });
            res.status(201).json({ message: 'Пост создан', postId: result.insertId });

        }
    )
}

exports.getPosts = (req, res) => {
    const query = `
        SELECT 
            posts.id AS post_id,
            posts.content,
            posts.created_at,
            users.first_name,
            users.last_name,
            (
                SELECT COUNT(*) FROM likes WHERE likes.post_id = posts.id
            ) AS like_count,
            (
                SELECT JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'comment_id', comments.id,
                        'comment', comments.comment,
                        'created_at', comments.created_at,
                        'user', JSON_OBJECT(
                            'id', comment_users.id,
                            'first_name', comment_users.first_name,
                            'last_name', comment_users.last_name
                        )
                    )
                )
                FROM comments
                LEFT JOIN users AS comment_users ON comments.user_id = comment_users.id
                WHERE comments.post_id = posts.id
            ) AS comments
        FROM posts
        LEFT JOIN users ON posts.user_id = users.id
        ORDER BY posts.created_at DESC;
    `;

    db.query(query, (err, results) => {
        try {
            if (err) return res.status(500).json({ error: 'Ошибка базы данных' });

            const formattedResults = results.map((post) => ({
                post_id: post.post_id,
                content: post.content,
                created_at: post.created_at,
                author: {
                    first_name: post.first_name,
                    last_name: post.last_name,
                },
                like_count: post.like_count,
                comments: typeof post.comments === 'string' ? JSON.parse(post.comments) : [],
            }));

            res.status(200).json({ posts: formattedResults });
        } catch (error) {
            console.log("Ошибка ", error);

        }
    });
};