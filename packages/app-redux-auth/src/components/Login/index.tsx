import { useDispatch } from "react-redux";
import { ingresoUsuarioAction } from "../../redux";

export const Login = () => {
  const dispatch = useDispatch();

  return (
    <div className="mt-5 text-center">
      <h3>Ingreso con google</h3>
      <hr />
      <button
        className="btn btn-dark"
        onClick={() => dispatch(ingresoUsuarioAction())}
      >
        Acceder
      </button>
    </div>
  );
};
