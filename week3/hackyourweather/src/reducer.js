export const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_DATA':
      return {
        ...state,
        searchedCities: [...state.searchedCities, action.payload.data],
        isLoading: action.payload.isLoading,
        search: action.payload.search,
        hasMessage: action.payload.hasMessage,
        message: action.payload.message,
      };
    case 'LOADING':
      return {
        ...state,
        isLoading: action.payload.isLoading,
        message: action.payload.message,
        hasMessage: action.payload.hasMessage,
      };
    case 'ERROR':
      return {
        ...state,
        hasError: action.payload.hasError,
        message: action.payload.message,
        isLoading: action.payload.isLoading,
        hasMessage: action.payload.hasMessage,
      };

    case 'SEARCH':
      return {
        ...state,
        search: action.payload,
      };
    case 'CLOSE_MESSAGE':
      return {
        ...state,
        hasMessage: action.payload.hasMessage,
      };
    case 'NO_VALUE':
      return {
        ...state,
        searchedCities: action.payload.searchedCities,
        search: action.payload.search,
        isLoading: action.payload.isLoading,
        message: action.payload.message,
        hasMessage: action.payload.hasMessage,
      };
    case 'EXIST_CITY':
      return {
        ...state,
        searchedCities: action.payload.searchedCities,
        message: action.payload.message,
        isLoading: action.payload.isLoading,
        hasMessage: action.payload.hasMessage,
      };
    case 'DELETE':
      return {
        ...state,
        searchedCities: action.payload.searchedCities,
        search: action.payload.search,
        message: action.payload.message,
        hasMessage: action.payload.hasMessage,
      };

    default:
      return { ...state };
  }
};
