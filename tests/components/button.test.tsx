import {describe, it, expect, vi} from "vitest";
import {screen, render} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";
import {Button} from "@/components/ui/button";
import "@testing-library/jest-dom";


describe("components/ui/button", () => {
    it("renders a button", () => {
        render(
            <Button/>
        );

        const button = screen.getByRole("button");
        expect(button).toBeInTheDocument();
    });

    it("renders a text content", () => {
        render(
            <Button>
                test
            </Button>
        );

        const button = screen.getByRole("button");
        expect(button).toHaveTextContent("test");
    });

    it("renders a class name", () => {
        render(
            <Button
                className="test class"
            />
        );

        const button = screen.getByRole("button");
        expect(button).toHaveClass("class test");
    });

    describe("variants/size", () => {
        it.each`
            size         | className
            ${"default"} | ${"h-9 px-4 py-2"} 
            ${"lg"}      | ${"h-10 rounded-md px-6"} 
            ${"sm"}      | ${"h-8 rounded-md px-3"} 
            ${"icon"}    | ${"size-9"} 
        `("renders a button of $size size", ({
            size,
            className
        }) => {
            render(
                <Button
                    size={size}
                />
            );

            const button = screen.getByRole("button");
            expect(button).toHaveClass(className);
        });
    });

    it('handles click events', async () => {
        const handleClick = vi.fn();
        render(
            <Button
                onClick={handleClick}
            />
        );

        const button = screen.getByRole("button");
        await userEvent.click(button);
        expect(handleClick).toBeCalled();
    });

    describe("variants/variant", () => {
        it.each`
            variant      | className
            ${"default"} | ${"bg-primary text-primary-foreground"} 
        `("renders a button of $variant variant", ({
            variant,
            className
        }) => {
            render(
                <Button
                    variant={variant}
                />
            );

            const button = screen.getByRole("button");
            expect(button).toHaveClass(className);
        });
    });

});