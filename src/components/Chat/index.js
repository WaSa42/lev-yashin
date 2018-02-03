import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faSpinner, faPaperPlane } from '@fortawesome/fontawesome-free-solid';

import './Chat.scss';
import Message from './Message';

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = { content: props.inputValue };
    }

    componentWillReceiveProps(nextProps) {
        const { inputValue } = nextProps;
        if (inputValue !== this.props.inputValue) { this.setState({ content: inputValue }); }
    }

    componentDidUpdate(prevProps) {
        const { gameId, messages } = this.props;
        if (prevProps.messages.lenght < 1 && messages.length > 1) {
            const chatDiv = document.getElementById(`chat-${gameId}`);
            chatDiv.scrollTop = chatDiv.scrollHeight;
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const { gameId, isSending } = this.props;
        if (!isSending) {
            this.props.onSubmit({ id: gameId, message: this.state.content });
            this.setState({ content: '' });
        }
        return false;
    }

    renderMessages() {
        const { messages, userId } = this.props;
        return messages.map(message => (
            <Message
                {...message}
                isUser={message.user._id === userId}
                key={message._id}
                picture={message.user.profile.picture}
            />
        ));
    }

    render() {
        const { children, gameId, isSending, t, userName } = this.props;
        return (
            <div id={`chat-${gameId}`} className="chat">
                <div className="chat-window">
                    <ul className="messages">
                        <li className="message left">
                            <div className="avatar" />
                            <div className="text-wrapper">
                                <div className="text">
                                    {t('component:Chat.helpText', { name: userName })}
                                </div>
                            </div>
                        </li>
                        {this.renderMessages()}
                    </ul>
                    {children}
                    <form
                        className="bottom-wrapper clearfix"
                        onSubmit={e => this.handleSubmit(e)}
                    >
                        <div className="input-group mb-3">
                            <input
                                className="form-control"
                                name="content"
                                onChange={e => this.setState({ content: e.target.value })}
                                placeholder={t('component:Chat.placeholder')}
                                value={this.state.content}
                            />
                            <div className="input-group-append">
                                <button disabled={isSending} type="submit" className="btn btn-outline-secondary">
                                    <FontAwesomeIcon icon={isSending ? faSpinner : faPaperPlane} spin={isSending} />
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

Chat.propTypes = {
    children: PropTypes.element,
    gameId: PropTypes.string.isRequired,
    isSending: PropTypes.bool.isRequired,
    inputValue: PropTypes.string,
    messages: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        sentAt: PropTypes.string.isRequired,
        user: PropTypes.shape({ profile: PropTypes.shape({ picture: PropTypes.string.isRequired }).isRequired }),
    })),
    onSubmit: PropTypes.func,
    t: PropTypes.func.isRequired,
    userId: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
};

Chat.defaultProps = {
    children: null,
    inputValue: '',
    messages: [],
    // eslint-disable-next-line no-console
    onSubmit: () => console.log('Please provide an onSubmit callback.'),
};

export default translate()(Chat);
