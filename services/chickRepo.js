// const { default: simpleGit } = require("simple-git");
const { promises: Fs } = require('fs');
const path = require("path");
const { default: simpleGit } = require('simple-git');

async function exists (path) {  
  try {
    await Fs.access(path)
    return true
  } catch {
    return false
  }
}
module.exports.checkRepo = async ()=> {
    console.log(await exists(  path.join(__dirname,'codestack','React-Testing')));
    if(! await exists(path.join(__dirname,'codestack','React-Testing'))){
        // console.log('hi'+);
        new simpleGit(path.join('./codestack'))
        .clone(`https://itsmanibharathi:${process.env.gitTOKEN}@github.com/itsmanibharathi/React-Testing`)
        console.log(process.env.gitTOKEN);
    }

    return true
}