import { FaPencilAlt, FaTimes } from "react-icons/fa";
import "../index.css";

const Nota = ({ nota, onDelete, onEdit }) => {
  return (
    <div>
      <div className="nota">
        <div>
          <p className="notaTitulo">
            <span className="textoBold">Titulo da Nota:</span> {nota.titulo}
          </p>
          <p className="notaDescricao">
            <span className="textoBold">Descrição da Nota:</span> {nota.descricao}
          </p>
          <p className="notaDataHora">
            <span className="textoBold">Data/Hora:</span> {nota.dataHora}
          </p>
        </div>
        <div>
          <p>
            <FaTimes onClick={() => onDelete(nota.id)} className="delIcon"/>
          </p>
          <p>
            <FaPencilAlt onClick={() => onEdit(nota.id)} className="editIcon"/>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Nota;