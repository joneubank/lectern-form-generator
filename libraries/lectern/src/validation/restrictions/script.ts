import { LecternField, LecternFieldValue, LecternSchemaRecord } from '../../types';

type ValidationFunctionArgs = {
  $field: LecternFieldValue;
  $name: string;
  $row: LecternSchemaRecord;
};

type ValidationFunctionResult = {
  valid: boolean;
  message: string;
};

// input should be type unknown, but any is used because it was found that inspecting properties of an unknown type requires some finicky type casting which essentially treats the input as `any` anyways
function isValidationResult(input: any): input is ValidationFunctionResult {
  return (
    input !== null &&
    typeof input === 'object' &&
    typeof input['valid'] === 'boolean' &&
    typeof input['message'] === 'string'
  );
}

function validateScript(
  value: LecternFieldValue,
  script: string,
  context: { record: LecternSchemaRecord; field: LecternField },
): ValidationFunctionResult {
  const args: ValidationFunctionArgs = {
    $field: value,
    $name: context.field.name,
    $row: context.record,
  };

  const validationScript = eval(script);
  console.log(script);

  // Run validation script in try block to catch any issues in the schema's function.
  try {
    const result = validationScript(args);
    if (isValidationResult(result)) {
      return result;
    } else {
      console.log(result);
      throw new Error('Validation script returned unexpected response.');
    }
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : `${e}`;
    return { valid: false, message };
  }
}
export default validateScript;
