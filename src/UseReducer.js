import React from "react";

const SECURITY_CODE = "paradigma";

function UseReducer({ name }) {
  const [state, dispach] = React.useReducer(reducer, initialState);

  const onConfirm = () => dispach({ type: actionTypes.confirm });
  const onError = () => dispach({ type: actionTypes.error });
  const onCheck = () => dispach({ type: actionTypes.check });
  const onDeleted = () => dispach({ type: actionTypes.delete });
  const onReset = () => dispach({ type: actionTypes.reset });

  const onWrite = (newValue) => {
    dispach({ type: "WRITE", payload: newValue });
  };

  React.useEffect(() => {
    console.log("Empezando el efecto");

    if (!!state.loading) {
      onError();
      setTimeout(() => {
        console.log("Haciendo la validacion...");
        if (state.value === SECURITY_CODE) {
          onConfirm();
        } else {
          onError();
        }
        console.log("Terminando la validacion...");
      }, 1000);
    }

    console.log("Terminando el efecto");
  }, [state.loading]);

  if (!state.deleted && !state.confirmed) {
    return (
      <div>
        <h2>Eliminar {name}</h2>
        <p>Por favor, escribe el código de seguridad</p>
        {state.error && <p>Error: El código es incorrecto</p>}
        {state.loading && <p>Cargando...</p>}
        <input
          value={state.value}
          onChange={(event) => onWrite(event.target.value)}
          placeholder="Código de Seguridad"
        />
        <button onClick={onCheck}>Comprobar</button>
      </div>
    );
  } else if (!!state.confirmed && !state.deleted) {
    return (
      <React.Fragment>
        <p>Estado de confirmación. ¿Estás seguro que quieres eliminar?</p>
        <button onClick={onDeleted}>Si, eliminar</button>
        <button onClick={onReset}>No, cancelar</button>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <p>Eliminado con éxito</p>
        <button onClick={onReset}>Resetear, volver atrás</button>
      </React.Fragment>
    );
  }
}

const initialState = {
  value: "",
  error: false,
  loading: false,
  deleted: false,
  confirmed: false,
};

const actionTypes = {
  error: "Error",
  confirm: "Confirm",
  write: "Write",
  check: "Check",
  delete: "Delete",
  reset: "Reset",
};

const reducerObject = (state, payload) => ({
  [actionTypes.error]: {
    ...state,
    loading: false,
    error: true,
  },
  [actionTypes.check]: {
    ...state,
    loading: true,
  },
  [actionTypes.confirm]: {
    ...state,
    loading: false,
    error: false,
    confirmed: true,
  },
  [actionTypes.write]: {
    ...state,
    value: payload,
  },
  [actionTypes.delete]: {
    ...state,
    deleted: true,
  },
  [actionTypes.reset]: {
    ...state,
    confirmed: false,
    deleted: false,
    value: "",
  },
});

const reducer = (state, action) => {
  if (reducerObject(state)[action.type]) {
    return reducerObject(state, action.payload)[action.type];
  } else {
    return state;
  }
};

export { UseReducer };
