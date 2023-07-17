const operators = {
	[TOKEN.ADD]:	(a, b) => a + b,
	[TOKEN.SUB]:	(a, b) => a - b,
	[TOKEN.MULT]:	(a, b) => a * b,
	[TOKEN.DIV]:	(a, b) => a / b,
}

class Visitor {
	constructor(AST) {
		this.AST = AST;
	}

	#visit_node(node) {
		switch (node.type) {
			case AST.BinaryOperator:
				return operators[node.operator](
					this.#visit_node(node.left),
					this.#visit_node(node.right)
				);
			case AST.NumberLiteral:
				return node.value;
		}
	}

	visit() {
		return this.#visit_node(ast);
	}
}
