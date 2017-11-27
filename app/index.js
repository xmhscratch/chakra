const system = new(require('solais'))

system
    .bootstrap()
    .then(() => {
        return system.install([
            require('solais-server'),
            require('solais-server-static'),
        ])
    })
    .catch((error) => {
        console.error(error)
    })

system.once('ready', () => {
    $server.start()
    $server.autoRefresh()
})

if (global.gc) {
    global.gc() & setInterval(function() {
        return global.gc()
    }, 1800000)
}