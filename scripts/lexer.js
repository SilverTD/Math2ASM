class Lexer {
	constructor(expression) {
		this.expression = expression;
		this.tokens = [];
	}

	#is_digit(c) {
		return c >= '0' && c <= '9';
	}

	lexer() {
		for (let i = 0; i < this.expression.length; ++i) {
			const c = this.expression[i];
			switch (c) {
				case '\n':
				case ' ':
				case '\t':
					break;
				default:	
					let number = "";
					if (this.#is_digit(c)) {
						while (this.#is_digit(this.expression[i])) {
							number += this.expression[i];
							++i;
						}
						--i;
						this.tokens.push({type: "Integer", value: parseInt(number)});
						break;
					}
					else if (c == '(') this.tokens.push({type: TOKEN.LPAREN});
					else if (c == ')') this.tokens.push({type: TOKEN.RPAREN});
					else if (c == '+') this.tokens.push({type: TOKEN.ADD, operator: c});
					else if (c == '-') this.tokens.push({type: TOKEN.SUB, operator: c});
					else if (c == '*') this.tokens.push({type: TOKEN.MULT, operator: c});
					else if (c == '/') this.tokens.push({type: TOKEN.DIV, operator: c});
					else throw Error("Invalid token");
					break;
			}
		}
		this.tokens.push({type: TOKEN.EOF});
		return this.tokens;
	}
}
