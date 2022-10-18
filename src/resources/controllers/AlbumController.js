const AlbumService = require("../services/Album");
const fs = require('fs');

const AlbumController = {
    // GET /album/list
    getList: (req,res,next) => {
        AlbumService.list({},{})
            .then(albums => {
                let listAlbum = []
                albums.forEach(item => {
                    listAlbum.push({url: item.url});
                })
                res.json({listAlbum})
            })
            .catch(err => {
                res.json({listAlbum: {}})
            })
    },
    getAll: (req,res,next) => {
        const error = req.flash('error') || "";
        const success = req.flash('success') || "";
        AlbumService.list({},{})
        .then(albums => {
            let listAlbum = [];
            let index = 0;
            if (albums.length == 0) 
                return res.render('Pages/Album/albumList', {layout:"admin", empty: true});
            albums.forEach(item => {
                index++;
                listAlbum.push({id: item._id,url: item.url, name: item.name, createdAt: item.createdAt,index});
            })
            res.render('Pages/Album/albumList', {layout:"admin", success, error, data: listAlbum});
        })
        .catch(err => {
            res.render('Pages/Album/albumList', {layout:"admin", success, error, empty: true});
        })
    },
    // GET /album/add
    getAddAlbum: (req,res,next) => {
        const error = req.flash('error') || "";
        const success = req.flash('success') || "";
        res.render('Pages/Album/addAlbum', {layout: 'admin', success, error});
    },
    // POST /album/add
    postAddAlbum: async (req,res,next) => {
        const file = req.file;
        if (file) {
            const url = `/uploads/album/${file.filename}`;
            const album = {
                name: req.body.name,
                url
            }
            await AlbumService.create(album)
                .then(() => {
                    req.flash('success', 'Thêm ảnh vào album thành công');
                    return res.redirect('/album/add');
                })
                .catch(err => {
                    req.flash('error', 'Thêm ảnh vào album thất bại ' + err);
                    return res.redirect('/album/add');
                })
        } else {
            req.flash('error', 'Vui lòng chọn ảnh');
            return res.redirect('/album/add');
        }
    },
    // GET /album/delete/:id
    deleteAlbum: async (req,res,next) => {
        await AlbumService.delete(req.params.id)
            .then(album => {
                fs.mkdirSync('')
                req.flash('success', 'Xóa ảnh trong album thành công');
                return res.redirect('/album/all');
            })
            .catch(err => {
                req.flash('error', 'Xóa ảnh trong album thất bại ' + err);
                return res.redirect('/album/all');
            })
    }
};

module.exports = AlbumController;