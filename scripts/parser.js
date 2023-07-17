class Parser {
	constructor(tokens) {
		this.tokens = tokens;
		this.cursor = 0;
		this.current_token = this.tokens[this.cursor];
	}

	parse() {
		return this.#parse_expr();
	}

	#parse_eat(token_type) {
		if (this.current_token.type == token_type) {
			++this.cursor;
			this.current_token = this.tokens[this.cursor];
			return this.current_token;
		} else {
			throw Error("Invalid token");
		}
	}

	// Plus / Minus
	#parse_expr() {
		let left = this.#parse_term();

		while (
			this.current_token.type == TOKEN.ADD ||
			this.current_token.type == TOKEN.SUB
		) {
			const operator = this.current_token.type;
			this.#parse_eat(this.current_token.type);
			let right = this.#parse_term();
			left = {type: AST.BinaryOperator, operator, left, right};
		}
		return left;
	}

	// Mult / Div
	#parse_term() {
		let left = this.#parse_factor();
		
		while (
			this.current_token.type == TOKEN.MULT ||
			this.current_token.type == TOKEN.DIV
		) {
			const operator = this.current_token.type;
			this.#parse_eat(this.current_token.type);
			let right = this.#parse_factor();
			left = {type: AST.BinaryOperator, operator, left, right};
		}
		
		return left;
	}

	// Precedence
	#parse_factor() {
		let literal;
		if (this.current_token.type == "Integer") {
			literal = { type: AST.NumberLiteral, value: this.current_token.value };
			this.#parse_eat(this.current_token.type);
			return literal;	
		}
		else if (this.current_token.type == TOKEN.LPAREN) {
			this.#parse_eat(TOKEN.LPAREN);
			literal = this.#parse_expr();
			this.#parse_eat(TOKEN.RPAREN);
			return literal;
		}
	}
}
