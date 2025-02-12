export type Constant =
    | "pi" | "e"

export type UnaryOperation =
    | "-" | "sqrt" | "log" | "ln" | "!"
    | "sin" | "cos" | "tan" | "sec" | "csc" | "cot"

export type BinaryOperation =
    | "+" | "-" | "*" | "/" | "^"

export type Operation =
    | UnaryOperation | BinaryOperation

export type Bracket =
    | "(" | ")" | "[" | "]" | "{" | "}"

export type Digit =
    | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"

export type TokenUnion =
    | number | Bracket | Constant | Operation

export interface Tag<T extends TokenUnion | Digit> {
    kind: T extends number ? "number"
          : T extends Digit ? "digit"
          : T extends Bracket ? "bracket"
          : T extends Constant ? "constant"
          : T extends Operation ? "operation"
          : never;
    value: T;
}

export type Token = Tag<TokenUnion>

export type Expression =
    | { kind: "number"; value: number }
    | { kind: "constant"; value: Constant }
    | { kind: "unary"; operation: UnaryOperation; operand: Expression }
    | { kind: "binary"; operation: BinaryOperation; operand1: Expression; operand2: Expression }

export function tagNumber(value: number): Tag<number> {
    return { kind: "number", value };
}

export function tagDigit(value: Digit): Tag<Digit> {
    return { kind: "digit", value };
}

export function tagBracket(value: Bracket): Tag<Bracket> {
    return { kind: "bracket", value };
}

export function tagConstant(value: Constant): Tag<Constant> {
    return { kind: "constant", value };
}

export function tagOperation(value: Operation): Tag<Operation> {
    return { kind: "operation", value }
}

export function isBracket(input: string): Tag<Bracket> | undefined {
    switch (input) {
        case "(":
        case ")":
        case "[":
        case "]":
        case "{":
        case "}":
            return tagBracket(input);
        default:
            return;
    }
}

export function isConstant(input: string): Tag<Constant> | undefined {
    switch (input) {
        case "pi":
        case "e":
            return tagConstant(input);
        default:
            return;
    }
}

export function isOperation(input: string): Tag<Operation> | undefined {
    switch (input) {
        case "+":
        case "-":
        case "*":
        case "/":
        case "^":
        case "sqrt":
        case "log":
        case "ln":
        case "!":
        case "sin":
        case "cos":
        case "tan":
        case "sec":
        case "csc":
        case "cot":
            return tagOperation(input);
        default:
            return;
    }
}

export function isDigit(input: string): Tag<Digit> | undefined {
    switch (input) {
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
            return tagDigit(input);
        default:
            return;
    }
}

export function concatDigits(digits: Tag<Digit>[]): string {
    return digits.map((digit) => digit.value).join("");
}

class Tokenizer {
    readonly input: string = "";
    index: number = 0;

    constructor(input: string) {
        this.input = input;
    }

    run(): Token[] | string {
        let tokens = [];
        while (this.index < this.input.length) {
            const char = this.input[this.index];
            if (char === " ") {
                this.index++;
            } else if (isDigit(char) || char === ".") {
                const number = this.matchNumber();
                if (number !== undefined) {
                    if (typeof number === "string") {
                        return number;
                    } else {
                        tokens.push(number);
                    }
                }
            } else {
                const token = this.matchName();
                if (token !== undefined) {
                    if (typeof token === "string") {
                        return token;
                    } else {
                        tokens.push(token);
                    }
                }
            }
        }
        return tokens;
    }

    matchName(): Tag<Bracket | Constant | Operation> | string {
        let chunk = "";
        while (this.index < this.input.length) {
            chunk = chunk.concat(this.input[this.index]);
            if (chunk.length > 4) {
                break;
            }
            this.index++;

            const token = isBracket(chunk) ?? isConstant(chunk) ?? isOperation(chunk);
            if (token !== undefined) {
                return token;
            }
        }
        return "\"" + chunk + "\" not a valid input";
    }

    matchInteger(): Tag<Digit>[] {
        let digits: Tag<Digit>[] = [];
        while (this.index < this.input.length) {
            const digit = isDigit(this.input[this.index]);
            if (digit !== undefined) {
                digits.push(digit);
                this.index++;
            } else {
                break;
            }
        }
        return digits;
    }

    matchNumber(): Tag<number> | string {
        const integer = this.matchInteger();
        let decimal = [];
        if (this.input[this.index] == ".") {
            this.index++;
            decimal = this.matchInteger();
        }
        if (integer.length !== 0 || decimal.length !== 0) {
            return tagNumber(parseFloat(concatDigits(integer) + "." + (concatDigits(decimal))));
        } else {
            return "\".\" not a valid input";
        }
    }
}

export function tokenize(input: string): Token[] | string {
    return new Tokenizer(input).run();
}

export function parse(input: Token[]): Expression | string {
    return "not implemented";
}

export function interpret(expression: Expression): number | string {
    return "not implemented";
}
