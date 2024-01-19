import db from '../db.js'

const removeItem = async (payload) => {
    try {
        const existUser = await db.get(process.env.USERS_TABLE, {userId: payload.userId})
        if (existUser){

            const itemToDelete = payload.itemId
            const newArray = existUser.items.filter(item => item !== itemToDelete)

            const response = await db.update(process.env.USERS_TABLE, {
                userId: payload.userId,
                items: newArray
            })
            return response
        }
        return null

    } catch (error) {
        console.log("error", error)
    }
}

export {
    removeItem
}