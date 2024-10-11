// utils/mutations.ts
import instance from "@/utils/axios";
import { jwtDecode } from "jwt-decode";

interface TokenPayload {
  exp: number; // Expiración en segundos desde el epoch
  // Otros campos según tu JWT
}
interface Product {
  name?: string;
  description?: string;
  imageURL?: string;
  probability?:number
}
export const Login = async (userData: { email: string; password: string }) => {
  try {
    const response = await instance.post("/api/auth/login", userData);
    console.log("Respuesta del servidor:", response.data);
    const { token } = response.data;

    // Decodifica el token para obtener la expiración
    const decoded: TokenPayload = jwtDecode(token);
    const expirationTime = decoded.exp * 1000; // Convertir a milisegundos

    // Guarda el token y su expiración en localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("tokenExpiration", expirationTime.toString());

    return response.data;
  } catch (error: any) {
    if (error) {
      console.error("Error en Login:", error.response?.data || error.message);
      throw new Error(
        error.response?.data?.message || "Error en el inicio de sesión."
      );
    } else {
      throw new Error("Error inesperado.");
    }
  }
};
export const AddProduct = async (productData:any) => {
  try {
    const response = await instance.post("/api/products", productData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log("Respuesta del servidor:", response.data);


    return response.data;
  } catch (error: any) {
    if (error) {
      console.error("Error al agregar el producto", error.response?.data || error.message);
      throw new Error(
        error.response?.data?.message || "Error al agregar el producto"
      );
    } else {
      throw new Error("Error inesperado.");
    }
  }
};
export const AddCategory = async (productData:any) => {
  try {
    const response = await instance.post("/api/categories", productData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log("Respuesta del servidor:", response.data);


    return response.data;
  } catch (error: any) {
    if (error) {
      console.error("Error al agregar la categoria", error.response?.data || error.message);
      throw new Error(
        error.response?.data?.message || "Error al agregar la categoria"
      );
    } else {
      throw new Error("Error inesperado.");
    }
  }
};
export const PatchProduct = async(product:Product,id:string)=>{
  console.log(product, id)  
  try {
    const response = await instance.patch(`/api/products/${id}`, product,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log("Respuesta del servidor:", response.data);
    return response.data;
  } catch (error: any) {
    if (error) {
      console.error("Error al agregar el producto", error.response?.data || error.message);
      throw new Error(
        error.response?.data?.message || "Error al agregar el producto"
      );
    } else {
      throw new Error("Error inesperado.");
    }
  }
}






