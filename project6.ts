type Constant =
    | "pi" | "e"

type UnaryOperation =
    | "-" | "sqrt" | "log" | "ln" | "!"
    | "sin" | "cos" | "tan" | "sec" | "csc" | "cot"

type BinaryOperation =
    | "+" | "-" | "*" | "/" | "^"

type Token =
    | number | Constant | UnaryOperation | BinaryOperation
    | "(" | ")" | "[" | "]" | "{" | "}"

type Expression =
    | { kind: "number"; value: number }
    | { kind: "constant"; value: Constant }
    | { kind: "unary"; operation: UnaryOperation; operand: Expression }
    | { kind: "binary"; operation: BinaryOperation; operand1: Expression; operand2: Expression }

function tokenize(input: string): Token[] | string {
    return "not implemented";
}

function parse(input: Token[]): Expression | string {
    return "not implemented";
}

function interpret(expression: Expression): number | string {
    return "not implemented";
}
