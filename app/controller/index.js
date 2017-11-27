module.exports = [
    function(req, res, next) {
		res.header("Access-Control-Allow-Origin", "*")
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")

        return next()
    },

    System.Server.App.Express.static(
        node.path.join(__dirname, '../public')
    )
]
