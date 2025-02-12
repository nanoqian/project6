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

    test("whitespace is empty", () => {
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

    test("digits are digits", () => {
        const digits: p6.Digit[] = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
        digits.map((digit) => {
            expect(p6.isDigit(digit)).toEqual(p6.tagDigit(digit));
        });
    });

    test("non-digits are digits", () => {
        ["00", "1a", "234", "*", "/", "sqrt", "654", "77", "a8", ""].map((digit) => {
            expect(p6.isDigit(digit)).toBeUndefined();
        });
    });

    test("digits concatenate", () => {
        const lists: p6.Digit[][] = [["0", "1", "2"], ["5", "0", "0"], ["0", "0"]];
        lists.map((digits) => {
            expect(p6.concatDigits(digits.map(p6.tagDigit))).toBe(digits.join(""));
        });
    });

    test("integers tokenize", () => {
        expect(p6.tokenize("1234 033 00009")).toEqual([1234, 33, 9].map(p6.tagNumber));
    });

    test("decimals tokenize", () => {
        expect(p6.tokenize("12.034 .03300 010.")).toEqual([12.034, 0.033, 10].map(p6.tagNumber));
    });

    test("lone period errors", () => {
        expect(p6.tokenize("55.0. 00")).toBe("\".\" not a valid input");
    });

    test("numbers tokenize with everything else", () => {
        expect(p6.tokenize(".5sincos    pi100.e sqrt56   .5")).toEqual([
            p6.tagNumber(0.5), p6.tagOperation("sin"), p6.tagOperation("cos"),
            p6.tagConstant("pi"), p6.tagNumber(100), p6.tagConstant("e"),
            p6.tagOperation("sqrt"), p6.tagNumber(56), p6.tagNumber(0.5)
        ]);
    });

    test("non-names error", () => {
        expect(p6.tokenize("sqrthi")).toBe("\"hi\" not a valid input");
    });
});
