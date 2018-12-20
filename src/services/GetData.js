export function GetData(type){
    const baseUrl = "http://localhost:3000/";

    return new Promise((resolve, reject) => {
        fetch(baseUrl+type, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Account': localStorage.getItem('account'),
            }
        })
        .then((response) => response.json())
        .then((data) => {
            resolve(data[type]);
        })
        .catch((error) => {
            reject(error);
        });
    });
}
