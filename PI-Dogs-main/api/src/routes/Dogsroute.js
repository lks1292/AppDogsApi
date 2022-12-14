// const { Router } = require("express");
// const { Dog, Temperament } = require("../db");
// const utils = require('../controller/index');
// const router = Router();

// router.get("/", async (req, res, next) => {
//   try {
//     const { name } = req.query;

//     let dataApi = await utils.getDataApi();
//     let dataDb = await Dog.findAll({
//       include: Temperament,
//     });
//     // FORMATEO PARA Q DESDE API Y DESDE DB LLEGUEN AL FRONT IGUALES
//     dataDb = dataDb.map((el) => {
//       return {
//         id: el.id,
//         name: el.name,
//         height_min: el.height_min,
//         height_max: el.height_max,
//         weight_min: el.weight_min,
//         weight_max: el.weight_max,
//         life_span: el.life_span,
//         image: el.image,
//         userCreate: true,
//         temperaments: el.Temperaments.map((i) => {
//           return i.name;
//         }).join(", "),
//       };
//     });
//     // resp de API y de DB juntas
//     let allData = dataDb.concat(dataApi);

//     if (name) {
//       let resp = allData.filter((el) =>
//         el.name.toLowerCase().includes(name.toLowerCase())
//       ); // ==> trae todos los q tengan la palabra buscada
//       // console.log(resp);
//       if (resp.length === 0) {
//         return res.status(404).send(`${name} > Not found`);
//       }
//       return res.json(resp);
//     } else {
//       res.json(allData);
//     }
//   } catch (error) {
//     next(error);
//   }
// });

// router.get("/:id", async (req, res, next) => {
//   const { id } = req.params;

//   try {
//     if (id >= 1000) {
//       let dataDb = await Dog.findByPk(id, {
//         include: Temperament,
//       });
//       console.log(dataDb.name);
//       res.json({
//         id: dataDb.id,
//         name: dataDb.name,
//         height_min: dataDb.height_min,
//         height_max: dataDb.height_max,
//         weight_min: dataDb.weight_min,
//         weight_max: dataDb.weight_max,
//         life_span: dataDb.life_span,
//         image: dataDb.image,
//         userCreate: true,
//         temperaments: dataDb.Temperaments.map((i) => {
//           return i.name;
//         }).join(", "),
//       });
//     } else {
//       let dataApi = await utils.getDataApi();
//       let resp = dataApi.find((el) => el.id.toString() === id.toString());
//       if (resp === undefined) {
//         res.status(404).json("Id dog not found");
//       }
//       res.send(resp);
//     }
//   } catch (error) {
//     next(error);
//   }
// });

// //  POST /________________________________________________________________

// router.post("/", async (req, res, next) => {
//   const {
//     name,
//     height_min,
//     height_max,
//     weight_min,
//     weight_max,
//     life_span,
//     image,
//     temperaments,
//   } = req.body;
//   try {
//     let dogCreated = await Dog.create({
//       name,
//       height_min,
//       height_max,
//       weight_min,
//       weight_max,
//       life_span,
//       image,
//     });

//     if (temperaments.length) {
//       temperaments.map(async (tem) => {
//         try {
//           let temper = await Temperament.findOrCreate({ where: { name: tem } });
//           dogCreated.addTemperament(temper[0]);

//           console.log("Send successfuly!");
//         } catch (err) {
//           console.log(err);
//         }
//       });
//     }
//     res.send("Send successfuly!");
//   } catch (error) {
//     next(error);
//   }
// });

// //DELETE

// router.delete("/:id", async (req, res, next) => {
//   const { id } = req.params;
//   try {
//     Breed.destroy({ where: { id: id } });
//     let dataApi = await utils.getDataApi();
//     let dataDb = await Dog.findAll({
//       include: Temperament,
//     });
//     // FORMATEO PARA Q DESDE API Y DESDE DB LLEGUEN AL FRONT IGUALES
//     dataDb = dataDb.map((el) => {
//       return {
//         id: el.id,
//         name: el.name,
//         height_min: el.height_min,
//         height_max: el.height_max,
//         weight_min: el.weight_min,
//         weight_max: el.weight_max,
//         life_span: el.life_span,
//         image: el.image,
//         userCreate: true,
//         temperaments: el.Temperaments.map((i) => {
//           return i.name;
//         }).join(", "),
//       };
//     });
//     // resp de API y de DB juntas
//     let allData = dataDb.concat(dataApi);
//     console.log("Delete successfully!".bgRed);
//     res.send(allData);
//   } catch (err) {
//     next(err);
//   }
// });

// module.exports = router;






const {Router}= require('express');
const axios = require('axios')
const API_KEY = process.env
const router = Router();
const express = require('express');
const {callApi, CallDB} = require('../controller/index');  //importing the controller
const {Dog, Temperament} = require('../db');

router.get('/dogs', async (req, res) => {
    const name = req.query.name;
    const apiData = await callApi();

    if(name){
        const dogName = await apiData.filter(dog => dog.name.toLowerCase().includes(name.toLowerCase()));

        dogName.length ? res.status(200).send(dogName) : res.status(400).send('Dog not found')
        
    }else{
        res.status(200).send(apiData)
    }

})

router.get('/dogs/:id', async (req, res)=>{
    
    let id = req.params.id
    const dogId = await callApi()

    if(id){
        const dogName = dogId.filter(d => d.id == id)
        dogName.length ? res.status(200).send(dogName) : res.status(400).send('Dog not found')
    }
})

//crear una ruta /temperaments para obtener todos los temperamentos de la API alojarlos en el modelo de DB y requerirlos nuevamente de la base de datos
// router.get('/temperament', async (req, res)=>{
//    const tempDogs= await axios.get(` https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
//    const tempFilt = tempDogs.data.map(t => t.tempFilt)
//    const dataTemp = tempFilt.toString().trim().split(',')
//    const tempera = dataTemp.filter(p=> p.length > 0 )
//    tempera.forEach(element => {
//        Temperament.findOrCreate({
//            where: {name:element}
//        })
//    });
//    const tempTotal = await Temperament.findAll()
//    res.status(200).send(tempTotal)
    
// })

router.get('/temperament', async (req, res) => {
    const temperametApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
    const temperament = temperametApi.data.map(elem => elem.temperament)
    let mapedTemperaments = temperament.toString().trim().split(/\s*,\s*/);
    let splitedTemperaments = mapedTemperaments.filter(temp => temp.length > 0);
    splitedTemperaments.forEach(elem => {
        Temperament.findOrCreate({
            where: {name: elem}
        })
        //console.log(splitedTemperaments)
    });
    const allTemperaments = await Temperament.findAll();
    res.send(allTemperaments);
})

router.get('/Api', async(req, res)=>{
    const apiDogs = await callApi()
    res.send(apiDogs)
})


router.get('/database', async(req, res)=>{
    try {
        const dogsDb = await CallDB()
        res.send(dogsDb)
    } catch (error) {
        res.status(400).send(error)
    }
})

// router.post('/dog', async(req, res)=>{
//     const {name, height_max, height_min, weight_max, weight_min, life_span, image, temperaments, createInDb } = req.body
//     const createDog = await Dog.create({
//         name,
//         height_min,
//         height_max,
//         weight_max,
//         weight_min,
//         life_span,
//         image,
//         createInDb,
//     })
//     const createTemp = await Temperament.findAll({
//         where:{name: temperaments}
//     })
//     createDog.addTemperament(createTemp);
//     res.status(200).send('Create Dog')
// })
   

router.post('/create', async (req, res) => {

    const {name, height_max, height_min, weight_max, weight_min, life_span, image, temperament, createInDb} = req.body
      
    try {
       
        const createDog = await Dog.create({
          name,
          height_min,
          height_max,
          weight_min,
          weight_max,
          image: image ? image : 'https://i.pinimg.com/564x/c7/d8/1f/c7d81f201e1149c9c1879e5839ed28ea.jpg',
          life_span,
          createInDb,
        });
    
        let temperamentDb = await Temperament.findAll ({
          where: {name: temperament}
      })
  
        createDog.addTemperament(temperamentDb);
        res.status(200).send(" Breed Created successfully");
      } catch (error) {
        res.send("Error: Post failed")
      }
    });


   
   


module.exports = router
router.use(express.json())