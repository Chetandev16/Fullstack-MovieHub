import express from 'express'
import { APP_PORT,DB_URL } from './config'
import mongoose from 'mongoose'
import cors from 'cors'
import routes from './routes'

const app = express()

app.use(express.json())
mongoose.connect(DB_URL, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false});
const db = mongoose.connection;

app.use(cors())

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("DB connected!")
})


app.use('/auth',routes)
app.use('/api',routes)


app.listen(APP_PORT, () => {
    console.log(`Server is running on port ${APP_PORT}`)
})