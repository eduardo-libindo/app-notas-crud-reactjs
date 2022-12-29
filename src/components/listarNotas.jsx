import Nota from "./Nota";
import "../index.css";

const ListarNotas = ({ notas, onDelete, onEdit }) => {
  return (
    <>
      {notas.map((nota) => (
        <Nota key={nota.id} nota={nota} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </>
  );
};

export default ListarNotas;