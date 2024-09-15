import type { Schema } from "@/amplify/data/resource"
import { generateClient } from "aws-amplify/api"

const client = generateClient<Schema>()


export const sayHello = async () => {
        const result = await client.queries.sayHello({
                name: "Amplify",
        })
        console.log('->', result)
}
