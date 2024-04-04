"use client";
import { MouseEventHandler, forwardRef, ForwardedRef } from "react";
import { MutableRefObject } from "react";

export default forwardRef(function AddProjectButton(
  { handleClick }: { handleClick: MouseEventHandler<HTMLButtonElement> },
  ref: ForwardedRef<HTMLInputElement | null>
): JSX.Element {
  return (
    <div>
      <label htmlFor="project-name">Project Name</label>
      <input
        ref={ref}
        type="text"
        id="project-name"
        name="project-name"
        required
      />
      <button onClick={handleClick}>Add</button>
    </div>
  );
});
