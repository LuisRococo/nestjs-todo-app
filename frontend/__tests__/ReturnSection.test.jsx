import { render, screen } from "@testing-library/react";
import ReturnSection from "../src/components/todo/ReturnSection/ReturnSection";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    back: jest.fn(),
  })),
}));

describe("ReturnSection", () => {
  it("Renders default text", () => {
    render(<ReturnSection />);

    const textElement = screen.getByTestId("rc-text");

    expect(textElement).toHaveTextContent("Go back");
  });

  it("Renders custom text", () => {
    render(<ReturnSection text="Custom text" />);

    const textElement = screen.getByTestId("rc-text");

    expect(textElement).toHaveTextContent("Custom text");
  });
});
