/**
 * Utilities for Firebase data conversion
 */

/**
 * Converts Firebase document data to JavaScript objects with proper date conversion
 */
export function convertFirebaseDoc(doc: any): any {
  const data = doc.data();
  const convertedData: any = { id: doc.id };
  
  // Convert all fields
  for (const [key, value] of Object.entries(data)) {
    // Convert Firebase Timestamps to JavaScript Dates
    if (value && typeof value === 'object' && value.toDate) {
      convertedData[key] = value.toDate();
    } else {
      convertedData[key] = value;
    }
  }
  
  return convertedData;
}

/**
 * Converts an array of Firebase documents to JavaScript objects
 */
export function convertFirebaseDocs(querySnapshot: any): any[] {
  const results: any[] = [];
  querySnapshot.forEach((doc: any) => {
    results.push(convertFirebaseDoc(doc));
  });
  return results;
}