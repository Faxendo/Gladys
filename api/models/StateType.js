
module.exports = {

    attributes: {
        
        uuid: {
            type:'string',
            isUUID: true,
            unique: true, 
            required: true
        },

        name: {
            type: 'string',
            required: true
        },

        description: {
            type: 'string'
        },

        service: {
            type: 'string',
            required: true
        },

        function: {
            type: 'string',
            required: true
        }

    }
};
