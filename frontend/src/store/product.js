import { create } from 'zustand';


export const useProductStore = create((set) => ({
      products: [],
      setProducts: (products) => set({ products }),
      createProduct: async (newProduct) => {
            if (!newProduct.name || !newProduct.image || !newProduct.price) {
                  return { success: false, message: "Please fill all the fields" }
            }
            const response = await fetch(
             "http://localhost:5001/api/products",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(newProduct),
              }
            );
             if (!response.ok) {
                    const errorText = await response.text(); // Get the response text for better debugging
                    console.error("Error response:", errorText);
               return {
                 success: false,
                 message: "Failed to add product",
               };
             }
            const data = await response.json()
            set((state) => ({ products: [...state.products, data.data] }))
            return { success: true, message: "Product created successfully" }
                  
      },
      fetchProducts: async () => {
            const response = await fetch("http://localhost:5001/api/products");
            if (!response.ok) {
                  const errorText = await response.text()
                  console.error("Error response:", errorText)
                  return {
                        success: false,
                        message: "Failed to fetch products"
                  }
            }
            const data = await response.json()
            set({ products: data.data })
            return { success: true, message: "Products fetched successfully" }
      },
      deleteProduct: async (productId) => {
            const response = await fetch(
                  `http://localhost:5001/api/products/${productId}`,
                  {
                        method: "DELETE",
                  }
            );
            if (!response.ok) {
                  const errorText = await response.text();
                  console.error("Error response:", errorText);
                  return {
                        success: false,
                        message: "Failed to delete product",
                  };
            }
           set((state) => ({
                 products: state.products.filter((product) => product._id !== productId),
             }));
            return { success: true, message: "Product deleted successfully" };
      },
      updateProduct: async (productId, updatedProduct) => {
            const response = await fetch(
                  `http://localhost:5001/api/products/${productId}`,
                  {
                        method: "PUT",
                        headers: {
                              "Content-Type": "application/json",
                        },
                        body: JSON.stringify(updatedProduct),
                  }
            );
            if (!response.ok) {
                  const errorText = await response.text();
                  console.error("Error response:", errorText);
                  return {
                        success: false,
                        message: "Failed to update product",
                  };
            }
            const data = await response.json();
            // Update the product in the store without needing to refresh the page
            set((state) => ({
                  products: state.products.map((product) =>
                        product._id === productId ? data.data : product
                  ),
            }));
            return { success: true, message: "Product updated successfully" };
      }
}));