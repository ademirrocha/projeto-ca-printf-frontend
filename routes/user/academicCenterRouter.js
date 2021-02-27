const express = require('express')
const router = express.Router()
const MemberServices = require('../../services/academic_center/members/memberServices')



router.get('/membros', async function(req,res){

    const service = new MemberServices
	var membersRes = await service.all(req, res)
	
	if(membersRes.status && membersRes.status === 200){
		res.render('users/course/memberca', {members: membersRes.members});
	}else{
        res.render('users/course/memberca', {members: []})
    }
});




module.exports = router;

