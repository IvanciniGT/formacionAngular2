import { Component } from '@angular/core';

// Define an interface
interface MyInterface {
  someMethod(): void;
}

// Implement the interface in a component
@Component({
  selector: 'app-my-component',
  template: '<div>{{ someProperty }}</div>',
})
export class MyComponent implements MyInterface {
  someProperty: string;

  constructor() {
    this.someProperty = 'Hello from MyComponent';
  }

  someMethod(): void {
    console.log('someMethod() implementation in MyComponent');
  }
}
