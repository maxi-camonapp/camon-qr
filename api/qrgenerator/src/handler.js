import fastify from 'fastify'
import serverless from 'serverless-http'
import { addItem, removeItem, getItems } from './use-cases/index.js';
import cors from '@fastify/cors'

const app = fastify()

app.register(cors)

app.get('/:userId/items', async (req, res) => {
    try {
        const { userId } = req.params;
        const items = await getItems({userId});

        if (!items) return res.send({
            data: {
                items: []
            }
        })
        return res.send({ data: items })
    } catch (error) {
        return res.status(500).send({ msg: JSON.stringify(error) })
    }
}) 

app.post('/:userId/items', async (req, res) => {
    try {
        const { userId } = req.params
        const { itemId } = req.body
        const response = await addItem({ userId, itemId })
        return {
            data: response
        }
    } catch (error) {
        return res.status(500).send({ error })
    }
});

app.delete('/:userId/items/:itemId', async (req, res) => {
    try {
        const { userId, itemId } = req.params;
        const items = await removeItem({userId,itemId});
        return res.send({ data: items })
    } catch (error) {
        return res.status(500).send({ msg: JSON.stringify(error) })
    }
});

export const main = serverless(app, {
    basePath: '/users'
});
