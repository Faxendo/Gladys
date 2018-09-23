

module.exports = {

    attributes: {

        datetime: {
            type: 'string',
            columnType: 'datetime'
        },

        sender: {
            model: 'user'
        },

        receiver: {
            model: 'user'
        },

        text: {
            type: 'text'
        },

        conversation: {
            type: 'string',
            isUUID: true,
        },

        service: {
            type: 'string'
        },

        isRead: {
            type: 'boolean',
            defaultsTo: false
        }
    }
};