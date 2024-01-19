import db from '../db.js'

const addItem = async (payload) => {
    try {
        const existUser = await db.get(process.env.USERS_TABLE, { userId: payload.userId })

        if (existUser) {
            const response = await db.update(process.env.USERS_TABLE, {
                userId: payload.userId,
                items: Array.from(new Set([...existUser.items, payload.itemId]))
            })
            return response
        } else {
            const response = await db.create(process.env.USERS_TABLE, {
                userId: payload.userId,
                items: [payload.itemId]
            })
            return response
        }

    } catch (error) {
        console.log("error", error)
    }
}

export {
    addItem
}