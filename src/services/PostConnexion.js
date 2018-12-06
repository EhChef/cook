export function PostConnexion(type, userData){
    const baseUrl = "http://localhost:3000/"; // /account | /orders

    return new Promise((resolve, reject) => {
        fetch(baseUrl+type, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then((response) => response.json())
        .then((responseJson) => {
            resolve(responseJson);
        })
        .catch((error) => {
            reject(error);
        });
    });
}
