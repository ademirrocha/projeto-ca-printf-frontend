const express = require('express')
const router = express.Router()
const EventServices = require('../../services/event/eventServices')

router.get('/', async function(req,res){
	const serviceEvent = new EventServices
	
	var events = await serviceEvent.all(req, res)
	res.render('users/events/events', {events: events});
})




module.exports = router;