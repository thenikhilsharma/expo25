// Api.js
export const registerUser = async (formData) => {
  const response = await fetch(
    "https://expo-backend-public.onrender.com/register",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }
  );

  // Check if the response is OK, otherwise throw an error
  if (!response.ok) {
    throw new Error("Failed to register");
  }

  const responseData = await response.json();
  return responseData.message; // Expecting 'message' from the backend
};
