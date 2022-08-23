import { LecternField, LecternFieldValue } from 'lectern';

type FieldInputComponent = (props: {
  field: LecternField;
  value?: LecternFieldValue;
  onUpdate: (value: LecternFieldValue) => void;
  updateDebounce?: number;
}) => JSX.Element;
export default FieldInputComponent;