import * as p6 from "../project6";

describe("tokenize", () => {
    test ("empty is empty", () => {
        expect(p6.tokenize("")).toEqual([]);
    });

    test("brackets are brackets", () => {
        const brackets: p6.Bracket[] = ["(", ")", "[", "]", "{", "}"];
        brackets.map((bracket) => {
            expect(p6.isBracket(bracket)).toEqual(p6.tagBracket(bracket));
        });
    });

    test("non-brackets aren't brackets", () => {
        ["a", "1", "()", "*", "<"].map((bracket) => {
            expect(p6.isBracket(bracket)).toBeUndefined();
        });
    });

    test("brackets tokenize", () => {
        expect(p6.tokenize("[{)")).toEqual(["[", "{", ")"].map(p6.tagBracket));
    });

    test("binary operations are operations", () => {
        const operations: p6.BinaryOperation[] = ["+", "-", "*", "/", "^"];
        operations.map((operation) => {
            expect(p6.isOperation(operation)).toEqual(p6.tagOperation(operation));
        });
    });

    test ("brackets and binary operations tokenize", () => {
        expect(p6.tokenize("[+-}}//[[")).toEqual([
            p6.tagBracket("["), p6.tagOperation("+"), p6.tagOperation("-"),
            p6.tagBracket("}"), p6.tagBracket("}"), p6.tagOperation("/"),
            p6.tagOperation("/"), p6.tagBracket("["), p6.tagBracket("[")
        ]);
    });

    test("unary operations are operations", () => {
        const operations: p6.UnaryOperation[] =
            ["-", "sqrt", "log", "ln", "!", "sin", "cos", "tan", "sec", "csc", "cot"]
        operations.map((operation) => {
            expect(p6.isOperation(operation)).toEqual(p6.tagOperation(operation));
        });
    });

    test("non-operations aren't operations", () => {
        ["(", ")", "++", "[", "]", "{", "}", "l", "sqr"].map((operation) => {
            expect(p6.isOperation(operation)).toBeUndefined();
        });
    });

    test("unary operations tokenize", () => {
        expect(p6.tokenize("-sqrtsin!")).toEqual(["-", "sqrt", "sin", "!"].map(p6.tagOperation));
    });

    test("constants are constants", () => {
        ["pi", "e"].map((constant) => {
            expect(p6.isConstant(constant)).toEqual(p6.tagConstant(constant as p6.Constant));
        });
    });

    test("non-constants aren't constants", () => {
        ["(", ")", "[", "]", "ee", "pie", "+", "l", "sqrt"].map((constant) => {
            expect(p6.isConstant(constant)).toBeUndefined();
        });
    });

    test("constants tokenize", () => {
        expect(p6.tokenize("piepie")).toEqual(["pi", "e", "pi", "e"].map(p6.tagConstant));
    });

    test("whitespace isempty", () => {
        expect(p6.tokenize("     ")).toEqual([]);
    });

    test("whitespace between operations ignored", () => {
        ["pi sqrt++", "(  sincos  ^ [ln", "   sqrt ee+e  "].map((input) => {
            const input_no_whitespace = input.replace(/ /g, "");
            expect(p6.tokenize(input)).toEqual(p6.tokenize(input_no_whitespace));
        });
    });

    test("whitespace inside operations not ignored", () => {
        ["sq  rt", "(  si ncos  ^ [l n", "   sqr t ee+e  "].map((input) => {
            const input_no_whitespace = input.replace(/ /g, "");
            expect(p6.tokenize(input)).not.toEqual(p6.tokenize(input_no_whitespace));
        });
    });

    test("brackets, constants, and operations tokenize", () => {
        expect(p6.tokenize(" ][  sin  cos lnpi]-]++ { ")).toEqual([
            p6.tagBracket("]"), p6.tagBracket("["), p6.tagOperation("sin"),
            p6.tagOperation("cos"), p6.tagOperation("ln"), p6.tagConstant("pi"),
            p6.tagBracket("]"), p6.tagOperation("-"), p6.tagBracket("]"),
            p6.tagOperation("+"), p6.tagOperation("+"), p6.tagBracket("{")
        ]);
    });
});
