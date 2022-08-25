import { LecternField, LecternFieldValue } from 'lectern';
import { FieldInputState } from '../../../types';

type FieldInputComponent = (props: {
  field: LecternField;
  state: FieldInputState;
  onUpdate: (state: LecternFieldValue) => void;
  clearValidation: () => void;
  updateDebounce?: number;
}) => JSX.Element;
export default FieldInputComponent;
