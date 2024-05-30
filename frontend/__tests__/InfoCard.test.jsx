import { render, screen } from "@testing-library/react";
import InfoCard from "../src/components/home/CardsSection/InfoCard";
import { CiUser } from "react-icons/ci";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    back: jest.fn(),
  })),
}));

const infoCardProps = {
  color: "#fff",
  Icon: CiUser,
  title: "Title",
  description: "Description",
};

describe("InfoCard", () => {
  it("Renders task title", () => {
    render(<InfoCard {...infoCardProps} />);

    const textElement = screen.getByTestId("ic-title");

    expect(textElement).toHaveTextContent(infoCardProps.title);
  });

  it("Renders task description", () => {
    render(<InfoCard {...infoCardProps} />);

    const textElement = screen.getByTestId("ic-desc");

    expect(textElement).toHaveTextContent(infoCardProps.description);
  });
});
