export class ModalLayout extends React.Component {

    static defaultProps = {
        models: []
    }

    state = {}

    componentDidMount() {
        const { models } = this.props
        const { modalContainer } = this.refs

        _.forEach(models, (model) => {
            let elementRefKey = _.camelCase(
                model.get('key')
            )
            let element = ReactDOM.findDOMNode(
                this.refs[elementRefKey]
            )
            let $element = jQuery(element)

            $element.modal({
                closable: model.get('closable'),
                onVisible: () => model.set('visible', true),
                onHidden: () => model.set('visible', false),
                blurring: true,
                autofocus: true,
                allowMultiple: false,
                queue: true
            })

            model.on('change:visible', (model) => {
                var visibility = model.get('visible')
                $element.modal(
                    visibility ? 'show' : 'hide'
                )
            })

            model.set('element', $element)
        })
    }

    render() {
        const { models } = this.props

        return <div ref="modalContainer">
            {_.map(models, (model) => {
                const ModalComponent = model.get('component')
                const modalProps = model.get('props')

                modalProps.model = model
                return <ModalComponent
                    key={model.get('key')}
                    ref={_.camelCase(model.get('key'))}
                    {...modalProps}
                ></ModalComponent>
            })}
        </div>
    }
}

export default class Renderer {
    constructor(models, callback) {
        return ReactDOM.render(
            <ModalLayout
                models={models}
            ></ModalLayout>,
            document.getElementById('modal'),
            callback
        )
    }
}
