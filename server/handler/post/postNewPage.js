
const GrpQueModel = require("../../models/grpQueModel") 

const postNewPage = (req, res) => {
    const day_id = req.query.id
    GrpQueModel.findOne({day_id : day_id}, (err, ques) => {
        if (err) {
            console.error(err);
            res.send(err)
        } else if (ques) {
            const {data} = req.body
            ques.data = data;
            ques.markModified("data")
            ques.save()
            res.json(ques)
        }
    })

}


module.exports = postNewPage;
