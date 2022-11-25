const MenuService = require('../services/Menu');
const getMenuList = (req, res, next) => {
    MenuService.list({}, {})
        .then(menu => {
            let menuList = []
            if (menu.length > 0) {
                menu.forEach(item => {
                    menuList.push(item);
                })
            }
            req.menuList = menuList;
            next();
        })
        .catch(err => {
            next();
        })
};
module.exports = getMenuList;