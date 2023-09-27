#!/bin/bash
source $GPATH/sourcerer.sh

resp=$(echo "" | rofi -dmenu -p "nome do submodulo a ser criado: ")

export exploring=1
path=$GPATH/src
accessor

path=$GPATH/src/$selected/$resp
mkdir $path
cp $GPATH/templates/indexSubModule.sh $path/index.sh

sed -i "s/ParentFolder/$resp/" $path/index.sh
