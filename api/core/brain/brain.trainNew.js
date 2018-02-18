const Promise = require('bluebird');
const shared = require('./brain.shared.js');
const natural = require('natural');

module.exports = function train() {

    // we get all sentences, rooms, and deviceTypes
    return gladys.sentence.getAll()
        .then((sentences) => {

            if (sentences.length === 0) {
                sails.log.warn(`Brain : trainNew not possible. No sentences found.`);
                return Promise.resolve();
            }

            const PorterStemmer = require('../../../node_modules/natural/lib/natural/stemmers/porter_stemmer_' + sentences[0].language);
            const classifier = new natural.BayesClassifier(PorterStemmer);

            sentences.forEach((sentence) => {
                classifier.addDocument(sentence.text, sentence.service + sails.config.brain.separator + sentence.label);
            });

            classifier.train();

            // we set the actual classifier to the new classifier
            shared.setClassifier(classifier);

            sails.log.info(`Brain trained with success ! Added ${sentences.length} sentences.`);
            return Promise.resolve();
        })
        .then(function() {
            return gladys.brain.save();
        });
};