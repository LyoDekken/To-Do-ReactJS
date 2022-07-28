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
  const [users, setUsers] = useState({ name: '', avatar: '',})

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

    //Se usar apenas prevState, a seleção do irá entregar um array dentro de outro
    //['[Rodrigo]','Amanda']
    //Por isso os três pontos ...prevState (pegar todos os valores dentro do array)
    setStudents((prevState) => [...prevState, newStudent]);
  }

  //corpo do useEffect
  //Não é possivel utilizar async diretamento no useEffect, devo criar uma função dentro do useEffect(PARA casos assíncronos)
  // useEffect(() => {
  //   //Executa o que estiver aqui dentro quando ele for chamado
  //   fetch('https://api.github.com/users/LyoDekken')
  //   .then(response => response.json())
  //   .then(data => {
  //     setUsers({
  //       name: data.name,
  //       avatar: data.avatar_url,
  //     });
  //   })
  // }, []);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("https://api.github.com/users/LyoDekken");
      const data = await response.json();

      setUsers({
        name: data.name,
        avatar: data.avatar_url,
      });
    }

    fetchData();
  }, []);

  //O array serve para guardar os estados em que ele foi chamado
  //Se estiver vazio, ele será executado apenas uma vez

  return (
    <div className="container">
      <header>
        <h1>Lista de Presença</h1>
        <div>
          <strong>{users.name}</strong>
          <img src={users.avatar} alt="Foto de Perfil" />
        </div>
      </header>
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

      {students.map((student) => (
        <Card
          //components devem conter id's se não notificam erros no debugador
          key={student.id}
          name={student.name}
          time={student.time}
        />
      ))}
    </div>
  );
}
