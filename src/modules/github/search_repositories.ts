import rofi, { cmdNotifiers } from '@/utils/rofi.js';
import getConfigObject from '@/utils/getConfigObject.js';
import cloneRepo from "@/utils/cloneRepo.js";

async function listSubmodule() {
    ///Get Config
    const {file} = await getConfigObject();
    if(file === undefined) return;

    
    //Get any query
    const query = await rofi([], {tip:"Query"});
    if(query === '') return console.log();


    //Fetch Repositories
    const resp = await cmdNotifiers(
    'gh search repos -L 10 --match name '+query, {before:"fetching..."});
    const list = resp.stdout.split('\n').map(el =>{
        return el.split('\t')[0]});

    
    //Show Repositories
    const repo = await rofi(list, {tip: 'Repositories'});
    if(!list.includes(repo)) return console.clear();
    

    //Clone Selected Repository
    cloneRepo(repo, file);
}

listSubmodule();