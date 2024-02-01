import rofi, { cmdNotifiers } from '@/utils/rofi.js';
import getConfigObject from '@/utils/getConfigObject.js';
import cloneRepo from "@/utils/cloneRepo.js";

async function listSubmodule() {
    ///Get Config
    const {file} = await getConfigObject();
    if(file === undefined) return;


    ///Ask for repository Visibility
    const visibilityOpt = ['private', 'public'];
    const visibility = await rofi(visibilityOpt, {tip:"Visibility"});
    if(!visibilityOpt.includes(visibility)) return console.clear();


    ///Fetch Repositories
    const resp = await cmdNotifiers(
    `gh search repos --owner=${file.githubNickname} --visibility=${visibility}`, {
    before:"fetching..."});
    const list = resp.stdout.split('\n').map(el =>{
    return el.split('\t')[0].replace(`${file.githubNickname}/`, '')});
    

    ///Show Repositories
    const repo = await rofi(list, {tip: 'Repositories'});
    if(!list.includes(repo)) return console.clear();
    

    //Clone Selected Repository
    cloneRepo(repo, file);
}

listSubmodule()