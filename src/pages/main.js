import { Route, Routes } from "react-router-dom";
import Home from "./home";
import CardBattle from "./projetinhos/cardbattles";
import UsersPage from "./usuarios/usuarios";
import TODO from "./todotemplate";
import Atividade1 from "./mat dis/pla1";
import Atividade2 from "./mat dis/pla2";
import DPAtv2 from "./mat dis/dp2";
import Conexo from "./grafos/conexo";

const Main = () => {
  return (   
    <Routes>
      <Route path="/">
        <Route index element={<Home/>}/> 
        <Route path="card" element={<CardBattle/>}/>
        <Route path="users" element={<UsersPage/>}/>
        <Route path="matapl/">
          <Route path="platv1" element={<Atividade1/>}/>
          <Route path="platv2" element={<Atividade2/>}/>
          <Route path="dpatv2" element={<DPAtv2/>}/>
        </Route>
        <Route path="grafos/">
          <Route path="conexo" element={<Conexo/>}/>
        </Route>
        
      </Route>
      <Route path="*" element={<TODO/>}/>
    </Routes>
)}

export default Main;