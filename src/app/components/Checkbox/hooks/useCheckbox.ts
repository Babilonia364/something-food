export function useCheckbox() {
  const addProductToCategory = (
    auxSelected: {
      id: string;
      category: string;
      products: { id: string; name: string; quantity: number }[];
    }[],
    categoryId: string,
    categoryName: string,
    itemId: string,
    itemName: string
  ) => {
    const existingCategory = auxSelected.find(cat => cat.id === categoryId);

    if (existingCategory) {
      const existingProduct = existingCategory.products.find(prod => prod.id === itemId);

      if (!existingProduct) {
        existingCategory.products.push({
          id: itemId,
          name: itemName,
          quantity: 1
        });
      }
    } else {
      auxSelected.push({
        id: categoryId,
        category: categoryName,
        products: [
          {
            id: itemId,
            name: itemName,
            quantity: 1
          }
        ]
      });
    }
  }

  return {
    addProductToCategory,
  }

}