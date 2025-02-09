export type Constant =
    | "pi" | "e"

export type UnaryOperation =
    | "-" | "sqrt" | "log" | "ln" | "!"
    | "sin" | "cos" | "tan" | "sec" | "csc" | "cot"

export type BinaryOperation =
    | "+" | "-" | "*" | "/" | "^"

export type Token =
    | number | Constant | UnaryOperation | BinaryOperation
    | "(" | ")" | "[" | "]" | "{" | "}"

export type Expression =
    | { kind: "number"; value: number }
    | { kind: "constant"; value: Constant }
    | { kind: "unary"; operation: UnaryOperation; operand: Expression }
    | { kind: "binary"; operation: BinaryOperation; operand1: Expression; operand2: Expression }

export function tokenize(input: string): Token[] | string {
    return "not implemented";
}

export function parse(input: Token[]): Expression | string {
    return "not implemented";
}

export function interpret(expression: Expression): number | string {
    return "not implemented";
}
