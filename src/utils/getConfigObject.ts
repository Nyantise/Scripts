import { readFileSync, writeFileSync } from "fs";
import { getProjectPath } from "./projectPath.js";
import { rofiMessage } from "./rofi.js";


export default async function getConfigObject() {
    try {
        const filePath = await getProjectPath('/.config');
        const fileString = readFileSync(filePath, 'utf8');
        const fileObject = JSON.parse(fileString);
        
        const finalObject = {
           file: fileObject as Config,
           writeFile: (obj:Object)=>{
              const json = JSON.stringify(obj, null, 3);
              writeFileSync(filePath, json, 'utf8');
           }
        }
        return finalObject;
    } catch (error) {
        rofiMessage('No .config file or unknown .config file format')
    }
}


type Config = {
    editorCommand: string,
    githubNickname: string
}