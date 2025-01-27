import axios from "axios";
import { useProduct } from "../../components/context/GlobalContext";
import { PRODUCTS_API_URL } from "../constants/apiUrls";

const useDiscount = () => {
    const { setProductCollection} = useProduct();

    const applyDiscount = async () => {
        try {
            const response = await axios.put(`${PRODUCTS_API_URL}/apply-discount`);
            setProductCollection(response.data)
        }catch(error) {
            console.log("Error Occured while making api call ", error)
        }
    };
    return applyDiscount;
}

const useSortLowToHigh = () => {
    const { setProductCollection} = useProduct();

    const sortLowToHigh = async () => {
        try {
            const res = await axios.get(`${PRODUCTS_API_URL}/sortLowToHigh`);
            setProductCollection(res?.data);
            console.log(" ans  ", res.data)
        }catch (err) {
            console.log(" error", err)
        };
        
    };
    return sortLowToHigh;
    
}

const useSortHighToLow = () => {
    const { setProductCollection} = useProduct();

    const sortHighToLow = async () => {
        try {
            const res = await axios.get(`${PRODUCTS_API_URL}/sortHighTolow`);
            setProductCollection(res?.data);
        
        }catch (err) {
            console.log(" error", err)
        };
        
    };
    return sortHighToLow;
};

const useSortAlpahbeticOrder = () => {
    const {setProductCollection } = useProduct();

    const sortInAlphabeticOrder = async () => {

        try {
            const res = await axios.get(`${PRODUCTS_API_URL}/sortByAlphabets`);
            setProductCollection(res?.data);

        }catch(error) {
            console.log(' Eror ', error)
        }
    };
    return sortInAlphabeticOrder;
}

const useProductNameSearch = () => {
    const {setProductCollection } = useProduct(); 

    const searchProductByName = async () => {
        const res = await axios.get(`${PRODUCTS_API_URL}/searchProductByName`, );
        setProductCollection(res?.data);

    }
    return searchProductByName ;
}

export  {useDiscount , useSortLowToHigh , useSortHighToLow , useSortAlpahbeticOrder , useProductNameSearch} ;