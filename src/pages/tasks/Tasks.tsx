import { getRepositoryById } from "../../api";
import { getRepositoryByname } from "../../api";
import Sidebar from "../../components/Sidebar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";



///https://github.com/GabrielMateusRF/AtividadeReinoanimal



//var link = "https://github.com/ProgrammingTopics/RH-Back"




function taskInfo(link: string){
var resto = link.split("m/", 2)
var keys = resto[1].split("/", 2)
var nomekey = getRepositoryByname(keys[0]);
var idkey = keys[1];
nomekey.then(function(result){
  for(var i=0; i<result.length;i++){
    if(result[i].name == idkey){
      var ccc = getRepositoryById(result[i].id);
      console.log(ccc)
      ccc.then(function(result){
        alert(result.name);
        return result.name;
      })
    }
  }
})
return 0;

}


export default function Tasks() {
  taskInfo("https://github.com/ProgrammingTopics/RH-Back");
  return <Sidebar>Tasks</Sidebar>;
}
