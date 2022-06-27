import FieldInputComponent from './components/inputs/FieldInputComponent';
import BooleanInput from './components/inputs/BooleanInput';
import SelectInput from './components/inputs/SelectInput';
import IntegerInput from './components/inputs/IntegerInput';
import StringInput from './components/inputs/StringInput';
import { LecternField, LecternFieldTypes } from 'lectern';

function getComponentForField(field: LecternField): FieldInputComponent {
  if (field.restrictions?.codeList) {
    // TODO: Define an autocomplete input component
    // TODO: Make the max lenght for SelectInput configurable.
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
      return StringInput;
    case LecternFieldTypes.String:
      return StringInput;
  }
}
export default getComponentForField;
