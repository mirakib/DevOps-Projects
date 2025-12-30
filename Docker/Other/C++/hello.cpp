#include <iostream>
#include <unistd.h>

int main() {
    std::string name;
    int number;

    std::cout << "Enter your name: ";
    std::cin >> name;

    std::cout << "Enter a number: ";
    std::cin >> number;

    std::cout << "\nHello, " << name << std::endl;
    std::cout << "Square of " << number << " is: " << number * number << std::endl;
    std::cout << "Running inside container with PID: " << getpid() << std::endl;

    return 0;
}
