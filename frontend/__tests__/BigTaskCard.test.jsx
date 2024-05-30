import { render, screen } from "@testing-library/react";
import BigTaskCard from "../src/components/todo/BigTaskCard/BigTaskCard";
import { taskMock } from "../src/mockData/tasksMocks";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    back: jest.fn(),
  })),
}));

describe("BigTaskCard", () => {
  it("Renders task title", () => {
    render(<BigTaskCard task={taskMock} />);

    const textElement = screen.getByTestId("btc-title");

    expect(textElement).toHaveTextContent(taskMock.title);
  });
});
