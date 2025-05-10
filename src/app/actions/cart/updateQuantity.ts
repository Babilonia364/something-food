'use server';

export interface ProductQuantityState {
  items: {
    id: string;
    quantity: number;
  }[];
}

export async function updateQuantity(
  prevState: ProductQuantityState,
  formData: FormData
): Promise<ProductQuantityState> {
  const productId = formData.get('productId') as string;
  const action = formData.get('action') as 'increment' | 'decrement';

  return {
    items: prevState.items.map(item => {
      if (item.id === productId) {
        const newQuantity = action === 'increment' 
          ? item.quantity + 1 
          : Math.max(0, item.quantity - 1);
        return { ...item, quantity: newQuantity };
      }
      return item;
    })
  };
}