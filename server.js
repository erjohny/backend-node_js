require('dotenv').config();
const express = require("express")
const authRoutes = require("./routes/authRoutes")
const postRoutes = require("./routes/postRoutes")
const commentRoutes = require("./routes/commentRoutes")
const likeRoutes = require("./routes/likeRoutes")

const app = express()
app.use(express.json())

app.use('/auth', authRoutes);
app.use('/posts', postRoutes);
app.use(`/comment`, commentRoutes)
app.use("/likes", likeRoutes)

app.get('/', (req, res) => {
    res.send("Добро пожаловать на Node js")
})

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`))