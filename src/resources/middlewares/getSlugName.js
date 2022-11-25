const fs = require('fs');
module.exports = (req, res, next) => {
    const { name } = req.body;
    // let dir = `./src/public/uploads/${name}`;
    // if (!fs.existsSync(dir)) {
    //     fs.mkdirSync(dir, { recursive: true });
    // }
    // req.session.name = name
    res.json({ name: name })
    // next()
}