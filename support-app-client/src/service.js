const axios = require('axios')
const headers = {
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
};

const methods = {
    createUser: (user) =>{
        return axios.post('http://localhost:3001/createUser', user)
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
    getProfInfo: (profid) => {
        return fetch('http://localhost:3001/profile/'+ profid , {headers: headers.headers,method: "GET"})
    },
    getFiles: (userid) => {
        return fetch('http://localhost:3001/files/' + userid, {headers: headers.headers,method: "GET"})
    },
    getSpec: (prof_id_fk) => {
        return fetch('http://localhost:3001/spec/' + prof_id_fk, {headers: headers.headers,method: "GET"})
    },
}

export default methods;