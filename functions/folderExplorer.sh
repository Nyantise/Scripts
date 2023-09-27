#!/bin/bash

folderExplorer() {
for f in $path/*/
do
  f="${f/"$path"/""}"
  noSH=$(echo "$f" | sed 's/\///g')
  noSH="${noSH//"_"/" "}"
  menu=$(printf "$menu\n$noSH")
done

selected=$(echo "$menu" | rofi -normal-window -dmenu -p "$rofiTip")
selected="${selected//" "/"_"}"
}
