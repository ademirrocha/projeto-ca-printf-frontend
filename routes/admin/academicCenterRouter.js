const express = require('express')
const router = express.Router()
const { isAdmin } = require('../../helpers/isAdmin')
const { auth } = require('../../helpers/auth')
const MemberServices = require('../../services/academic_center/members/memberServices')



router.get('/centro-academico/membros/editar', auth, isAdmin, async function(req,res){

    const service = new MemberServices
	var membersRes = await service.all(req, res)
	
	if(membersRes.status && membersRes.status === 200){
		res.render('admin/memberca/formmemberca', {members: membersRes.members});
	}else{
        res.render('admin/memberca/formmemberca', {members: []})
    }

	
});

router.post('/academic-center/members/update', auth, isAdmin, async (req, res) => {
	const service = new MemberServices
	var membersRes = await service.update(req, res)
	
	if(membersRes.status == 401 && membersRes.errors.message == 'Unauthenticated.'){
		req.logout()
		res.redirect('/login')
	}
	
	if(membersRes.status && membersRes.status === 200){
		req.flash('success_msg', 'Alterações realizadas com sucesso')
		return res.redirect('/centro-academico/membros')
	}else{
        req.flash('error', 'Não foi possível savlvar as alterações')
		return res.redirect('/admin/centro-academico/membros/editar')
    }
})



module.exports = router;

