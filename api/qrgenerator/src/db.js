import { DynamoDBClient, PutItemCommand, GetItemCommand, UpdateItemCommand, DeleteItemCommand } from '@aws-sdk/client-dynamodb'
import { defaultProvider } from "@aws-sdk/credential-provider-node"
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb'

const client = new DynamoDBClient({
    region: "us-east-1",
    defaultProvider,
})

if (process.env.IS_OFFLINE) client.endpoint = "http://localhost:8000"

const db = {
    get: async (tableName, query) => {
        const command = new GetItemCommand({
            TableName: tableName,
            Key: marshall(query)
        })

        const { Item: item } = await client.send(command)

        if (!item) return null

        return unmarshall(item)
    },

    create: async (tableName, payload) => {
        await client.send(new PutItemCommand({
            TableName: tableName,
            Item: marshall(payload),
        }))

        return payload
    },

    update: async (tableName, payload) => {

        const { userId, ...props } = payload
        const itemKeys = Object.keys({ ...props });

        const { Attributes } = await client.send(new UpdateItemCommand({
            TableName: tableName,
            Key: marshall({ userId }),
            UpdateExpression: `SET ${itemKeys.map((k, index) => `#field${index} = :value${index}`).join(', ')}`,
            ExpressionAttributeNames: itemKeys.reduce((accumulator, k, index) => ({ ...accumulator, [`#field${index}`]: k }), {}),
            ExpressionAttributeValues: marshall(itemKeys.reduce((accumulator, k, index) => ({ ...accumulator, [`:value${index}`]: payload[k] }), {})),
            ReturnValues: "ALL_NEW"
        }));

        return unmarshall(Attributes)
    },

    delete: async (tableName, query) => {
        const { Attributes } = await client.send(new DeleteItemCommand({
            TableName: tableName,
            Key: marshall(query),
            ReturnValues: "ALL_OLD"
        }))

        return unmarshall(Attributes)
    },
}


export default db;