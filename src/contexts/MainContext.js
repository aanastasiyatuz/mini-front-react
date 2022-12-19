import React, { useReducer } from "react";
import axios from "axios"
import URL from "../Config";
export const mainContext = React.createContext();

const INIT_STATE = {
    products: [],
    exactproduct: {},
    productToEdit: {}
}

const reducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case "GET_PRODUCTS_DATA": return { ...state, products: action.payload }
        case "GET_EXACT_PRODUCT_DATA": return { ...state, exactproduct: action.payload }
        case "EDIT_PRODUCT": return { ...state, productToEdit: action.payload }
        default: return state
    }
}

const MainContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, INIT_STATE)

    const getHeadersWithContentType = () => {
        let config = {
            "headers":
                { "Content-Type": "multipart/form-data" }
        }

        let access = localStorage.getItem("access")
        if (access) {
            config["headers"]["Authorization"] = `Bearer ${access}`
        }
        return config
    }

    const getHeaders = () => {
        let config = {
            "headers": {}
        }
        let access = localStorage.getItem("access")
        if (access) {
            config["headers"]["Authorization"] = `Bearer ${access}`
        }
        return config
    }

    const getProductsData = async () => {
        let config = getHeaders()
        console.log(`send GET request "/products/"`)
        let { data } = await axios(`${URL}/products/`, config)
        console.log("getProductsData", data)
        
        dispatch({
            type: "GET_PRODUCTS_DATA",
            payload: data.results
        })
    }

    const getExactProductData = async (id) => {
        let config = getHeaders()
        console.log(`send GET request "/products/${id}"`)
        let { data } = await axios(`${URL}/products/${id}`, config)
        console.log("getExactProductData", data)
        
        dispatch({
            type: "GET_EXACT_PRODUCT_DATA",
            payload: data
        })

    }

    const editProduct = async (id) => {
        let config = getHeaders()

        console.log(`send GET request "/products/${id}"`)
        let { data } = await axios(`${URL}/products/${id}`, config)
        console.log("editProduct", data)
        
        dispatch({
            type: "EDIT_PRODUCT",
            payload: data
        })

    }

    const addProduct = async (newProduct) => {
        let config = getHeadersWithContentType()

        console.log(`send POST request "/products/"`)
        let { data } = await axios.post(`${URL}/products/`, newProduct, config)
        console.log("addProduct", data)
        await getExactProductData(data.id)

        return data
    }

    const deleteProduct = async (id) => {
        let config = getHeaders()

        console.log(`send DELETE request "/products/${id}"`)
        await axios.delete(`${URL}/products/${id}/`, config)
    }

    const saveProduct = async (newProduct) => {
        let config = getHeadersWithContentType()

        console.log(`send PATCH request "/products/${newProduct.id}`)
        await axios.patch(`${URL}/products/${newProduct.id}/`, newProduct, config)
        getExactProductData(newProduct.id)
    }


    return (
        <mainContext.Provider value={{
            products: state.products,
            exactproduct: state.exactproduct,
            productToEdit: state.productToEdit,
            user: state.user,
            getProductsData,
            getExactProductData,
            addProduct,
            deleteProduct,
            editProduct,
            saveProduct
        }}>
            {children}
        </mainContext.Provider>
    )
}

export default MainContextProvider;