import _ from 'lodash';

export function changeBackLink(content){
    const contentChange1 = _.replace(content,new RegExp('https://thuvienphapluat.vn','g'), 'https://luatphapvietnam.org')
    const contentChange2 = _.replace(contentChange1,new RegExp('.aspx','g'), '')
    return contentChange2
}