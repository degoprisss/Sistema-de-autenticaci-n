const mqtt = require('mqtt')

const mesagge = (req, res, next) => {
    try {
        let client = mqtt.connect('mqtt://mqtt.lyaelectronic.com:4010')

        let id = req.params.id

        client.on('connect', function () {
            client.subscribe('lyatest/diego', function (err) {
              if (!err) {
                client.publish('lyatest/diego', `{“message”: This API provides endpoints to get random cat facts., ”user”:[${id}]}`)
              }
            })
          })

          client.on('message', function (topic, message) {
            console.log(message.toString())
            client.end()
          })
          
        res.status(201).json({mesagge: 'estamos enviando mensajes'})

    } catch (error) {
        return next(error)
    }
}

module.exports = { mesagge }