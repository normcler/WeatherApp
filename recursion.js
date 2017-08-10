factorial = function (n) {
    if (n < 1) {
        factorial(n-1);
    }
    value = n * (n+1);
    return value;
    console.log(value);
}
