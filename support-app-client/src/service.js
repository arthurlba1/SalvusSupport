
 const headers = {
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
};

const methods = {
    createUser: (user) =>{
        return fetch('http://localhost:3001/createUser', {headers: headers.headers, body: JSON.stringify(user), method: "POST"})
    },
    loginUser: (login) =>{
        return fetch('http://localhost:3001/loginUser', {headers: headers.headers, body: JSON.stringify(login), method: "POST"})
    },
    getProfSpec: () => {
        return fetch('http://localhost:3001/getProfSpec', {headers: headers.headers,method: "GET"})
    },
    getProf: () => {
        return fetch('http://localhost:3001/getProf', {headers: headers.headers,method: "GET"})
    },
}

export default methods;