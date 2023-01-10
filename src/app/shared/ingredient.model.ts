export class Ingredient {
  // public name: string;
  // public amount: number;
  //
  // constructor(name: string, amount: number) {
  //   this.name = name;
  //   this.amount = amount;
  // }

  // Because this is so common, typescript allows us to use a short-hand version shown below:

  constructor(public name: string, public amount: number) {}// Automatically assigns stuff appropriately.
}
