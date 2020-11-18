import * as React from "react";
import NoGifs from "../NoGifs";
import { render } from "@testing-library/react";

describe("NoGifs component", () => {
  describe("when it loads", () => {
    it("renders component", () => {
      const { container } = render(<NoGifs />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
