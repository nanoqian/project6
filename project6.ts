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

export type TokenUnion =
    | number | Bracket | Constant | Operation

export interface Tag<T extends TokenUnion> {
    kind: T extends number ? "number"
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

export function tokenize(input: string): Token[] | string {
    let tokens = [];
    let chunk = "";
    for (let i = 0; i < input.length; i++) {
        if (input[i] === " ") {
            chunk = "";
        } else {
            chunk = chunk.concat(input[i]);
            const token = isBracket(chunk) ?? isConstant(chunk) ?? isOperation(chunk);
            if (token !== undefined) {
                tokens.push(token);
                chunk = "";
            }
        }
    }
    return tokens;
}

export function parse(input: Token[]): Expression | string {
    return "not implemented";
}

export function interpret(expression: Expression): number | string {
    return "not implemented";
}
