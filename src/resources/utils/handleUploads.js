const fs = require('fs');
const path = require('path');
const root = process.env.ENVIRONMENT == 'dev' ? './src/public' : './haisanconamsaigon/src/public';

function handleUploadsSingle(last, curr, src, image, file) {
    // Change name
    if (last != curr) {
        const lastPath = path.join(root, src, last);
        const currPath = path.join(root, src, curr);
        // and change image
        if (file) {
            fs.rmdir(lastPath, { recursive: true }, err => {
                if (err) console.log(err);
            })
            return '/' + path.join(src, curr, file.filename)
        }
        else {
            fs.renameSync(lastPath, currPath);
            let imageName = image.split('/').pop()
            return '/' + path.join(src, curr, imageName);
        }

    }
    // Change images
    else if (file) {
        let link = path.join(root, image);
        fs.unlinkSync(link, err => {
            if (err) console.log(err);
        })
        return '/' + path.join(src, curr, file.filename)
    }
}

function handleUploads(last, curr, src, listImages, files) {
    // Change name
    if (last != curr) {
        const lastPath = path.join(root, src, last);
        const currPath = path.join(root, src, curr);
        // and change images
        if (files.length != 0) {
            fs.rmdir(lastPath, { recursive: true }, err => {
                if (err) console.log(err);
            })
            return files.map(f => {
                return '/' + path.join(src, curr, f.filename)
            })
        }
        else {
            fs.renameSync(lastPath, currPath);
            return listImages.map(item => {
                let imageName = item.split('/').pop()
                return '/' + path.join(src, curr, imageName);
            })
        }

    }
    // Change images
    else if (files.length != 0) {
        console.log('pass');
        listImages.forEach(img => {
            let link = path.join(root, img);
            fs.unlinkSync(link, err => {
                if (err) console.log(err);
            })
        })
        return files.map(f => {
            return '/' + path.join(src, curr, f.filename)
        })
    }
}

module.exports = { handleUploads, handleUploadsSingle }