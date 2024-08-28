export const loadCategories = () => {
    try {
      const serializedData = localStorage.getItem('categories');
      return serializedData ? JSON.parse(serializedData) : [];
    } catch (err) {
      console.error('Failed to load from localStorage', err);
      return [];
    }
  };
  
  export const saveCategories = (categories) => {
    try {
      const serializedData = JSON.stringify(categories);
      localStorage.setItem('categories', serializedData);
    } catch (err) {
      console.error('Failed to save to localStorage', err);
    }
  };

  export const loadTaxes = ()=>{
    try{
      const serializedState = localStorage.getItem('taxes');
      if(serializedState === null) {
        return[]
      }
      return JSON.parse(serializedState)
    }catch (err) {
      console.log("error in loadtaxes")
      return [];
    }
  };

  export const saveTaxes = (taxes) => {
    try {
      const serializedState = JSON.stringify(taxes)
      localStorage.setItem('taxes', serializedState)
    } catch (err) {
      console.log('error in the savetaxes');
      
    }
  }
  
  export const loadProducts = ()=>{
    try{
      const serializedState = localStorage.getItem('products');
      if(serializedState === null) {
        return[]
      }
      return JSON.parse(serializedState)
    }catch (err) {
      console.log("error in loadproducts")
      return [];
    }
  };

  export const saveProducts = (products) => {
    try {
      const serializedState = JSON.stringify(products)
      localStorage.setItem('products', serializedState)
    } catch (err) {
      console.log('error in the saveproducts');
      
    }
  }

  export const loadSales = ()=> {
    try{
      const serializedState = localStorage.getItem('sales')
      if(serializedState===null) {
        return []
      }
      return JSON.parse(serializedState)
    }catch (err) {
      console.log("error in loadingSales");
      return [];
    }
  };
  export const saveSales = (sales) => {
    try {
      const serializedState = JSON.stringify(sales)
      localStorage.setItem('sales', serializedState)
    } catch (err) {
      console.log('error in the saveSales');

    }
  }
  