
module.exports = {

    attributes: {

        name: {
            type: 'string',
            required: true
        },

        // if define by datetime
        datetime: {
            type: 'string',
            columnType: 'datetime'
        },

        // or just by recurring + time
        time: {
            type: 'string',
            custom: function(time) {
              var re = /^[0-2]\d:[0-5]\d$/;
              return (time !== '' && time.match(re));
            }
        },
        // going from 0 = Sunday
        // to 6 = Saturday
        dayofweek: {
            type: 'number',
            isInteger: true,
            min: -1,
            max: 6,
            defaultsTo: -1
        },

        cronrule: {
            type: 'string'
        },

        autoWakeUp: {
            type: 'boolean',
            defaultsTo: false
        },

        active: {
            type: 'boolean',
            defaultsTo: true
        },

        // determine if this alarm is an alarm for wake up or not
        isWakeUp: {
            type: 'boolean',
            defaultsTo: false
        },

        user: {
            model: 'User',
            required: true
        }

    }
};
