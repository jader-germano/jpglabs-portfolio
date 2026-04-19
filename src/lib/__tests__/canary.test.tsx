import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

describe("Vitest baseline canary", () => {
  it("arithmetic works", () => {
    expect(1 + 1).toBe(2);
  });

  it("jsdom + React Testing Library renders", () => {
    render(<h1>jpglabs</h1>);
    expect(screen.getByRole("heading", { name: "jpglabs" })).toBeInTheDocument();
  });

  it("env is test", () => {
    expect(import.meta.env.MODE).toBe("test");
  });
});
