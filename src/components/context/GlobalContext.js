import React , {createContext , useState , useContext} from 'react';
import ITEMS from '../../constants/Items';

const ProductContext = createContext();

export  const  ProductProvider = ({children}) => {
    const [productCollection, setProductCollection] = useState(ITEMS);
    const [cartCollection , setCartCollection] = useState([]);

    return (
        <ProductContext.Provider value={{productCollection, setProductCollection ,cartCollection , setCartCollection }}>
            {children}
        </ProductContext.Provider>
    )   
}

export const useProduct = () => useContext(ProductContext);