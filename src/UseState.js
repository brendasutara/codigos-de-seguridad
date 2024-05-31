import React from "react";

const SECURITY_CODE = "paradigma";

function UseState({ name }) {
  const [state, setState] = React.useState({
    value: "",
    error: false,
    loading: false,
    deleted: false,
    confirmed: false,
  });

  const onConfirm = () => {
    setState({
      ...state,
      loading: false,
      error: false,
      confirmed: true,
    });
  };

  const onError = () => {
    setState({
      ...state,
      loading: false,
      error: true,
    });
  };

  const onWrite = (newValue) => {
    setState({
      ...state,
      value: newValue,
    });
  };

  const onCheck = () => {
    setState({
      ...state,
      loading: true,
    });
  };

  const onDeleted = () => {
    setState({
      ...state,
      deleted: true,
    });
  };

  const onReset = () => {
    setState({
      ...state,
      confirmed: false,
      deleted: false,
      value: "",
    });
  };

  React.useEffect(() => {
    console.log("Empezando el efecto");

    if (!!state.loading) {
      setState({
        ...state,
        error: false,
      });
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
        <button onClick={() => onCheck()}>Comprobar</button>
      </div>
    );
  } else if (!!state.confirmed && !state.deleted) {
    return (
      <React.Fragment>
        <p>Estado de confirmación. ¿Estás seguro que quieres eliminar?</p>
        <button onClick={() => onDeleted()}>Si, eliminar</button>
        <button onClick={() => onReset()}>No, cancelar</button>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <p>Eliminado con éxito</p>
        <button onClick={() => onReset()}>Resetear, volver atrás</button>
      </React.Fragment>
    );
  }
}

export { UseState };
