import { FactoryService } from '../services/factory.service';

export class WeightedOptions {
    options = [];
    weights = [];

    constructor(private factoryService: FactoryService) { }

    add(option: any, weight: number): void {
        this.options[this.options.length] = option;
        this.weights[this.weights.length] = weight < 0 ? 0 : weight;
    }

    choose(): any {
        const totalWeight = this.weights.reduce((a, b) => a + b, 0);
        let randomChoice = this.factoryService.createRandomInteger(1, totalWeight);
        for (let index = 0; index < this.options.length; index++) {
            if (randomChoice <= this.weights[index]) {
                return this.options[index];
            }
            randomChoice -= this.weights[index];
        }
        return null;
    }
}
