const bcrypt = require(`bcrypt`);
const db = require(`../models/db`)
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    const { first_name, last_name, email, password, age, avatar } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        db.query(
            'INSERT INTO users (first_name, last_name, email, password, age, avatar) VALUES (?, ?, ?, ?, ?, ?)',
            [first_name, last_name, email, hashedPassword, age, avatar || null],
            (err, result) => {
                if (err) return res.status(500).json({ error: 'Ошибка базы данных' });
                res.status(201).json({ message: 'Пользователь зарегистрирован' });
            }
        );
    } catch (err) {
        res.status(500).json({ error: 'Ошибка сервера' });
    }
};

exports.login = (req, res) => {
    const { email, password } = req.body;
    try {
        db.query(`SELECT * FROM users WHERE email = ?`, [email], async (err, results) => {
            if (err) return res.status(500).json({ message: "Ошибка базы данных" })
            if (results.length === 0) return res.status(404).json({ message: "Неверный логин или пароль" })

            const user = results[0];
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) return res.status(401).json({ message: "Неверный логин или пароль" })

            const token = jwt.sign({ id: user.id, }, process.env.JWT_SECRET, { expiresIn: '1d' })

            db.query(`UPDATE users SET token = ? WHERE id = ?`, [token, user.id], (updateErr) => {
                if (updateErr) return res.status(500).json({ err: "Ошибка базы данных" })
                res.status(200).json({ message: "Авторизация прошла успешно", token })
            })
        })
    } catch (err) {
        res.status(500).json({ message: "Ошибка сервера" })
        console.log(`Ошибка сервер, ${err}`);

    }
}

exports.deleteUser = (req, res) => {

    const userId = req.params.id;
    const query = "DELETE FROM users WHERE id =?"

    db.query(query, [userId], (err, result) => {
        if (err) return res.status(500).json({ error: "Ошибка базы данных" })
        if (result.affectedRows === 0) return res.status(404).json({ message: "Пользователь не найден" })
        res.status(200).json({ message: "Пользователь успешно удален" })
    })
}

exports.getUsers = (req, res) => {
    const query = "SELECT id, first_name, last_name, email,age, created_at FROM users"

    db.query(query, (err, result) => {
        if (err) return res.status(500).json({ error: "Ошибка базы данных" })
        res.status(200).json({ users: result })
    })
}