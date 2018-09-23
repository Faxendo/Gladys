
module.exports = {

    attributes: {

        externalid: {
            type: 'string',
            required: true,
            unique: true
        },

        name: {
            type: 'string'
        },

        location: {
            type: 'string'
        },

        start: {
            type: 'string',
            columnType: 'datetime'
        },

        end: {
            type: 'string',
            columnType: 'datetime'
        },

        fullday: {
            type: 'boolean',
            defaultsTo: false
        },

        calendar: {
            model: 'Calendar',
            required: true
        }

    }
};
