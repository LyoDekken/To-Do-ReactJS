import "./styles.css";
import React, { useState, useEffect } from "react";

import { Card } from "../../components/Card";

export function App() {
  // function handleChangeName(name) {
  //   console.log(name);
  // }

  //[studentName = lugar onde armazena as informações]
  //[setStudentName = lugar onde atualiza as informações]

  const [studentName, setStudentName] = useState("");
  const [students, setStudents] = useState([]);

  function handleAddStudent() {
    //Adicionar novo estudante
    const newStudent = {
      //variavel armazenada
      name: studentName,
      time: new Date().toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
    };


    //Se usar apenas prevState, a seleção do 
    setStudents((prevState) => [...prevState, newStudent]);
  }

  return (
    <div className="container">
      <h1>Lista de Presença: {studentName}</h1>
      <input
        type="text"
        placeholder="Digite o nome..."
        //onChange={e => e.target.value =}

        //Valor atual dentro do input
        //Toda vez que o conteúdo do input mudar, ele entregará um valor para a função
        //Depois imprime na tela
        onChange={(e) => setStudentName(e.target.value)}
      />

      <button type="button" onClick={handleAddStudent}>
        Adicionar
      </button>

      {
        students.map((student) => (
          <Card 
          //components devem conter id's se não notificam erros no debugador
          key={student.id}
          name={student.name} 
          time={student.time}
         />
        ))
      }
    </div>
  );

}
