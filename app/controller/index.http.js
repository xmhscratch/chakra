module.exports = {
    '/': {
        GET: function(req, res, next) {
            res.render('index')
        }
    },

    '/config.json': {
        GET: function(req, res, next) {
            res.json({ urls: config('urls') })
        }
    }
}
