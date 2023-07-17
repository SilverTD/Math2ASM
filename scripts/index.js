const expression = "(2 - 1) + (9 + 3) * 6 + 9 + 10 * (10 + 1)";
const tokens = new Lexer(expression).lexer();
const ast = new Parser(tokens).parse();
const result = new Visitor(ast).visit();
console.log(result);

let stack_size = 1;
let store_address = [];

const asm_instruction = {
	"ADD": "addl",
	"SUB": "subl",
	"MULT": "imull",
	"DIV": "div"
};

function trim(str) {
	return str.replaceAll('\t', "").trim();
}

function test(ast) {	
	let root = ast;

	if (root.left.value && root.right.value) {
		++stack_size;
		const e = ([TOKEN.ADD, TOKEN.MULT, TOKEN.DIV].includes(root.operator)) ? `(%esp), %eax` : `%eax, (%esp)`;
		const code = trim(`
			# ${root.operator}
			pushl $${root.left.value}
			pushl $${root.right.value}
			popl %eax
			${asm_instruction[root.operator]} ${e}
		`);
		store_address.push((stack_size)*4);
		return code; 
	} else if (!root.left.value && root.right.value) {
		const left = test(root.left);
		const right = root.right.value;
		return trim(`
			${left}

			# ${root.operator}
			${asm_instruction[root.operator]} $${right}, %eax
		`);
	} else if (root.left.value && !root.right.value) {
		const left = root.left.value;
		const right = test(root.right);
		return trim(`
			${right}

			# ${root.operator}
			${asm_instruction[root.operator]} $${left}, %eax
		`);

	} else {
		const left = test(root.left);
		const right = test(root.right);
		return trim(`
			${left}
			movl %eax, -${(stack_size)*4}(%ebp)
			
			${right}
			${asm_instruction[root.operator]} -${store_address[store_address.length - 1]}(%ebp), %eax
		`);
	}
}

const asm_code = test(ast);
console.log(
	trim(
		`
		subl $${stack_size*4}, %esp
		
		${asm_code}

		addl $${stack_size*4}, %esp
		`
	)
);
