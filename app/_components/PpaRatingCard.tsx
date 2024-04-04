import { PpaRatingElement } from "@/lib/type";
import {
  ForwardedRef,
  ChangeEventHandler,
  MouseEventHandler,
  forwardRef,
} from "react";
import { KEY_SEPARATER } from "@/lib/macro";

export default forwardRef(function PpaRatingCard(
  {
    elements,
    handleChange,
    deleteRow,
  }: {
    elements: PpaRatingElement;
    handleChange: ChangeEventHandler<HTMLInputElement>;
    deleteRow: MouseEventHandler<HTMLButtonElement>;
  },
  ref: ForwardedRef<null | HTMLTableRowElement>
): JSX.Element {
  let sum = 0;
  const rowElement = Object.entries(elements)
    .filter((p) => {
      const [key, value] = p;
      return key !== "id" && key !== "create_date" && key !== "update_date";
    })
    .map((p) => {
      const [key, value] = p;
      let keyValue = elements.id + KEY_SEPARATER + key;
      if (key === "name") {
        return (
          <th key={keyValue} scope="row">
            <button
              id={keyValue + KEY_SEPARATER + "deleteButton"}
              onClick={deleteRow}
            >
              x
            </button>
            <input type="text" defaultValue={value} onChange={handleChange} />
          </th>
        );
      } else {
        sum += value;
        return (
          <td key={keyValue}>
            <input
              type="number"
              id={keyValue}
              min={1}
              max={10}
              defaultValue={value}
              onChange={handleChange}
            />
          </td>
        );
      }
    });
  return (
    <tr ref={ref}>
      {rowElement}
      <td>{sum}</td>
    </tr>
  );
});
