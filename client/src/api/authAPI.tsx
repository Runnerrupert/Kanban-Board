import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
// Try/Catch block to gather whether the user can be logged in (if the username and password are correct)
  try {
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userInfo)
    });

    // Throws an error if something goes wrong
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error: ${errorData.message}`);
    }

    // Variable to hold the gathered JSON information from the fetch request
    const data = await response.json();
    return data;
    
  } catch (err) {
    console.log('Error from user login: ', err);
    return Promise.reject('Could not fetch user info');
  }
}

export { login };