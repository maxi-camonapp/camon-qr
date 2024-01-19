import db from '../db.js'

const getItems = async (payload) => {
    try {
        const existUser = await db.get(process.env.USERS_TABLE, payload)
        if (existUser) return existUser
        const newUser = {...payload, items:[]}
        await db.create(process.env.USERS_TABLE, newUser)
        return newUser
    } catch (error) {
        console.log(error)
    }
    
    return user.items
}

export {
    getItems
}