export type RecepieRequest = {
    recepieName: string,
    recepieDescription: string,
    recepieIngredients: string[],
    recepieInstructions: string[],
    recepieImage: string,
    recepieCategory: string[]
}