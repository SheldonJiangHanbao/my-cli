const fs = require('fs')
const statSync = fs.statSync
const path = require('path')

const copy = async (src, dst) => {
    // 读取目录
    const paths = fs.readdirSync(src)
    if(paths.length === 0){
        console.error('未找到子目录和子文件')
        return false
    }
    const promises = []
    paths.forEach((_path) => {
        promises.push(new Promise(async (resolve, reject) => {
            const _src = path.join(src, _path)
            const _dst = path.join(dst, _path)
            let readable
            let writable
            const st = statSync(_src)
            if(st.isFile()){
                readable = fs.createReadStream(_src) // 创建读取流
                writable = fs.createWriteStream(_dst) // 创建写入流
                readable.pipe(writable)
                writable.on('close', () => {
                    resolve(true)
                })
                writable.on('error', () => {
                    reject(false)
                })
            } else if(st.isDirectory()){
                const res = await exists(_src, _dst, copy)
                resolve(res)
            }
        }))
    })
    const res = await Promise.all(promises)
    return res
}

const exists = async (src, dst, callback) => {
    // 判断目标文件夹是否存在
    let exits = false
    try {
        exits = fs.existsSync(dst)
    } catch (e) {}
    let res
    if (exits) {
        // 目标文件夹存在
        res = await callback(src, dst)
    } else {
        // 不存在, 创建目录
        let mkRes = false
        try {
            mkRes = fs.mkdirSync(dst)
        } catch(e){}
        if (mkRes !== false) {
            // 创建目录成功后，开始复制
            res = await callback(src, dst)
        }
    }
    return res
}

const copyDir = async (src, dst) => {
  const res = await exists(src, dst, copy)
  return res
}
module.exports = copyDir
// const deleteFolder = require('./del')
// const operation = async () => {
//     const res = await copyDir(
//         path.join(__dirname, '..', 'testSrc'),
//         path.join(__dirname, '..', 'test')
//     )
//     if (res) {
//         deleteFolder(path.join(__dirname, '..', 'testSrc'))
//     }
// }
// operation()