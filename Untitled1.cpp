#include <stdio.h>
int main(){
	int a = 10;
	int *p;
	int **q;
	int ***x;
	p = &a;
	q = &p;
	x = &q;
	printf("%d \n", x);
	printf("%d", &q);
}
