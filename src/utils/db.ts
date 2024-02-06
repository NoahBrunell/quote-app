import {Pool} from 'pg'

export const db = new Pool({
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.PASSWORD,
    host: process.env.HOST,
})
