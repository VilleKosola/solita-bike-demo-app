import React, { useState } from 'react';
import { omit } from 'lodash';
import dayjs from 'dayjs';

interface errorTypes {
  name?: string;
  date?: string;
}

const useForm = () => {
  //Form values
  const [values, setValues] = useState({} as errorTypes);
  //Errors
  const [errors, setErrors] = useState({} as errorTypes);

  // eslint-disable-next-line
  const validate = (
    event: React.ChangeEvent<HTMLInputElement>,
    name: string,
    value: any
  ) => {
    //A function to validate each input values

    switch (name) {
      case 'date':
        if (!value || !dayjs(value).isValid()) {
          setErrors({
            ...errors,
            date: 'Date is not valid',
          });
        } else {
          const newObj = omit(errors, 'date');
          setErrors(newObj);
        }
        break;

      default:
        if (value.toString().length < 1) {
          // we will set the error state

          setErrors({
            ...errors,
            name: `${name} should not be empty!`,
          });
        } else {
          // set the error state empty or remove the error for username input

          //omit function removes/omits the value from given object and returns a new object
          const newObj = omit(errors, 'name');
          setErrors(newObj);
        }
        break;
    }
  };

  //A method to handle form inputs
  // eslint-disable-next-line
  const handleChange = (event: any) => {
    if (event.persist) {
      //To stop default events
      event.persist();
    }

    const name = event.target.name;
    const val = event.target.value;

    validate(event, name, val);

    //Let's set these values in state
    setValues({
      ...values,
      [name]: val,
    });
  };

  return {
    values,
    errors,
    handleChange,
  };
};

export default useForm;
