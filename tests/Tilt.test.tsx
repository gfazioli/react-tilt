import { describe, expect, it, vi } from "vitest";
import { act } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { Tilt } from "../src";

describe("Tilt", () => {
  it("renders without crashing", () => {
    const { container } = render(
      <Tilt>
        <div>Test</div>
      </Tilt>,
    );
    expect(container).toBeTruthy();
  });

  it("renders children correctly", () => {
    render(
      <Tilt>
        <span data-testid="child">Hello</span>
      </Tilt>,
    );
    expect(screen.getByTestId("child")).toHaveTextContent("Hello");
  });

  it("renders multiple children", () => {
    render(
      <Tilt>
        <span data-testid="first">First</span>
        <span data-testid="second">Second</span>
      </Tilt>,
    );
    expect(screen.getByTestId("first")).toBeInTheDocument();
    expect(screen.getByTestId("second")).toBeInTheDocument();
  });

  it("applies default transform with initial values", () => {
    const { container } = render(
      <Tilt>
        <div>Test</div>
      </Tilt>,
    );
    const root = container.querySelector('[class*="root"]') as HTMLElement;
    expect(root?.style.transform).toContain("perspective(1000px)");
    expect(root?.style.transform).toContain("rotateX(0deg)");
    expect(root?.style.transform).toContain("rotateY(0deg)");
    expect(root?.style.transform).toContain("rotateZ(0deg)");
    expect(root?.style.transform).toContain("skewX(0deg)");
    expect(root?.style.transform).toContain("skewY(0deg)");
  });

  it("applies custom initial rotation values", () => {
    const { container } = render(
      <Tilt initialRotationX={15} initialRotationY={30} initialRotationZ={45}>
        <div>Test</div>
      </Tilt>,
    );
    const root = container.querySelector('[class*="root"]') as HTMLElement;
    expect(root?.style.transform).toContain("rotateX(15deg)");
    expect(root?.style.transform).toContain("rotateY(30deg)");
    expect(root?.style.transform).toContain("rotateZ(45deg)");
  });

  it("applies custom skew values", () => {
    const { container } = render(
      <Tilt initialSkewX={10} initialSkewY={20}>
        <div>Test</div>
      </Tilt>,
    );
    const root = container.querySelector('[class*="root"]') as HTMLElement;
    expect(root?.style.transform).toContain("skewX(10deg)");
    expect(root?.style.transform).toContain("skewY(20deg)");
  });

  it("sets perspective to none when initialPerspective >= 10000", () => {
    const { container } = render(
      <Tilt initialPerspective={10000}>
        <div>Test</div>
      </Tilt>,
    );
    const root = container.querySelector('[class*="root"]') as HTMLElement;
    expect(root?.style.transform).toContain("perspective(none)");
  });

  it("sets perspective value when initialPerspective < 10000", () => {
    const { container } = render(
      <Tilt initialPerspective={500}>
        <div>Test</div>
      </Tilt>,
    );
    const root = container.querySelector('[class*="root"]') as HTMLElement;
    expect(root?.style.transform).toContain("perspective(500px)");
  });

  it("applies backgroundImage as url()", () => {
    const { container } = render(
      <Tilt backgroundImage="https://example.com/image.png">
        <div>Test</div>
      </Tilt>,
    );
    const root = container.querySelector('[class*="root"]') as HTMLElement;
    expect(root?.style.backgroundImage).toBe('url("https://example.com/image.png")');
  });

  it("does not apply backgroundImage when not provided", () => {
    const { container } = render(
      <Tilt>
        <div>Test</div>
      </Tilt>,
    );
    const root = container.querySelector('[class*="root"]') as HTMLElement;
    expect(root?.style.backgroundImage).toBe("");
  });

  it("renders light effect div when lightEffect is true", () => {
    const { container } = render(
      <Tilt lightEffect>
        <div>Test</div>
      </Tilt>,
    );
    const lightDiv = container.querySelector("[data-tilt-light]");
    expect(lightDiv).toBeInTheDocument();
  });

  it("does not render light effect div when lightEffect is false", () => {
    const { container } = render(
      <Tilt lightEffect={false}>
        <div>Test</div>
      </Tilt>,
    );
    const lightDiv = container.querySelector("[data-tilt-light]");
    expect(lightDiv).not.toBeInTheDocument();
  });

  it("light overlay sets zIndex to 1", () => {
    const { container } = render(
      <Tilt lightEffect lightOverlay>
        <div>Test</div>
      </Tilt>,
    );
    const lightDiv = container.querySelector("[data-tilt-light]") as HTMLElement;
    expect(lightDiv?.style.zIndex).toBe("1");
  });

  it("light without overlay sets zIndex to -1", () => {
    const { container } = render(
      <Tilt lightEffect lightOverlay={false}>
        <div>Test</div>
      </Tilt>,
    );
    const lightDiv = container.querySelector("[data-tilt-light]") as HTMLElement;
    expect(lightDiv?.style.zIndex).toBe("-1");
  });

  it("applies preserve-3d transformStyle on card", () => {
    const { container } = render(
      <Tilt>
        <div>Test</div>
      </Tilt>,
    );
    const root = container.querySelector('[class*="root"]') as HTMLElement;
    expect(root?.style.transformStyle).toBe("preserve-3d");
  });

  it("applies default background position when backgroundParallax is false", () => {
    const { container } = render(
      <Tilt backgroundImage="https://example.com/img.png" backgroundParallax={false}>
        <div>Test</div>
      </Tilt>,
    );
    const root = container.querySelector('[class*="root"]') as HTMLElement;
    expect(root?.style.backgroundPosition).toBe("center center");
  });

  it("sets display name", () => {
    expect(Tilt.displayName).toBe("Tilt");
  });

  it("has classes property", () => {
    expect(Tilt.classes).toBeDefined();
  });

  it("passes additional props to the inner card", () => {
    const { container } = render(
      <Tilt data-testid="tilt-root" aria-label="tilt">
        <div>Test</div>
      </Tilt>,
    );
    const root = container.querySelector('[data-testid="tilt-root"]');
    expect(root).toBeInTheDocument();
    expect(root).toHaveAttribute("aria-label", "tilt");
  });

  it("registers mouse event handlers on outer wrapper", () => {
    const { container } = render(
      <Tilt>
        <div>Test</div>
      </Tilt>,
    );
    const outerBox = container.firstElementChild as HTMLElement;
    expect(() => {
      act(() => {
        fireEvent.mouseEnter(outerBox);
      });
      act(() => {
        fireEvent.mouseLeave(outerBox);
      });
    }).not.toThrow();
  });

  it("does not activate hover when disabled", () => {
    const { container } = render(
      <Tilt disabled>
        <div>Test</div>
      </Tilt>,
    );
    const outerBox = container.firstElementChild as HTMLElement;

    act(() => {
      fireEvent.mouseEnter(outerBox);
    });
    const root = container.querySelector('[class*="root"]') as HTMLElement;
    expect(root?.style.transition).toBe(
      "transform 300ms ease-out, background-position 300ms ease-out",
    );
  });

  it("renders with contentParallax without crashing", () => {
    const { container } = render(
      <Tilt contentParallax contentParallaxDistance={2}>
        <span>Child 1</span>
        <span>Child 2</span>
      </Tilt>,
    );
    expect(container).toBeTruthy();
  });

  it("applies width and height to outer wrapper", () => {
    const { container } = render(
      <Tilt w={300} h={200}>
        <div>Test</div>
      </Tilt>,
    );
    const outerBox = container.firstElementChild as HTMLElement;
    expect(outerBox.style.width).toBe("300px");
    expect(outerBox.style.height).toBe("200px");
  });

  it("registers touch event handlers on outer wrapper", () => {
    const { container } = render(
      <Tilt>
        <div>Test</div>
      </Tilt>,
    );
    const outerBox = container.firstElementChild as HTMLElement;
    expect(() => {
      act(() => {
        fireEvent.touchStart(outerBox);
      });
      act(() => {
        fireEvent.touchEnd(outerBox);
      });
    }).not.toThrow();
  });

  it("does not activate touch when touchEnabled is false", () => {
    const { container } = render(
      <Tilt touchEnabled={false}>
        <div>Test</div>
      </Tilt>,
    );
    const outerBox = container.firstElementChild as HTMLElement;

    act(() => {
      fireEvent.touchStart(outerBox);
    });
    const root = container.querySelector('[class*="root"]') as HTMLElement;
    expect(root?.style.transition).toBe(
      "transform 300ms ease-out, background-position 300ms ease-out",
    );
  });

  it("applies custom transitionDuration and transitionEasing", () => {
    const { container } = render(
      <Tilt transitionDuration={500} transitionEasing="cubic-bezier(0.4, 0, 0.2, 1)">
        <div>Test</div>
      </Tilt>,
    );
    const root = container.querySelector('[class*="root"]') as HTMLElement;
    expect(root?.style.transition).toBe(
      "transform 500ms cubic-bezier(0.4, 0, 0.2, 1), background-position 500ms cubic-bezier(0.4, 0, 0.2, 1)",
    );
  });

  it("applies default hoverScale of 1 (no scale in transform)", () => {
    const { container } = render(
      <Tilt>
        <div>Test</div>
      </Tilt>,
    );
    const root = container.querySelector('[class*="root"]') as HTMLElement;
    expect(root?.style.transform).not.toContain("scale");
  });

  it("does not call onRotationChange on mount", () => {
    const onRotationChange = vi.fn();
    render(
      <Tilt onRotationChange={onRotationChange}>
        <div>Test</div>
      </Tilt>,
    );
    expect(onRotationChange).not.toHaveBeenCalled();
  });

  it("has Layer static property", () => {
    expect(Tilt.Layer).toBeDefined();
    expect(Tilt.Layer.displayName).toBe("TiltLayer");
  });

  it("renders Tilt.Layer inside Tilt", () => {
    const { container } = render(
      <Tilt>
        <Tilt.Layer depth={2}>
          <span data-testid="layer-child">Layer content</span>
        </Tilt.Layer>
      </Tilt>,
    );
    expect(screen.getByTestId("layer-child")).toHaveTextContent("Layer content");
    expect(container).toBeTruthy();
  });

  it("renders multiple Tilt.Layer with different depths", () => {
    render(
      <Tilt>
        <Tilt.Layer depth={1}>
          <span data-testid="layer-1">Layer 1</span>
        </Tilt.Layer>
        <Tilt.Layer depth={3}>
          <span data-testid="layer-2">Layer 2</span>
        </Tilt.Layer>
      </Tilt>,
    );
    expect(screen.getByTestId("layer-1")).toBeInTheDocument();
    expect(screen.getByTestId("layer-2")).toBeInTheDocument();
  });

  it("light effect div persists after mouse enter and leave", () => {
    const { container } = render(
      <Tilt lightEffect>
        <div>Test</div>
      </Tilt>,
    );
    const outerBox = container.firstElementChild as HTMLElement;

    act(() => {
      fireEvent.mouseEnter(outerBox);
    });
    act(() => {
      fireEvent.mouseLeave(outerBox);
    });

    const lightDiv = container.querySelector("[data-tilt-light]");
    expect(lightDiv).toBeInTheDocument();
  });

  it("Tilt.Layer throws when used outside Tilt", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => {
      render(
        <Tilt.Layer depth={1}>
          <div>Orphan</div>
        </Tilt.Layer>,
      );
    }).toThrow(/Tilt\.Layer must be used within a Tilt component/);
    consoleSpy.mockRestore();
  });

  it("applies boxShadow when shadowEffect is true", () => {
    const { container } = render(
      <Tilt shadowEffect shadowColor="rgba(0,0,0,0.5)" shadowBlur={20}>
        <div>Test</div>
      </Tilt>,
    );
    const root = container.querySelector('[class*="root"]') as HTMLElement;
    expect(root?.style.boxShadow).toContain("20px");
    expect(root?.style.boxShadow).toContain("rgba(0,0,0,0.5)");
  });

  it("does not apply boxShadow when shadowEffect is false", () => {
    const { container } = render(
      <Tilt>
        <div>Test</div>
      </Tilt>,
    );
    const root = container.querySelector('[class*="root"]') as HTMLElement;
    expect(root?.style.boxShadow).toBe("");
  });

  it("renders glare div when glareEffect is true", () => {
    const { container } = render(
      <Tilt glareEffect>
        <div>Test</div>
      </Tilt>,
    );
    const glareDiv = container.querySelector("[data-tilt-glare]");
    expect(glareDiv).toBeInTheDocument();
  });

  it("does not render glare div when glareEffect is false", () => {
    const { container } = render(
      <Tilt>
        <div>Test</div>
      </Tilt>,
    );
    const glareDiv = container.querySelector("[data-tilt-glare]");
    expect(glareDiv).not.toBeInTheDocument();
  });

  it("glare overlay sets zIndex to 2", () => {
    const { container } = render(
      <Tilt glareEffect glareOverlay>
        <div>Test</div>
      </Tilt>,
    );
    const glareDiv = container.querySelector("[data-tilt-glare]") as HTMLElement;
    expect(glareDiv?.style.zIndex).toBe("2");
  });

  it("glare without overlay sets zIndex to -1", () => {
    const { container } = render(
      <Tilt glareEffect glareOverlay={false}>
        <div>Test</div>
      </Tilt>,
    );
    const glareDiv = container.querySelector("[data-tilt-glare]") as HTMLElement;
    expect(glareDiv?.style.zIndex).toBe("-1");
  });

  it("disables CSS transition on transform when springEffect is true", () => {
    const { container } = render(
      <Tilt springEffect>
        <div>Test</div>
      </Tilt>,
    );
    const root = container.querySelector('[class*="root"]') as HTMLElement;
    expect(root?.style.transition || "").not.toContain("transform 300ms");
  });

  it("adds tabIndex when keyboardEnabled is true", () => {
    const { container } = render(
      <Tilt keyboardEnabled>
        <div>Test</div>
      </Tilt>,
    );
    const el = container.querySelector("[tabindex]");
    expect(el).toBeTruthy();
    expect(el?.getAttribute("tabindex")).toBe("0");
  });

  it("does not add tabIndex when keyboardEnabled is false", () => {
    const { container } = render(
      <Tilt>
        <div>Test</div>
      </Tilt>,
    );
    const el = container.querySelector('[tabindex="0"]');
    expect(el).toBeNull();
  });

  it("adds ARIA attributes when keyboardEnabled is true", () => {
    const { container } = render(
      <Tilt keyboardEnabled>
        <div>Test</div>
      </Tilt>,
    );
    const el = container.querySelector('[role="group"]');
    expect(el).toBeTruthy();
    expect(el?.getAttribute("aria-roledescription")).toBe("tilt card");
    expect(el?.getAttribute("aria-label")).toContain("arrow keys");
  });

  it("does not add ARIA attributes when keyboardEnabled is false", () => {
    const { container } = render(
      <Tilt>
        <div>Test</div>
      </Tilt>,
    );
    const el = container.querySelector('[role="group"]');
    expect(el).toBeNull();
  });

  it("forwards ref to outer wrapper", () => {
    let captured: HTMLDivElement | null = null;
    render(
      <Tilt
        ref={(el) => {
          captured = el;
        }}
      >
        <div>Test</div>
      </Tilt>,
    );
    expect(captured).not.toBeNull();
    expect(captured!.tagName).toBe("DIV");
  });

  it("applies radius via --rtilt-radius custom property", () => {
    const { container } = render(
      <Tilt radius={12}>
        <div>Test</div>
      </Tilt>,
    );
    const root = container.querySelector('[class*="root"]') as HTMLElement;
    expect(root.style.getPropertyValue("--rtilt-radius")).toBe("12px");
  });

  it("passes string radius through unchanged", () => {
    const { container } = render(
      <Tilt radius="1rem">
        <div>Test</div>
      </Tilt>,
    );
    const root = container.querySelector('[class*="root"]') as HTMLElement;
    expect(root.style.getPropertyValue("--rtilt-radius")).toBe("1rem");
  });
});
