# as --32 -o math.o math.s
# ld -m elf_i386 -o math math.o
# ./main
# echo $?

.section .text
.globl _start

# (6 - 3) + (9 - 3) * 6 = 39
_start:
        push %ebp
        movl %esp, %ebp

        subl $4, %esp

        # SUB
        movl $6, %eax
        subl $3, %eax
        movl %eax, -4(%ebp)

        # SUB
        movl $9, %eax
        subl $3, %eax

        # MULT
        imull $6, %eax
        addl -4(%ebp), %eax

        addl $4, %esp

        mov %eax, %ebx
        movl $1, %eax
        int $0x80
