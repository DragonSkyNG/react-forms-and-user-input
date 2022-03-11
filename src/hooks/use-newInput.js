import { useState } from "react";

const useNewInput = (validateInput) => {
  const [newInput, setNewInput] = useState("");
  const [newInputIsTouched, setNewInputIsTouched] = useState(false);

  const newInputIsValid = validateInput(newInput);
  const newInputHasError = !newInputIsValid && newInputIsTouched;

  const newInputChangeHandler = (event) => {
    setNewInput(event.target.value);
  };
  const newInputBlurHandler = () => {
    setNewInputIsTouched(true);
  };

  const reset = () => {
    setNewInput("");
    setNewInputIsTouched(false);
  };

  return {
    value: newInput,
    isValid: newInputIsValid,
    hasError: newInputHasError,
    newInputChangeHandler,
    newInputBlurHandler,
    reset,
  };
};

export default useNewInput;
