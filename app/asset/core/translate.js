module.exports = (originText, convLang, originLang) => {
    if (!__lang__) return originText

    if (!convLang) convLang = 'US'
    convLang = _.upperCase(convLang)

    if (!originLang) originLang = 'US'
    originLang = _.upperCase(originLang)

    var trans = _.find(__lang__, (langObj) => {
        return false === _.isEmpty(langObj[originText])
    })

    return trans ?
        _.chain(trans)
        .pickBy(
            (supportLangs) => _.includes(supportLangs, convLang)
        ).keys().first().value() :
        originText
}
