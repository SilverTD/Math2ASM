# as --32 -o math.o math.s
# ld -m elf_i386 -o math math.o
# ./main
# echo $?

.section .text
.globl main

# (2 - 1) + (9 - 3) * 6 + 9 + 10 * (8 - 10) = 26
main:
	push %ebp
	movl %esp, %ebp

	subl $8, %esp

	# SUB
	movl $2, %eax
	subl $1, %eax
	movl %eax, -8(%ebp)

	# SUB
	movl $9, %eax
	subl $3, %eax

	# MULT
	imull $6, %eax
	addl -8(%ebp), %eax

	# ADD
	addl $9, %eax
	movl %eax, -8(%ebp)

	# SUB
	movl $8, %eax
	subl $10, %eax

	# MULT
	imull $10, %eax
	addl -8(%ebp), %eax

	addl $8, %esp

	mov %eax, %ebx
	movl $1, %eax
	int $0x80
