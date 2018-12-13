export function AddData(type, userData){
    const baseUrl = "http://localhost:3000/";

    return new Promise((resolve, reject) => {
        fetch(baseUrl+type, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Account': localStorage.getItem('account'),
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
