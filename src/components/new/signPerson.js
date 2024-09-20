import fs from 'fs.promises'

export async function getPersonId(name){
    const jsonFile = require(`./json/person.json`)

    // kiểm tra xem đã có chưa
    const check = jsonFile.find(e => e.name == name)
    
    if(check) return check.id

    // chưa có thì ghi thêm vào
    const newId = jsonFile.length + 1
    let newArr = jsonFile
    newArr.push({id: newId,name: name,position_id:1})

    await fs.writeFile(`./src/components/new/json/person.json`, JSON.stringify(newArr))
    
    return newId
}