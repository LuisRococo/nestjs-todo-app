import { render, screen } from "@testing-library/react";
import TaskCard from "../src/components/todo/TasksContainer/TaskCard/TaskCard";
import { taskMock } from "../src/mockData/tasksMocks";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    back: jest.fn(),
  })),
}));

describe("TaskCard", () => {
  it("Renders task title", () => {
    render(<TaskCard task={taskMock} />);

    const textElement = screen.getByTestId("tc-title");

    expect(textElement).toHaveTextContent(taskMock.title);
  });

  it("Renders task description", () => {
    render(<TaskCard task={taskMock} />);

    const textElement = screen.getByTestId("tc-desc");

    expect(textElement).toHaveTextContent(taskMock.description);
  });
});
