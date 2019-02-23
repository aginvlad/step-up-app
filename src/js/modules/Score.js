import { elements } from '../views/base';

export default class Score {
    constructor() {
        this.totalSteps = 100;
    }

    initSteps() {
        elements.steps.textContent = this.totalSteps;
    }

    getScore() {
        return this.totalSteps;
    }

    addStep() {
        this.totalSteps++;
    }

    removeStep() {
        this.totalSteps--;
    }

    resetSteps() {
        this.totalSteps = 0;
    }
};