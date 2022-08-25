import { LecternField, LecternFieldValue } from 'lectern';
import { FieldInputState, SchemaInputState } from '../../../types';

type FieldInputComponent = (props: {
  field: LecternField;
  state: FieldInputState;
  onUpdate: (state: LecternFieldValue) => void;
  updateDebounce?: number;
}) => JSX.Element;
export default FieldInputComponent;
