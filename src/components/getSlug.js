import _ from "lodash"

export function getSlug(jsonFile){
    const str = _.split(jsonFile.link,'/',10)[5]
    return str.slice(0,str.length - 12)
}