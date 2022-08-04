const {default: axios} = require('axios');
const {Dog, Temperament} = require('../db');
const API_KEY = process.env;

const callApi = async () => {
    const apiCall = await axios.get(` https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
    const apiData = apiCall.data.map(p=>{
        return{
            id: p.id,
            name: p.name,
            weight: p.weight.metric.split("-"),
            height: p.height.metric.split("_"),
            temperament:p.temperament,
            image: p.image.url,
        }
    })
    
    return apiData
};


const CallDB = async () => {
    const infoDB = await Dog.findAll({
        include:{
            model: Temperament,
            attributes: ['name'],
            through:{
                attributes: []
            }
        } 
    });
    return infoDB;
};

const totalCalls = async ()=>{
    const api = callApi()
    const db = CallDB()
    const calls = api.concat(db)
    return calls
}

module.exports={
    callApi,
    CallDB,
    totalCalls,
}