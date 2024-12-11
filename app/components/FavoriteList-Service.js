import { db } from "../authentication/firebase";
import { doc, deleteDoc, setDoc, collection, query, where, getDocs } from "firebase/firestore";
import { auth } from "../authentication/firebase";
export const saveFavorite = async (userId, anime) => {
    const favoriteRef = doc(db, `users/${userId}/favorites`, `${anime.id}`);
  
    try {
      await setDoc(favoriteRef, {
        animeId: anime.id,
        animeTitle: anime.title.english || anime.title.romaji,
        animeImage: anime.coverImage.large,
        createdAt: new Date(),
      });
      console.log("Favorite saved successfully.");
    } catch (error) {
      console.error("Failed to save favorite:", error);
    }
  };

export const removeFavorite = async (userId, animeId) => {
    const favoriteRef = doc(db, `users/${userId}/favorites`, `${animeId}`);
  
    try {
      await deleteDoc(favoriteRef);
      console.log(`Favorite removed successfully.`);
    } catch (error) {
      console.error("Failed to remove favorite:", error);
    }
  };
  


  export const fetchFavorites = async (userId) => {
    // Ensure the user is authenticated
    const user = auth.currentUser;
    if (!user || user.uid !== userId) {
      console.error("User not authenticated or user ID mismatch");
      return [];
    }
  
    // Reference to the 'favorites' sub-collection of the current user
    const favoritesRef = collection(db, "users", userId, "favorites");
  
    try {
      // Fetch all the documents in the 'favorites' sub-collection
      const querySnapshot = await getDocs(favoritesRef);
      const favorites = querySnapshot.docs.map((doc) => doc.data());
      console.log("Fetched documents:", favorites); // Check the fetched data in the console
      return favorites;
    } catch (error) {
      console.error("Failed to fetch favorites:", error);
      throw error;
    }
  };
