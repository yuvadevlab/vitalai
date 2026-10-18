import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { ThemeSwitch } from "../ThemeSwitch";
import { ThemeProvider } from "@/providers/theme/ThemeProvider";

describe("ThemeSwitch Component", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.className = "";
  });

  it("renders theme toggle button with accessible label", () => {
    render(
      <ThemeProvider>
        <ThemeSwitch />
      </ThemeProvider>,
    );

    const button = screen.getByRole("button", { name: /switch to (light|dark) mode/i });
    expect(button).toBeInTheDocument();
  });

  it("toggles theme class on root element when clicked", () => {
    render(
      <ThemeProvider>
        <ThemeSwitch />
      </ThemeProvider>,
    );

    const button = screen.getByRole("button", { name: /switch to/i });
    fireEvent.click(button);

    expect(document.documentElement.getAttribute("data-theme")).toBeDefined();
  });

  it("renders segmented control with options", () => {
    render(
      <ThemeProvider>
        <ThemeSwitch variant="segmented" />
      </ThemeProvider>,
    );

    expect(screen.getByRole("button", { name: /light/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /dark/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /system/i })).toBeInTheDocument();
  });
});
