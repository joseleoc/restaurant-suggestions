export class Allergy {
    id: string;
    name: string;
    foods: string[];
    description: string;
    type: string;

    constructor(data: Allergy) {
        this.id = data.id;
        this.name = data.name;
        this.foods = data.foods;
        this.description = data.description;
        this.type = data.type;
    }
}
