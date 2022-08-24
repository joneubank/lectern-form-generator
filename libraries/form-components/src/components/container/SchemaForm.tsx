import { LecternSchema } from 'lectern';
import * as React from 'react';
import { FieldInputState, SchemaInputState } from '../../types';
import { buildEmptyInputForSchema } from '../../utils/schemaFormUtils';
import SchemaFieldInput from '../container/FieldInput';

enum UserInputReducerActions {
  UPDATE_FIELD,
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

  const userInputReducer = (
    previousState: SchemaInputState,
    action:
      | { type: UserInputReducerActions.UPDATE_FIELD; state: FieldInputState; field: string }
      | { type: UserInputReducerActions.RESET },
  ) => {
    switch (action.type) {
      case UserInputReducerActions.RESET:
        return initialUserInputs;
      case UserInputReducerActions.UPDATE_FIELD:
        return { ...previousState, [action.field]: action.state };
    }
  };
  const [userInputs, setUserInputs] = React.useReducer(userInputReducer, initialUserInputs);

  const updateUserInputs = (state: FieldInputState, field: string): void => {
    setUserInputs({ type: UserInputReducerActions.UPDATE_FIELD, state, field });
  };

  const submitData = () => {
    // check validations?
    props.onSubmit(userInputs);
    setUserInputs({ type: UserInputReducerActions.RESET });
    updateSubmissionCount();
  };

  return (
    <>
      {props.schema.fields.map((field, fieldIndex) => {
        return (
          <SchemaFieldInput
            key={`${submissionCount}${fieldIndex}`}
            field={field}
            state={userInputs[field.name] || {}}
            onUpdate={(state: FieldInputState) => updateUserInputs(state, field.name)}
          />
        );
      })}
      <button onClick={submitData}>Submit</button>
    </>
  );
};

export default SchemaForm;
