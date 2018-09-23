
module.exports = {

    attributes: {

        datetime: {
            type: 'string',
            columnType: 'datetime',
            required: true
        },

        latitude: {
            type: 'float',
            required: true
        },

        longitude: {
            type: 'float',
            required: true
        },

        altitude: {
            type: 'float'
        },

        accuracy: {
            type: 'float'
        },

        user: {
            model: 'User',
            required: true
        }

    }

};
