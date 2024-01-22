import cmd from "@/utils/cmd-exec.js";
import rofi, { cmdNotifiers } from '@/utils/rofi.js';
import getConfigObject from '@/utils/getConfigObject.js';
import { exec } from "child_process";

async function listSubmodule() {
    const {file} = await getConfigObject();
    if(file === undefined) return;

    const query = await rofi([], {tip:"Query"});
    if(query === '') return console.log();

    const resp = await cmdNotifiers(
    'gh search repos -L 10 --match name '+query, {before:"fetching..."});
    const list = resp.stdout.split('\n').map(el =>{
        return el.split('\t')[0]});
    
    const repo = await rofi(list, {tip: 'Repositories'});
    if(!list.includes(repo)) return console.clear();
    
    await cmdNotifiers(`gh repo clone ${repo}`, {
    before:"cloning...",
    after:"done"});

    const actualPath = await cmd('pwd');
    // exec(`${file.editorCommand} ${actualPath.stdout}/${repo.split('/')[1]}`);

    cmd(`${file.editorCommand} ${actualPath.stdout}/${repo.split('/')[1]}`);

    console.clear();
}

listSubmodule();