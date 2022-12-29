//Importando Componentes
import Header from "./components/Header";
import ListarNotas from "./components/listarNotas";
import AdicionarNota from "./components/adicionarNota";
//Importando Hooks
import { useState, useEffect } from "react";
//Importando Pacotes
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";

function App() {
  //todos os states
  const [loading, setLoading] = useState(true); //state de pre-carregamento, antes da renderização da pagina.
  const [notas, setNotas] = useState([]); //state encarregado da nota.
  const [showAdicionarNota, setShowAdicionarNota] = useState(false); // state responsavel pela exibição do formulario de inserção da nota

  //pre-carregamento
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3500);
  }, []);

  //Buscar notas no Local Storage
  const getNotas = JSON.parse(localStorage.getItem("notaAdicionada"));

  useEffect(() => {
    if (getNotas == null) {
      setNotas([]);
    } else {
      setNotas(getNotas);
    }
    // eslint-disable-next-line
  }, []);

  //Adicionar Nota
  const adicionarNota = (nota) => {
    const id = uuidv4();
    const novaNota = { id, ...nota };

    setNotas([...notas, novaNota]);

    Swal.fire({
      icon: 'success',
      title: "Atenção...",
      text: "Voce Adicionou uma Nova Nota com Sucesso!",
    });

    localStorage.setItem(
      "notaAdicionada",
      JSON.stringify([...notas, novaNota])
    );
  };

  //Deletar Nota
  const deletarNota = (id) => {
    const deleteNota = notas.filter((nota) => nota.id !== id);

    setNotas(deleteNota);

    Swal.fire({
      icon: "success",
      title: "Atenção...",
      text: "Voce Removeu a Nota com Sucesso!",
    });
    localStorage.setItem("notaAdicionada", JSON.stringify(deleteNota));
  };

  //Editar Nota
  const editarNota = (id) => {
    const titulo = prompt("Titulo da Nota: ");
    const descricao = prompt("Descrição da Nota: ");
    const dataHora = prompt("Data/Hora da Nota: ");
    
    let data = JSON.parse(localStorage.getItem('notaAdicionada'));

    const myData = data.map((x) => {
      if (x.id === id) {
        return {
          ...x,
          titulo: titulo,
          descricao: descricao,
          dataHora: dataHora,
          id: uuidv4()
        }
      }
      return x;
    })

    Swal.fire({
      icon: "success",
      title: "Atenção...",
      text: "Voce Editou a Nota com Sucesso!",
    })

    localStorage.setItem("notaAdicionada", JSON.stringify(myData));
    window.location.reload();
  };

  return (
    <>
      {
        loading 
        ? 
        <div className="spinnerContainer">
          <div className="spinner-grow text-primary" role="status">
            <span className="visually-hidden">Carregando...</span>
          </div>
          <div className="spinner-grow text-secondary" role="status">
            <span className="visually-hidden">Carregando...</span>
          </div>
          <div className="spinner-grow text-success" role="status">
            <span className="visually-hidden">Carregando...</span>
          </div>
          <div className="spinner-grow text-danger" role="status">
            <span className="visually-hidden">Carregando...</span>
          </div>
          <div className="spinner-grow text-warning" role="status">
            <span className="visually-hidden">Carregando...</span>
          </div>
        </div>
        :
        <div className="container">
          <Header
            showForm={() => setShowAdicionarNota(!showAdicionarNota)}
            changeTextColor={showAdicionarNota}/>

          {showAdicionarNota && <AdicionarNota onSave={adicionarNota} />}

          <h3>Notas: {notas.length}</h3>

          {
            notas.length > 0 
            ? 
            (<ListarNotas notas={notas} onDelete={deletarNota} onEdit={editarNota} />) 
            : 
            ("Nota não encontrada!")
          }
        </div>
      }
    </>
  );
}

export default App;
