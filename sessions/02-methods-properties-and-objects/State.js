// Twitter: @cm_stead

function State(){
    this.defineProperty('count', 0);
    this.defineProperty('name', 'Bob');
}

State.prototype = {
    incrementCount: function(incrementValue = 1) {
        if(incrementValue < 1) {
            throw new Error(`Cannot increment with values less than one. Received: ${incrementValue}`);
        }

        this.count += incrementValue;
    },

    getMethodNameKey: function(originalKey) {
        return originalKey.substring(0, 1).toUpperCase() + originalKey.substring(1);
    },

    defineProperty: function(propertyName, initialValue) {
        this[propertyName] = initialValue;

        const methodName = 'reset' + this.getMethodNameKey(propertyName);
        this[methodName] = () => this.reset(propertyName, initialValue);
    },

    reset: function(key, value) {
        this[key] = value
    },
};

module.exports = State;