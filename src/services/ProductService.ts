import { safeParse, number, pipe, transform, string, parse } from "valibot";
import { DraftProductSchhema, ProductSchema, ProductsSchema, type Product } from "../types";
import axios from "axios";
import { toBoolean } from "../utils";

type ProductDataType ={
    [k: string]: FormDataEntryValue;
}

export async function addProduct(data: ProductDataType){
    try {
        const result = safeParse(DraftProductSchhema, {
            name: data.name,
            price: +data.price,
        })
        
        if (result.success){
            const url = `${import.meta.env.VITE_API_URL}api/products`
            await axios.post(url, {
                name: result.output.name,
                price: result.output.price
            })
            
        }else{
            throw new Error('Datos no validos')
        }
        
    } catch (error) {
        console.log(error);
        
    }
    
}

export async function getProducts(){
    try {
        const url = `${import.meta.env.VITE_API_URL}api/products`
        const {data} = await axios(url)
        const result = safeParse(ProductsSchema, data.data)
        if(result.success){
            return result.output
        }else{
            throw new Error('Hubo un Error...')
        }        
        
    } catch (error) {
        console.log(error);
        
    }
}

export async function getProductById(id: Product['id']){
    try {
        const url = `${import.meta.env.VITE_API_URL}api/products/${id}`
        const {data} = await axios(url)
        const result = safeParse(ProductSchema, data.data)
        if(result.success){
            return result.output
        }else{
            throw new Error('Hubo un Error...')
        }
        
    } catch (error) {
        console.log(error);
        
    }
}

export async function updateProduct(id: Product['id'], data: ProductDataType){
    try {
        const NumberSchema = pipe(string(), transform(Number), number())
        const result = safeParse(ProductSchema, {
            id,
            name: data.name,
            price: parse(NumberSchema, data.price),
            disponibility: toBoolean(data.disponibility.toString())
        })
        if(result.success){
            console.log(result.output);
            
            const url = `${import.meta.env.VITE_API_URL}api/products/${id}`
            await axios.put(url, result.output)
        }
        
        
    } catch (error) {
        console.log(error);
        
    }
}

export async function deleteProduct(id: Product['id']){
    try {
        const url = `${import.meta.env.VITE_API_URL}api/products/${id}`
        await axios.delete(url)

        
    } catch (error) {
        console.log(error);
        
    }
}

export async function updtaeProductDisponibility(id: Product['id']){
    try {
        const url = `${import.meta.env.VITE_API_URL}api/products/${id}`
        await axios.patch(url)
        
    } catch (error) {
        console.log(error);
        
    }
}