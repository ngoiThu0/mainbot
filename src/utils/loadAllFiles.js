const path = require("path");
const fs = require("fs");

module.exports = (directory, folderOnly = false) => {
    let list = [];

    const files = fs.readdirSync(directory, {withFileTypes: true})
    files.forEach(file => {
        const filePath = path.join(directory, file.name);

        if(folderOnly){
            if(file.isDirectory()){
                list.push(filePath);
            }
        } else {
            if(file.isFile()){
                list.push(filePath);
            }
        }
    })
    

    return list;
}