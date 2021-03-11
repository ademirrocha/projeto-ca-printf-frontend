const express = require('express')
const router = express.Router()
const EventServices = require('../../services/event/eventServices')
const ContentTextServices = require('../../services/contentText/contentTextServices')
router.get('/', async function(req,res){
	const serviceEvent = new EventServices
	const serviceContentText = new ContentTextServices
	var events = await serviceEvent.all(req, res)
	req.params.contents = 'events_title'
	
	var contentTexts = await serviceContentText.all(req, res)
	res.render('users/events/events', {events: events, contentTexts: contentTexts.contexts});
})


router.get('/:id', async function(req,res){
	const serviceEvent = new EventServices
	
	var event = await serviceEvent.get(req, res)
	

	res.render('users/events/eventView', {event: event.data});
})


module.exports = router;