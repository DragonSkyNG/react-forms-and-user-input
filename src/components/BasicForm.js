import { useState, useEffect } from "react";
import useNewInput from "../hooks/use-newInput";

const BasicForm = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);

  const {
    value: firstName,
    isValid: firstNameIsValid,
    hasError: firstNameHasError,
    newInputChangeHandler: firstNameChangeHandler,
    newInputBlurHandler: firstNameBlurHandler,
    reset: firstNameReset,
  } = useNewInput((value) => {
    return value !== "" && value.length >= 2;
  });
  const {
    value: lastName,
    isValid: lastNameIsValid,
    hasError: lastNameHasError,
    newInputChangeHandler: lastNameChangeHandler,
    newInputBlurHandler: lastNameBlurHandler,
    reset: lastNameReset,
  } = useNewInput((value) => {
    return value !== "" && value.length >= 2;
  });
  const {
    value: email,
    isValid: emailIsValid,
    hasError: emailHasError,
    newInputChangeHandler: emailChangeHandler,
    newInputBlurHandler: emailBlurHandler,
    reset: emailReset,
  } = useNewInput((value) => {
    let re = /^[ ]*([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})[ ]*$/i;
    return re.test(value);
  });

  useEffect(() => {
    setFormIsValid(firstNameIsValid && lastNameIsValid && emailIsValid);
  }, [firstNameIsValid, lastNameIsValid, emailIsValid]);

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    console.log(firstName);
    console.log(lastName);
    console.log(email);

    firstNameReset();
    lastNameReset();
    emailReset();
  };

  const firstNameInputClass = !firstNameHasError
    ? "form-control"
    : "form-control invalid";
  const lastNameInputClass = !lastNameHasError
    ? "form-control"
    : "form-control invalid";
  const emailInputClass = !emailHasError
    ? "form-control"
    : "form-control invalid";

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className="control-group">
        <div className={firstNameInputClass}>
          <label htmlFor="name">First Name</label>
          <input
            type="text"
            id="name"
            onChange={firstNameChangeHandler}
            onBlur={firstNameBlurHandler}
            value={firstName}
          />
          {firstNameHasError && (
            <p>First name must contain at least 2 symbols</p>
          )}
        </div>
        <div className={lastNameInputClass}>
          <label htmlFor="name">Last Name</label>
          <input
            type="text"
            id="name"
            onChange={lastNameChangeHandler}
            onBlur={lastNameBlurHandler}
            value={lastName}
          />
          {lastNameHasError && <p>Last name must contain at least 2 symbols</p>}
        </div>
      </div>
      <div className={emailInputClass}>
        <label htmlFor="name">E-Mail Address</label>
        <input
          type="text"
          id="name"
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          value={email}
        />
        {emailHasError && (
          <p>
            Entered email is wrong. Must contain @ and at least 2 symbols after
            .
          </p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
