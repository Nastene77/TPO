const Plane = require('./Plane');

class ExperimentalPlane extends Plane {
    constructor(model, maxSpeed, maxFlightDistance, maxLoadCapacity, type, classificationLevel) {
        super(model, maxSpeed, maxFlightDistance, maxLoadCapacity);
        this.type = type;
        this.classificationLevel = classificationLevel;
    }

    get type() {
        return this.type;
    }

    set type(value) {
        this.type = value;
    }

    get classificationLevel() {
        return this.classificationLevel;
    }

    set classificationLevel(value) {
        this.classificationLevel = value;
    }
}

module.exports = ExperimentalPlane;