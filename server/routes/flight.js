var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
// telling my router that I have this model
let Flight = require('../model/flight.js');
const flight = require('../model/flight.js');
let flightController = require('../controllers/flight.js')
/* Get route for the flight list - Read Operation */
/*
GET,
Post,
Put --> Edit/Update
*/
/* Read Operation --> Get route for displaying the flights list */
router.get('/',async(req,res,next)=>{
try{
    const FlightList = await Flight.find();
    res.render('Flight/list',{
        title:'Flights',
        FlightList:FlightList
    })}
    catch(err){
        console.error(err);
        res.render('Flight/list',{
            error:'Error on the server'
        })
    }
    });
/* Create Operation --> Get route for displaying me the Add Page */
router.get('/add',async(req,res,next)=>{
    try{
        res.render('Flight/add',{
            title: 'Add Flight'
        })
    }
    catch(err)
    {
        console.error(err);
        res.render('Flight/list',{
            error:'Error on the server'
        })
    }
});
/* Create Operation --> Post route for processing the Add Page */
router.post('/add',async(req,res,next)=>{
    try{
        let newFlight = Flight({
            "Date":req.body. Date,
            "Aircraft_Type":req.body. Aircraft_Type,
            "Aircraft_Registration":req.body.Aircraft_Registration,
            "Pilot_In_Command":req.body.Pilot_In_Command,
            "Departure_Location":req.body.Departure_Location,
            "Arrival_Location":req.body.Arrival_Location,
            "Hours_Flown":req.body.Hours_Flown
        });
        Flight.create(newFlight).then(()=>{
            res.redirect('/flightslist');
        })
    }
    catch(err)
    {
        console.error(err);
        res.render('Flight/list',{
            error:'Error on the server'
        })
    }
});
/* Update Operation --> Get route for displaying me the Edit Page */
router.get('/edit/:id',async(req,res,next)=>{
    try{
        const id = req.params.id;
        const flightToEdit= await Flight.findById(id);
        res.render('Flight/edit',
            {
                title:'Edit Flight',
                Flight:flightToEdit
            }
        )
    }
    catch(err)
    {
        console.error(err);
        next(err); // passing the error
    }
});
/* Update Operation --> Post route for processing the Edit Page */ 
router.post('/edit/:id',async(req,res,next)=>{
    try{
        let id=req.params.id;
        let updatedFlight = Flight({
            "_id":id,
            "Date":req.body. Date,
            "Aircraft_Type":req.body. Aircraft_Type,
            "Aircraft_Registration":req.body.Aircraft_Registration,
            "Pilot_In_Command":req.body.Pilot_In_Command,
            "Departure_Location":req.body.Departure_Location,
            "Arrival_Location":req.body.Arrival_Location,
            "Hours_Flown":req.body.Hours_Flown
        });
        Flight.findByIdAndUpdate(id,updatedFlight).then(()=>{
            res.redirect('/flightslist')
        })
    }
    catch(err){
        console.error(err);
        res.render('Flight/list',{
            error:'Error on the server'
        })
    }
});
/* Delete Operation --> Get route to perform Delete Operation */
router.get('/delete/:id',async(req,res,next)=>{
    try{
        let id=req.params.id;
        Flight.deleteOne({_id:id}).then(()=>{
            res.redirect('/flightslist')
        })
    }
    catch(error){
        console.error(err);
        res.render('Flight/list',{
            error:'Error on the server'
        })
    }
});
module.exports = router;