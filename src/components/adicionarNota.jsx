import { useState } from "react";
import Swal from "sweetalert2";

const AdicionarNota = ({ onSave }) => {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [dataHora, setDataHora] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();

    if (!titulo && !descricao && !dataHora) {
      Swal.fire({
        icon: "error",
        title: "Atenção...",
        text: "Preencha o Titulo, Decrição e Data/Hora ou feche o formulario!"
      })
    } else if (!titulo && descricao && dataHora) {
      Swal.fire({
        icon: "error",
        title: "Atenção...",
        text: "Preencha com o Titulo!"
      })
    } else if (titulo && !descricao && dataHora) {
      Swal.fire({
        icon: "error",
        title: "Atenção...",
        text: "Preencha com a Descrição!"
      })
    } else if (titulo && descricao && !dataHora) {
      Swal.fire({
        icon: "error",
        title: "Atenção...",
        text: "Preencha com a Data/Hora!"
      })
    } else {
      onSave({ titulo, descricao, dataHora });
    }

    setTitulo('');
    setDescricao('');
    setDataHora('');
  };

  return (
    <form className="add-form" onSubmit={onSubmit}>
      <div className="form-control">

        <label>Titulo da Nota</label>
        <input
          type="text"
          placeholder="Adicionar Titulo"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />

        <label>Descrição da Nota</label>
        <textarea
          type="text"
          placeholder="Adicionar Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />

        <label>Data/Hora</label>
        <input
          type="datetime-local"
          placeholder="Adicionar Data/Hora"
          value={dataHora}
          onChange={(e) => setDataHora(e.target.value)}
        />

      </div>
      <input type="submit" className="btn btn-block" value="Salvar Nota" />
    </form>
  );
}

export default AdicionarNota;
