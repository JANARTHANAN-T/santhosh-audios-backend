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
          .clone('https://itsmanibharathi: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@github.com/itsmanibharathi/React-Testing')
    }

    return true
}