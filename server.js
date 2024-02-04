import express from 'express'
import { routes } from './routes/index.js'
import { sequelize } from './config/connection.js'
import './models/Index.js'

const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(routes)

// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening on http://localhost:3001/'))
})
