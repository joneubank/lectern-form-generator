import FieldInputComponent from './FieldInputComponent';
import BooleanInput from './BooleanInput';
import SelectInput from './SelectInput';
import IntegerInput from './IntegerInput';
import NumberInput from './NumberInput';
import StringInput from './StringInput';
import { LecternField, LecternFieldTypes } from 'lectern';

function getComponentForField(field: LecternField): FieldInputComponent {
  if (field.restrictions?.codeList) {
    // TODO: Define an autocomplete input component
    // TODO: Make the max length for SelectInput configurable.
    // if(field.restrictions?.codeList.length > 20) {
    //   return AutocompleteInput;
    // }
    return SelectInput;
  }
  switch (field.valueType) {
    case LecternFieldTypes.Boolean:
      return BooleanInput;
    case LecternFieldTypes.Integer:
      return IntegerInput;
    case LecternFieldTypes.Number:
      return NumberInput;
    case LecternFieldTypes.String:
      return StringInput;
  }
}
export default getComponentForField;
