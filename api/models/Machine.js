
module.exports = {

    attributes: {

        name: {
            type: 'string'
        },
        
        uuid:{
            type: 'string',
            isUUID: true,
            required: true,
            unique: true
        },

        house: {
            model: 'House'
        },

        room: {
            model: 'Room'
        },

        me: {
            type: 'boolean',
            defaultsTo: false
        },

        lastSeen: {
            type: 'string',
            columnType: 'datetime'
        }

    }
};
