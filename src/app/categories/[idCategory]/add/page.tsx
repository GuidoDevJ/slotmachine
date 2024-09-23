import AddCategoryForm from "@/components/Form/addItemCategory";
import Header from "@/components/Header/Header";

const AddProductCategory =()=>{
    return(
        <>
        <Header/>        
        <div className="w-[100vw] h-auto flex flex-col justify-around items-center">
            <h1 className="text-center font-bold mt-6 mb-6">Cervezas</h1>
            <div className="w-[90%] sm:w-[50%] h-[90%] flex justify-center items-center border-2 rounded-lg">
                <AddCategoryForm/>  
            </div>
        </div>
        </>
    )
}
export default AddProductCategory;