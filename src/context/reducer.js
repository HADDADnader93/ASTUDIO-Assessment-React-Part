export const initialState = {
    users: [],
    products: [],
    pageSize: 5,
    searchQuery: '',
  };
  
  const reducer = (state, action) => {
    switch (action.type) {
      case 'SET_USERS':
        return { ...state, users: action.users };
      case 'SET_PRODUCTS':
        return { ...state, products: action.products };
      case 'SET_PAGE_SIZE':
        return { ...state, pageSize: action.pageSize };
      case 'SET_SEARCH_QUERY':
        return { ...state, searchQuery: action.searchQuery };
      default:
        return state;
    }
  };
  
  export default reducer;
  