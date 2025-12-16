#include <stdio.h>
#include <stdlib.h>

int main(int argc, **char argv) {
    long t = 40;
    int a = (void *)t;
    printf("a:%d t: %d: &t:%d, *t%d", a, t, &t, t);
}
