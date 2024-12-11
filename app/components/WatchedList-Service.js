import { auth, db } from "../authentication/firebase";
import { doc, deleteDoc, setDoc, collection, getDocs } from "firebase/firestore";

// Save watched anime
export const saveWatchedAnime = async (userId, anime) => {
    // Log values to check
    console.log("userId:", userId);
    console.log("anime:", anime);
  
    if (!userId || !anime?.id) {
      console.error("Invalid user ID or anime object");
      return;
    }
  
    const watchedRef = doc(db, `users/${userId}/watched_Anime`, `${anime.id}`);
  
    try {
      await setDoc(watchedRef, {
        animeId: anime.id,
        animeTitle: anime.title.english || anime.title.romaji,
        animeImage: anime.coverImage.large,
        createdAt: new Date(),
      });
      console.log("Watched Anime saved successfully.");
    } catch (error) {
      console.error("Failed to save watched anime:", error);
      throw error;
    }
  };

// Remove watched anime
export const removeWatchedAnime = async (userId, animeId) => {

  const watchedRef = doc(db, `users/${userId}/watched_Anime`, `${animeId}`);

  try {
    await deleteDoc(watchedRef);
    console.log(`Watched anime with ID removed successfully.`);
  } catch (error) {
    console.error("Failed to remove watched anime:", error);
  }
};

// Fetch watched anime
export const fetchWatched = async (userId) => {
  // Ensure the user is authenticated
  const user = auth.currentUser;
  if (!user || user.uid !== userId) {
    console.error("User not authenticated or user ID mismatch");
    return [];
  }

  // Reference to the 'favorites' sub-collection of the current user
  const watchedRef = collection(db, "users", userId, "watched_Anime");

  try {
    // Fetch all the documents in the 'favorites' sub-collection
    const querySnapshot = await getDocs(watchedRef);
    const watched = querySnapshot.docs.map((doc) => doc.data());
    console.log("Fetched documents:", watched); // Check the fetched data in the console
    return watched;
  } catch (error) {
    console.error("Failed to fetch watched:", error);
    throw error;
  }
};
