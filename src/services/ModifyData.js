export function ModifyData(type, id, userData){
    const baseUrl = "http://localhost:3000/";

    return new Promise((resolve, reject) => {
        fetch(baseUrl+type+"/"+id, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Account': localStorage.getItem('account'),
            },
            body: JSON.stringify(userData)
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
