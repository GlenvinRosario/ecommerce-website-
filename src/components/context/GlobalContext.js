import React , {createContext , useState , useContext, useEffect} from 'react';
import axios from 'axios';
import { usefetchAllProducts } from '../../services/api/productApi';
import { PRODUCTS_API_URL } from '../../services/constants/apiUrls';

export const ProductContext = createContext();

export  const  ProductProvider = ({children}) => {
    const [productCollection, setProductCollection] = useState();
    
    const [cartCollection , setCartCollection] = useState([]);

    const [ originalProductCollection, setOriginalProductCollection] = useState();
    useEffect(()=> {
        const fetchProducts = async () => {
            const response = await axios.get(PRODUCTS_API_URL);
            setProductCollection(response?.data);
            setOriginalProductCollection(response?.data)
        };
        fetchProducts();
    },[])

    return (
        <ProductContext.Provider value={{productCollection, setProductCollection ,cartCollection , setCartCollection , originalProductCollection}}>
            {children}
        </ProductContext.Provider>
    )   
}

export const useProduct = () => useContext(ProductContext);