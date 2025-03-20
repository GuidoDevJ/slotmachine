 "use client"
import EditProduct from "@/components/Form/editProduct";
import ProtectedRoute from "@/components/ProtectedRoute/protectedRoute";
import { useSelectedCategory } from "@/stores/categories";
import { useProductCategory } from "@/stores/product";

const ProductEdit =()=>{
    const selectedCategory = useSelectedCategory((state)=>state.getSelectedCategory)
    const {name:categoryName} = selectedCategory()
    const getProduct= useProductCategory((state)=>state.getProductCategory)
    const {description,imageUrl,name,probability}= getProduct()
    return(
        <ProtectedRoute>
        <div className="w-[100vw] h-auto flex flex-col justify-around items-center">
            <h1 className="text-center font-bold mt-6 mb-6">{categoryName}</h1>
            <div className="w-[90%] sm:w-[50%] h-[90%] flex justify-center items-center border-2 rounded-lg mb-10">
                <EditProduct description={description} imageUrl={imageUrl} name={name} probability={probability}/>  
            </div>
        </div>
        </ProtectedRoute>
    )
}
export default ProductEdit;