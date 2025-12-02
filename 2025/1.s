.global _start

.section .data
msg:    .ascii "Hello from RISC-V!\n"
len = . - msg

.section .text
_start:
    # 1. Write to stdout
    li a7, 64       # syscall: write
    li a0, 1        # file descriptor: stdout
    la a1, msg      # address of string
    li a2, len      # length of string
    ecall

    # 2. Exit program
    li a7, 93       # syscall: exit
    li a0, 0        # exit code
    ecall
