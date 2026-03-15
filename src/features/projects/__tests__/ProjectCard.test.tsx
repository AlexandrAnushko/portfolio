import { fireEvent, render, screen } from "@testing-library/react";
import { ProjectCard } from "../ProjectCard";
import { PROJECTS } from "../projectsData";

const defaultProps = {
  project: PROJECTS[0],
  isPriority: false,
};

describe("ProjectCard", () => {
  it("renders loading overlay when isNavigating true", () => {
    render(<ProjectCard {...defaultProps} />);
    const link = screen.getByTestId("project-card-link");
    fireEvent.click(link);
    const loader = screen.getByText("Loading…");
    expect(loader).toBeInTheDocument();
  });
});
