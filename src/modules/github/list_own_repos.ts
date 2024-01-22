import cmd from "@/utils/cmd-exec.js";
import rofi, { cmdNotifiers } from '@/utils/rofi.js';
import getConfigObject from '@/utils/getConfigObject.js';

async function listSubmodule() {
    const {file} = await getConfigObject();
    if(file === undefined) return;

    const visibilityOpt = ['private', 'public'];
    const visibility = await rofi(visibilityOpt, {tip:"Visibility"});
    if(!visibilityOpt.includes(visibility)) return console.clear();

    const resp = await cmdNotifiers(
    `gh search repos --owner=${file.githubNickname} --visibility=${visibility}`, {
    before:"fetching..."});
    const list = resp.stdout.split('\n').map(el =>{
    return el.split('\t')[0].replace(`${file.githubNickname}/`, '')});
    
    const repo = await rofi(list, {tip: 'Repositories'});
    if(!list.includes(repo)) return console.clear();
    
    await cmdNotifiers(`gh repo clone ${repo}`, {
    before:"cloning...",
    after:"done"});
    
    const actualPath = await cmd('pwd');
    cmd(`${file.editorCommand} ${actualPath.stdout}/${repo}`);
    
    console.clear();
}

listSubmodule()