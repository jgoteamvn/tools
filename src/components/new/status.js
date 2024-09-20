export function getStatusId(status){
    if(status.includes('hết')) return 4
    if(status.includes('sắp sửa đổi')) return 2
    if(status.includes('sắp có hiệu lực')) return 1
    return 6
}