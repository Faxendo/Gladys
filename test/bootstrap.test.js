var Sails = require('sails'),
  sails, fixtures;


var Promise = require('bluebird');

if (process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}

/*
log: {
      level: 'error'
    },
    */

// Gobal before
before(function(done) {
  var connectionName = 'test';
  if(process.env.TRAVIS) {
     connectionName = 'travis'; 
  } 
   
  Sails.lift({
    models: {
      connection: connectionName,
      migrate: 'drop'
    }
  }, function(err, server) {
    sails = server;
    if (err) return done(err);
    
    // adding a fake module for tests
    addTestModuleGladys(gladys);
    
    done(err, sails);

  });
});

beforeEach(function(done){
    this.timeout(40000);

    fillDatabaseWithFixtures()
      .then(() => gladys.param.clearCache())
      .then(() => gladys.paramUser.clearCache())
      .then(() => done())
      .catch(done);
});

after(function(done) {
  // here you can clear fixtures, etc.
  sails.lower(function(){
      done();
  });
});


function fillDatabaseWithFixtures(){
  
  var order = [
      'User',
      'House',
      'Mode',
      'Room',
      'Token',
      'Alarm',
      'Device',
      'DeviceType',
      'DeviceState', 
      'NotificationType',
      'NotificationUser',
      'Notification',
      'EventType',
      'Launcher',
      'ActionType',
      'ActionTypeParam',
      'Action',
      'ActionParam',
      'StateType',
      'State',
      'Event',
      'Script',
      'Calendar',
      'CalendarEvent',
      'Area',
      'Machine',
      'BoxType',
      'Box',
      'Module',
      'Sentence',
      'Param',
      'ParamUser',
      'Location',
      'StateTypeParam',
      'StateParam',
      'StateTemplateParam',
      'Message',
      'Answer'
  ];

  return Promise.each(order, function(tableName) {
    console.log(tableName);
    return sails.getDatastore().sendNativeQuery('DELETE FROM ' + tableName.toLowerCase())
      .then(() => global[tableName].createEach(require('./fixtures/' + tableName.toLowerCase() + '.json')))
  });
}

function addTestModuleGladys(gladys){
    
    // simulating fake test module
    gladys.modules.test = {
        exec: function(){
            return Promise.resolve();
        },
        notify: function(notif, user){
            console.log('Test notification');
            return Promise.resolve();
        },
        install: function(){
            return Promise.resolve();
        },
        command: function() {
            return Promise.resolve();
        },
        weather: {
            get: function(options) {return Promise.resolve({temperature: 12, humidity: 0.9, weather: 'rain'}); }
        },
        calendar: {
            sync: function() {return Promise.resolve()},
        },
        direction: {
            travelTime: function() {return Promise.resolve({departure_time: 1495915223, arrival_time: 1495918128, duration: 2905})}
        },
        music: {
            flushQueue: function() {return Promise.resolve()},
            getCurrentTrack: function() {return Promise.resolve({title: 'test', artist:'test'})},
            getQueue: function() {return Promise.resolve([{title: 'test', artist:'test'}])},
            getMuted: function() {return Promise.resolve({muted: true})},
            getPlaying: function() {return Promise.resolve({playing: true})},
            getPlaylists: function() {return Promise.resolve([{title: 'test'}])},
            getVolume: function() {return Promise.resolve({volume: 1})},
            next: function() {return Promise.resolve()},
            pause: function() {return Promise.resolve()},
            play: function() {return Promise.resolve()},
            playPlaylist: function() {return Promise.resolve()},
            previous: function() {return Promise.resolve()},
            queue: function() {return Promise.resolve()},
            setMuted: function() {return Promise.resolve()},
            setVolume: function() {return Promise.resolve()},
            stop: function() {return Promise.resolve()},
        }
    };

    gladys.modules.test2 = {
        exec: function(){
            return Promise.resolve();
        }
    };

    // register direction module
    gladys.direction.addProvider('test');

    // register weather module
    gladys.weather.addProvider('test');
}