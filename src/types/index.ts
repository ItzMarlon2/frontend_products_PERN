import { array, boolean, number, object, string, type InferOutput } from "valibot";

export const DraftProductSchhema = object({
    name: string(),
    price: number()
})

export const ProductSchema = object({
    id: number(),
    name: string(),
    price: number(),
    disponibility: boolean()
})

export const ProductsSchema = array(ProductSchema)

export type Product = InferOutput<typeof ProductSchema>