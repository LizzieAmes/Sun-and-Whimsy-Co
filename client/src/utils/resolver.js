import { useQuery } from "@apollo/client";
import { QUERY_ME, GET_PRODUCTS } from "./queries";

const fetchProductsForUserProfile = () => {
  // Use the useQuery hook to execute the QUERY_ME query to fetch the user's profile
  const {
    loading: profileLoading,
    error: profileError,
    data: profileData,
  } = useQuery(QUERY_ME);

  // Use the useQuery hook to execute the GET_PRODUCTS query to fetch products
  const {
    loading: productsLoading,
    error: productsError,
    data: productsData,
  } = useQuery(GET_PRODUCTS);

  if (profileLoading || productsLoading) {
    return { loading: true, error: null, products: [] };
  }

  if (profileError || productsError) {
    return {
      loading: false,
      error: profileError || productsError,
      products: [],
    };
  }

  // Extract the user's profile from the profile data
  const userProfile = profileData?.me;

  // Filter products based on the user's profile, e.g., by categories, preferences, etc.
  const filteredProducts = productsData?.products.filter((product) => {
    // Example logic: Filter products based on user's preferences, categories, etc.
    // Replace this logic with your own logic based on your application's requirements
    return userProfile.categories.includes(product.category);
  });

  return { loading: false, error: null, products: filteredProducts || [] };
};

export default fetchProductsForUserProfile;
