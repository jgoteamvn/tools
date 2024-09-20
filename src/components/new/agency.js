import fs from 'fs.promises'

export async function getAgencyId(name){
    const jsonFile = require(`./json/agency.json`)

    // kiểm tra xem đã có chưa
    const check = jsonFile.find(e => e.name == name)
    
    if(check) return check.id

    // chưa có thì ghi thêm vào
    const newId = jsonFile.length + 1
    let newArr = jsonFile
    newArr.push({id: newId,name: name})

    await fs.writeFile(`./src/components/new/json/agency.json`, JSON.stringify(newArr))
    
    return newId
}