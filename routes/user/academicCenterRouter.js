const express = require('express')
const router = express.Router()
const MemberServices = require('../../services/academic_center/members/memberServices')
const ContentTextServices = require('../../services/contentText/contentTextServices')


router.get('/membros', async function(req,res){

    const service = new MemberServices
	var membersRes = await service.all(req, res)
	req.params.contents = 'ca_members_title'
	
	const serviceContentText = new ContentTextServices
	var contentTexts = await serviceContentText.all(req, res)
	
	if(membersRes.status && membersRes.status === 200){
		res.render('users/course/memberca', {members: membersRes.members, contentTexts: contentTexts.contexts});
	}else{
        res.render('users/course/memberca', {members: [], contentTexts: contentTexts.contexts})
    }
});




module.exports = router;

