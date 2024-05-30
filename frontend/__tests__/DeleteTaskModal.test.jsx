import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import DeleteTaskModal from "../src/components/todo/DeleteTaskModal/DeleteTaskModal";
import { taskMock } from "../src/mockData/tasksMocks";
import { useState } from "react";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    back: jest.fn(),
  })),
}));

const TestModal = ({ initialState }) => {
  const [open, setOpen] = useState(initialState);

  return (
    <>
      <button data-testid="open-modal-btn" onClick={() => setOpen(true)}>
        Open
      </button>
      <DeleteTaskModal
        task={taskMock}
        open={open}
        handleClose={() => setOpen(false)}
      />
    </>
  );
};

describe("DeleteTaskModal", () => {
  it("Renders modal when opened", () => {
    render(
      <DeleteTaskModal task={taskMock} open={true} handleClose={() => {}} />
    );

    const modal = screen.queryByTestId("delete-modal");

    expect(modal).toBeInTheDocument();
  });

  it("Does not renders modal when closed", () => {
    render(
      <DeleteTaskModal task={taskMock} open={false} handleClose={() => {}} />
    );

    const modal = screen.queryByTestId("delete-modal");

    expect(modal).not.toBeInTheDocument();
  });

  it("Opens when open btn is clicked", async () => {
    render(<TestModal initialState={false} />);

    let modal = screen.queryByTestId("delete-modal");

    expect(modal).not.toBeInTheDocument();

    fireEvent.click(screen.getByTestId("open-modal-btn"));

    modal = await screen.findByTestId("delete-modal");
    expect(modal).toBeInTheDocument();
  });

  it("Closes when cancel btn is clicked", async () => {
    render(<TestModal initialState={true} />);

    let modal = screen.queryByTestId("delete-modal");

    expect(modal).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("dm-cancel-btn"));

    await waitFor(() => {
      modal = screen.queryByTestId("delete-modal");
      expect(modal).not.toBeInTheDocument();
    });
  });
});
