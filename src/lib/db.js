import { createClient } from "redis"

const client = createClient({
  //   password: process.env.REDIS_PW,
  password: "1bWttMNUNGGfRGVmZ0YoAGbzX3EcEkFE",
  socket: {
    host: "redis-10950.c323.us-east-1-2.ec2.cloud.redislabs.com",
    port: 10950,
  },
})

client.on("error", (err) => console.log(err))

if (!client.isOpen) {
  client.connect()
}

// client.set('name', 'faysal')

export { client }
