import { LecternField, LecternFieldValue } from 'lectern';

type FieldInputComponent = (props: {
  field: LecternField;
  onUpdate: (value: LecternFieldValue) => void;
}) => JSX.Element;
export default FieldInputComponent;
