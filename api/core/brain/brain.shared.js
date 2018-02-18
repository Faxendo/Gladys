var intentClassifier;

module.exports = {
    
    getClassifier: function(){
        return intentClassifier;
    },
    
    setClassifier: function(classifier){
        intentClassifier = classifier;
    }
};