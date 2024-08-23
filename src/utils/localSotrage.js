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
  