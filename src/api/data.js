const handler = async (params = {}, { rejectWithValue }) => {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL, {
      method: 'POST',           
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    console.log('result: ', result)
    return result;
    

  } catch (error) {
    console.error('products.query@handler', 'Error during products query:', error);
    return rejectWithValue({
      message: error.message || 'Failed to fetch products',
      originalError: error,
    });
  }
};

// Reducer helpers
const pending = (state) => {
  state.loading = true;
  state.error = null;
};

const fulfilled = (state, action) => {
  state.loading = false;
  state.data = action.payload.items;
  state.error = null;
};

const rejected = (state, action) => {
  state.loading = false;
  state.error = action.payload?.message || action.error?.message;
};

export default {
  handler,
  pending,
  fulfilled,
  rejected
};
