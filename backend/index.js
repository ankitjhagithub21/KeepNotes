require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connectDb = require('./db/conn')
const cookieParser = require('cookie-parser')
const authRouter = require('./routes/authRoutes')
const noteRouter = require('./routes/noteRoutes')
const app = express()
const port = 3000

connectDb()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin:process.env.ORIGIN,
  credentials:true
}))


app.use("/api/auth",authRouter)
app.use("/api/notes",noteRouter)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})