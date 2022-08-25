import { LecternField, LecternFieldValue, LecternSchema, validateField } from 'lectern';
import * as React from 'react';
import { FieldInputState, SchemaInputState } from '../../types';
import { buildEmptyInputForSchema, convertInputStateToSchemaRecord } from '../../utils/schemaFormUtils';
import SchemaFieldInput from '../container/FieldInput';

enum UserInputReducerActions {
  UPDATE_FIELD,
  VALIDATE_ALL,
  RESET,
}

const SchemaForm = (props: { schema: LecternSchema; onSubmit: (userInputs: SchemaInputState) => void }) => {
  // submissionCount is used to enable clearing the form on submission:
  //  By incrementing the count every submission and including this state in the `key` of each input field
  //   it will force them to be recreated which clears the value in the input
  const [submissionCount, updateSubmissionCount] = React.useReducer((state: number) => {
    return state + 1;
  }, 0);

  const initialUserInputs: SchemaInputState = buildEmptyInputForSchema(props.schema);

  const _userInputsReducer = (
    previousState: SchemaInputState,
    action:
      | { type: UserInputReducerActions.UPDATE_FIELD; value: LecternFieldValue; field: LecternField }
      | { type: UserInputReducerActions.VALIDATE_ALL }
      | { type: UserInputReducerActions.RESET },
  ) => {
    switch (action.type) {
      case UserInputReducerActions.RESET:
        return initialUserInputs;
      case UserInputReducerActions.UPDATE_FIELD:
        const validation = validateField(action.field, action.value, convertInputStateToSchemaRecord(previousState));
        return { ...previousState, [action.field.name]: { value: action.value, validation } };
      case UserInputReducerActions.VALIDATE_ALL:
        const inputsAsRecord = convertInputStateToSchemaRecord(previousState);
        const validatedState = props.schema.fields.reduce<SchemaInputState>((acc, field) => {
          const validation = validateField(field, previousState[field.name]?.value, inputsAsRecord);
          acc[field.name] = { value: previousState[field.name].value, validation };
          return acc;
        }, {});
        return validatedState;
    }
  };
  const [userInputs, userInputsReducer] = React.useReducer(_userInputsReducer, initialUserInputs);

  const updateUserInputs = (value: LecternFieldValue, field: LecternField): void => {
    userInputsReducer({ type: UserInputReducerActions.UPDATE_FIELD, value, field });
  };
  const resetUserInputs = () => {
    userInputsReducer({ type: UserInputReducerActions.RESET });
  };
  const validateUserInputs = () => {
    userInputsReducer({ type: UserInputReducerActions.VALIDATE_ALL });
  };

  const allFieldsPassValidation = (): boolean => {
    const inputsAsRecord = convertInputStateToSchemaRecord(userInputs);
    return props.schema.fields.every(
      (field) => validateField(field, userInputs[field.name]?.value, inputsAsRecord).valid,
    );
  };

  const submitData = () => {
    if (allFieldsPassValidation()) {
      props.onSubmit(userInputs);
      resetUserInputs();
      updateSubmissionCount();
    } else {
      validateUserInputs();
    }
  };

  return (
    <>
      {props.schema.fields.map((field, fieldIndex) => {
        return (
          <SchemaFieldInput
            key={`${submissionCount}_${fieldIndex}`}
            field={field}
            state={userInputs[field.name] || {}}
            onUpdate={(value: LecternFieldValue) => updateUserInputs(value, field)}
          />
        );
      })}
      <button onClick={submitData}>Submit</button>
    </>
  );
};

export default SchemaForm;
