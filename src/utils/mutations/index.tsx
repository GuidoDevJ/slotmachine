// utils/mutations.ts
import instance from "@/utils/axios";
import { jwtDecode } from "jwt-decode";

interface TokenPayload {
  exp: number;
}
interface Product {
  name?: string;
  description?: string;
  imageURL?: string;
  probability?: number;
}

export const Login = async (userData: { email: string; password: string }) => {
  try {
    const response = await instance.post("/api/auth/login", userData);
    const { token } = response.data;

    const decoded: TokenPayload = jwtDecode(token);
    const expirationTime = decoded.exp * 1000;

    localStorage.setItem("token", token);
    localStorage.setItem("tokenExpiration", expirationTime.toString());

    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.error || "Error en el inicio de sesión."
    );
  }
};

export const AddProduct = async (productData: any) => {
  try {
    const response = await instance.post("/api/products", productData);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.error || "Error al agregar el producto"
    );
  }
};

export const AddCategory = async (productData: any) => {
  try {
    const response = await instance.post("/api/categories", productData);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.error || "Error al agregar la categoria"
    );
  }
};

export const AddConfig = async (configGame: any) => {
  try {
    const response = await instance.post("/api/game", configGame);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.error || "Error al agregar la config"
    );
  }
};

export const PatchProduct = async (product: Product, id: string) => {
  try {
    const response = await instance.patch(`/api/products/${id}`, product);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.error || "Error al actualizar el producto"
    );
  }
};

export const PatchCategorySelected = async (products: string[], id: string) => {
  try {
    const response = await instance.patch(`/api/game/${id}`, products);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.error || "Error al actualizar la categoria"
    );
  }
};

export const setIntervalWinner = async (interval: number) => {
  try {
    const response = await instance.post(`/api/game/winnerInterval`, { interval });
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.error || "Error al setear los intervalos de ganadores"
    );
  }
};

export const registerUser = async (newUser: { email: string; password: string }) => {
  try {
    const response = await instance.post(`/api/auth/register`, newUser);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.error || "Error al registrar el usuario"
    );
  }
};

export const createRedemptionCode = async (data: {
  productName: string;
  productImageURL: string;
  productId?: string;
}): Promise<{ code: string; id: string }> => {
  try {
    const response = await instance.post("/api/redemption", data);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.error || "Error al crear el codigo de canje"
    );
  }
};

export const redeemCode = async (code: string) => {
  try {
    const response = await instance.patch(`/api/redemption/${code}`);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.error || "Error al canjear el codigo"
    );
  }
};
