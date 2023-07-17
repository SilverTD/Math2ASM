# as --32 -o math.o math.s
# ld -m elf_i386 -o math math.o
# ./main
# echo $?

.section .text
.globl main

main:
	push %ebp
	movl %esp, %ebp

	subl $16, %esp

	# SUB
	pushl $2
	pushl $1
	popl %eax
	subl %eax, (%esp)
	movl %eax, -12(%ebp)

	# ADD
	pushl $9
	pushl $3
	popl %eax
	addl (%esp), %eax

	# MULT
	imull $6, %eax
	addl -12(%ebp), %eax

	# ADD
	addl $9, %eax
	movl %eax, -16(%ebp)

	# ADD
	pushl $10
	pushl $1
	popl %eax
	addl (%esp), %eax

	# MULT
	imull $10, %eax
	addl -16(%ebp), %eax

	addl $16, %esp

	mov %eax, %ebx
	movl $1, %eax
	int $0x80
