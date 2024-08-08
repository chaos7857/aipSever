const fs = require('fs')
const path = require('path')
exports.addfile = (req, res) => {
    console.log(req.body);
    console.log(req.file);
    if (req.body.filename) {
        fs.rename(req.file.path, path.join(__dirname, `../uploads/${req.body.filename}`),(err)=>{
            if(err) return res.sm(err)
            res.sm(req.body.filename,0)
        })
    }else{
        return res.send({
            status: 0,
            message: 'upload successfully',
            filename: req.file.filename
        })
    }
    
}