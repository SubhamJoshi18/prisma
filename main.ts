import express from 'express'
import morgan from 'morgan'
import routing from './src/routes/todo.route'
const app = express()

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})

app.use(express.json())
app.use(morgan('dev'))
app.use('/todos', routing)
export default app
