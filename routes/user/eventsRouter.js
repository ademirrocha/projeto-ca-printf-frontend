const express = require('express')
const router = express.Router()
const EventServices = require('../../services/event/eventServices')

router.get('/', async function(req,res){
	const serviceEvent = new EventServices
	
	var events = await serviceEvent.all(req, res)
	res.render('users/events/events', {events: events});
})


router.get('/:id', async function(req,res){
	const serviceEvent = new EventServices
	
	var event = await serviceEvent.get(req, res)
	res.render('users/events/eventView', {event: event.data});
})


module.exports = router;