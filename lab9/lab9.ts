// Задание 2: Класс User с интерфейсом
interface IUser {
    name: string;
    age: number;
    hello(): void;
}

class User implements IUser {
    name: string;
    age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    hello(): void {
        console.log(`Hi! My name is ${this.name}. And I am ${this.age} years old.`);
        const element = document.getElementById('task2Result');
        if (element) {
            element.textContent = `Hi! My name is ${this.name}. And I am ${this.age} years old.`;
        }
    }
}

function demoTask2(): void {
    const user = new User("Alice", 25);
    user.hello();
}

// Задание 3: Типизация через псевдонимы типов
type UserType = {
    name: string;
    age: number;
    hello(): void;
};

class UserWithType implements UserType {
    name: string;
    age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    hello(): void {
        console.log(`Hi! My name is ${this.name}. And I am ${this.age} years old.`);
        const element = document.getElementById('task3Result');
        if (element) {
            element.textContent = `Hi! My name is ${this.name}. And I am ${this.age} years old.`;
        }
    }
}

function demoTask3(): void {
    const user = new UserWithType("Bob", 30);
    user.hello();
}

// Задание 4: Перегруженная функция distance
type Point = {
    x: number;
    y: number;
};

function distance(x1: number, y1: number, x2: number, y2: number): number;
function distance(p1: Point, p2: Point): number;
function distance(a: number | Point, b: number | Point, c?: number, d?: number): number {
    if (typeof a === "number" && typeof b === "number" && typeof c === "number" && typeof d === "number") {
        return Math.sqrt((c - a) ** 2 + (d - b) ** 2);
    } else if (typeof a === "object" && typeof b === "object") {
        return Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2);
    }
    return 0;
}

function demoDistance1(): void {
    const result = distance(0, 0, 3, 4);
    const element = document.getElementById('distanceResult');
    if (element) {
        element.textContent = `distance(0, 0, 3, 4) = ${result}`;
    }
}

function demoDistance2(): void {
    const result = distance({ x: 0, y: 0 }, { x: 3, y: 4 });
    const element = document.getElementById('distanceResult');
    if (element) {
        element.textContent = `distance({x:0, y:0}, {x:3, y:4}) = ${result}`;
    }
}

// Задание 5: Бинарное дерево
class TreeNode<T> {
    value: T;
    left: TreeNode<T> | null;
    right: TreeNode<T> | null;

    constructor(value: T) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinaryTree<T> {
    root: TreeNode<T> | null;

    constructor() {
        this.root = null;
    }

    insert(value: T): void {
        const newNode = new TreeNode(value);
        if (this.root === null) {
            this.root = newNode;
            return;
        }
        let current = this.root;
        while (true) {
            if (value < current.value) {
                if (current.left === null) {
                    current.left = newNode;
                    return;
                }
                current = current.left;
            } else {
                if (current.right === null) {
                    current.right = newNode;
                    return;
                }
                current = current.right;
            }
        }
    }

    search(value: T): TreeNode<T> | null {
        let current = this.root;
        while (current !== null) {
            if (value === current.value) {
                return current;
            }
            if (value < current.value) {
                current = current.left;
            } else {
                current = current.right;
            }
        }
        return null;
    }

    delete(value: T): boolean {
        const found = this.search(value);
        if (found === null) {
            return false;
        }
        this.root = this.deleteNode(this.root, value);
        return true;
    }

    private deleteNode(node: TreeNode<T> | null, value: T): TreeNode<T> | null {
        if (node === null) {
            return null;
        }
        if (value < node.value) {
            node.left = this.deleteNode(node.left, value);
            return node;
        } else if (value > node.value) {
            node.right = this.deleteNode(node.right, value);
            return node;
        } else {
            if (node.left === null) {
                return node.right;
            }
            if (node.right === null) {
                return node.left;
            }
            let minNode = node.right;
            while (minNode.left !== null) {
                minNode = minNode.left;
            }
            node.value = minNode.value;
            node.right = this.deleteNode(node.right, minNode.value);
            return node;
        }
    }

    update(oldValue: T, newValue: T): boolean {
        const found = this.search(oldValue);
        if (found === null) {
            return false;
        }
        this.delete(oldValue);
        this.insert(newValue);
        return true;
    }

    getHeight(): number {
        return this.calculateHeight(this.root);
    }

    private calculateHeight(node: TreeNode<T> | null): number {
        if (node === null) {
            return 0;
        }
        const leftHeight = this.calculateHeight(node.left);
        const rightHeight = this.calculateHeight(node.right);
        return Math.max(leftHeight, rightHeight) + 1;
    }

    printTree(): string {
        const result: T[] = [];
        this.preOrder(this.root, result);
        if (result.length === 0) {
            return "пустое";
        }
        return result.join(", ");
    }

    private preOrder(node: TreeNode<T> | null, result: T[]): void {
        if (node !== null) {
            result.push(node.value);
            this.preOrder(node.left, result);
            this.preOrder(node.right, result);
        }
    }
}

const tree = new BinaryTree<number>();

function getInputValue(id: string): number {
    const element = document.getElementById(id);
    if (element instanceof HTMLInputElement) {
        return parseInt(element.value);
    }
    return NaN;
}

function setText(id: string, text: string): void {
    const element = document.getElementById(id);
    if (element) {
        element.textContent = text;
    }
}

function demoInitTree(): void {
    tree.root = null;
    tree.insert(10);
    tree.insert(5);
    tree.insert(15);
    tree.insert(3);
    tree.insert(7);
    setText('treeResult', "Дерево (pre-order): " + tree.printTree());
}

function demoPrintTree(): void {
    setText('treeResult', "Дерево (pre-order): " + tree.printTree());
}

function demoInsert(): void {
    const value = getInputValue('treeInput');
    if (!isNaN(value)) {
        tree.insert(value);
        setText('treeResult', "Дерево (pre-order): " + tree.printTree());
    }
}

function demoSearch(): void {
    const value = getInputValue('treeInput');
    if (!isNaN(value)) {
        const found = tree.search(value);
        if (found !== null) {
            setText('treeResult', `Значение ${value} найдено в дереве`);
        } else {
            setText('treeResult', `Значение ${value} не найдено в дереве`);
        }
    }
}

function demoDelete(): void {
    const value = getInputValue('treeInput');
    if (!isNaN(value)) {
        const deleted = tree.delete(value);
        if (deleted) {
            setText('treeResult', "Дерево (pre-order): " + tree.printTree());
        } else {
            setText('treeResult', `Ошибка: значение ${value} не найдено в дереве`);
        }
    }
}

function demoUpdate(): void {
    const oldValue = getInputValue('oldValue');
    const newValue = getInputValue('newValue');
    if (!isNaN(oldValue) && !isNaN(newValue)) {
        const updated = tree.update(oldValue, newValue);
        if (updated) {
            setText('treeResult', "Дерево (pre-order): " + tree.printTree());
        } else {
            setText('treeResult', `Ошибка: значение ${oldValue} не найдено в дереве`);
        }
    }
}

function demoHeight(): void {
    const height = tree.getHeight();
    setText('treeResult', "Высота дерева: " + height);
}

// Задание 6: Паттерны

// Adapter
class OldSystem {
    oldMethod(): string {
        return "Old system data";
    }
}

interface NewSystem {
    newMethod(): string;
}

class Adapter implements NewSystem {
    private oldSystem: OldSystem;

    constructor(oldSystem: OldSystem) {
        this.oldSystem = oldSystem;
    }

    newMethod(): string {
        return this.oldSystem.oldMethod();
    }
}

function demoAdapter(): void {
    const oldSystem = new OldSystem();
    const adapter = new Adapter(oldSystem);
    setText('adapterResult', adapter.newMethod());
}

// Strategy
interface Strategy {
    execute(data: number[]): number;
}

class SumStrategy implements Strategy {
    execute(data: number[]): number {
        return data.reduce((a, b) => a + b, 0);
    }
}

class MultiplyStrategy implements Strategy {
    execute(data: number[]): number {
        return data.reduce((a, b) => a * b, 1);
    }
}

class Context {
    private strategy: Strategy;

    constructor(strategy: Strategy) {
        this.strategy = strategy;
    }

    setStrategy(strategy: Strategy): void {
        this.strategy = strategy;
    }

    executeStrategy(data: number[]): number {
        return this.strategy.execute(data);
    }
}

function demoSum(): void {
    const context = new Context(new SumStrategy());
    const result = context.executeStrategy([1, 2, 3, 4]);
    setText('strategyResult', "Сумма [1, 2, 3, 4] = " + result);
}

function demoMultiply(): void {
    const context = new Context(new MultiplyStrategy());
    const result = context.executeStrategy([1, 2, 3, 4]);
    setText('strategyResult', "Произведение [1, 2, 3, 4] = " + result);
}

// Observer
interface Observer {
    update(message: string): void;
}

class ConcreteObserver implements Observer {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    update(message: string): void {
        console.log(`${this.name} received: ${message}`);
        const observerLog = document.getElementById('observerLog');
        if (observerLog) {
            observerLog.textContent += `${this.name} received: ${message}\n`;
        }
    }
}

class Subject {
    private observers: Observer[] = [];

    addObserver(observer: Observer): void {
        this.observers.push(observer);
    }

    removeObserver(observer: Observer): void {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    notify(message: string): void {
        for (const observer of this.observers) {
            observer.update(message);
        }
    }
}

let subject: Subject | null = null;
let observer1: ConcreteObserver | null = null;
let observer2: ConcreteObserver | null = null;

function demoInitObservers(): void {
    subject = new Subject();
    observer1 = new ConcreteObserver("Observer 1");
    observer2 = new ConcreteObserver("Observer 2");
    subject.addObserver(observer1);
    subject.addObserver(observer2);
    setText('observerLog', "Наблюдатели созданы\n");
}

function demoNotify(): void {
    if (subject) {
        setText('observerLog', "");
        subject.notify("Hello!");
    }
}

function demoRemoveFirst(): void {
    if (subject && observer1) {
        subject.removeObserver(observer1);
        setText('observerLog', "Observer 1 удален\n");
    }
}

function demoNotifyAgain(): void {
    if (subject) {
        setText('observerLog', "");
        subject.notify("Goodbye!");
    }
}