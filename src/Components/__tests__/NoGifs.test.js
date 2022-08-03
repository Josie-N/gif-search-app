import * as React from "react";
import NoGifs from "../NoGifs";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

afterEach(cleanup);

describe("NoGifs component", () => {
  describe("when it loads", () => {
    it("renders component", () => {
      const { container } = render(<NoGifs />);
      expect(container.firstChild).toMatchSnapshot();

      const { asFragment } = render(<NoGifs />);

      console.log(asFragment);
    });

    it("inserts text in h3", () => {
      const { getByTestId, getByText } = render(<NoGifs />);
      // expect(getByTestId("h3-tag").textContent).toBe(
      //   "Sorry, no GIFs match your search."
      // );
      expect(getByTestId("h3-tag")).toHaveTextContent(
        "Sorry, no GIFs match your search."
      );
      expect(getByText("Sorry, no GIFs match your search.")).toHaveTextContent(
        "Sorry, no GIFs match your search."
      );
    });
  });
});
