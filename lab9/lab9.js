"use strict";
class User {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    hello() {
        console.log(`Hi! My name is ${this.name}. And I am ${this.age} years old.`);
        const element = document.getElementById('task2Result');
        if (element) {
            element.textContent = `Hi! My name is ${this.name}. And I am ${this.age} years old.`;
        }
    }
}
function demoTask2() {
    const user = new User("Alice", 25);
    user.hello();
}
class UserWithType {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    hello() {
        console.log(`Hi! My name is ${this.name}. And I am ${this.age} years old.`);
        const element = document.getElementById('task3Result');
        if (element) {
            element.textContent = `Hi! My name is ${this.name}. And I am ${this.age} years old.`;
        }
    }
}
function demoTask3() {
    const user = new UserWithType("Bob", 30);
    user.hello();
}
function distance(a, b, c, d) {
    if (typeof a === "number" && typeof b === "number" && typeof c === "number" && typeof d === "number") {
        return Math.sqrt(Math.pow((c - a), 2) + Math.pow((d - b), 2));
    }
    else if (typeof a === "object" && typeof b === "object") {
        return Math.sqrt(Math.pow((b.x - a.x), 2) + Math.pow((b.y - a.y), 2));
    }
    return 0;
}
function demoDistance1() {
    const result = distance(0, 0, 3, 4);
    const element = document.getElementById('distanceResult');
    if (element) {
        element.textContent = `distance(0, 0, 3, 4) = ${result}`;
    }
}
function demoDistance2() {
    const result = distance({ x: 0, y: 0 }, { x: 3, y: 4 });
    const element = document.getElementById('distanceResult');
    if (element) {
        element.textContent = `distance({x:0, y:0}, {x:3, y:4}) = ${result}`;
    }
}
// Задание 5: Бинарное дерево
class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}
class BinaryTree {
    constructor() {
        this.root = null;
    }
    insert(value) {
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
            }
            else {
                if (current.right === null) {
                    current.right = newNode;
                    return;
                }
                current = current.right;
            }
        }
    }
    search(value) {
        let current = this.root;
        while (current !== null) {
            if (value === current.value) {
                return current;
            }
            if (value < current.value) {
                current = current.left;
            }
            else {
                current = current.right;
            }
        }
        return null;
    }
    delete(value) {
        const found = this.search(value);
        if (found === null) {
            return false;
        }
        this.root = this.deleteNode(this.root, value);
        return true;
    }
    deleteNode(node, value) {
        if (node === null) {
            return null;
        }
        if (value < node.value) {
            node.left = this.deleteNode(node.left, value);
            return node;
        }
        else if (value > node.value) {
            node.right = this.deleteNode(node.right, value);
            return node;
        }
        else {
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
    update(oldValue, newValue) {
        const found = this.search(oldValue);
        if (found === null) {
            return false;
        }
        this.delete(oldValue);
        this.insert(newValue);
        return true;
    }
    getHeight() {
        return this.calculateHeight(this.root);
    }
    calculateHeight(node) {
        if (node === null) {
            return 0;
        }
        const leftHeight = this.calculateHeight(node.left);
        const rightHeight = this.calculateHeight(node.right);
        return Math.max(leftHeight, rightHeight) + 1;
    }
    printTree() {
        const result = [];
        this.preOrder(this.root, result);
        if (result.length === 0) {
            return "пустое";
        }
        return result.join(", ");
    }
    preOrder(node, result) {
        if (node !== null) {
            result.push(node.value);
            this.preOrder(node.left, result);
            this.preOrder(node.right, result);
        }
    }
}
const tree = new BinaryTree();
function getInputValue(id) {
    const element = document.getElementById(id);
    if (element instanceof HTMLInputElement) {
        return parseInt(element.value);
    }
    return NaN;
}
function setText(id, text) {
    const element = document.getElementById(id);
    if (element) {
        element.textContent = text;
    }
}
function demoInitTree() {
    tree.root = null;
    tree.insert(10);
    tree.insert(5);
    tree.insert(15);
    tree.insert(3);
    tree.insert(7);
    setText('treeResult', "Дерево (pre-order): " + tree.printTree());
}
function demoPrintTree() {
    setText('treeResult', "Дерево (pre-order): " + tree.printTree());
}
function demoInsert() {
    const value = getInputValue('treeInput');
    if (!isNaN(value)) {
        tree.insert(value);
        setText('treeResult', "Дерево (pre-order): " + tree.printTree());
    }
}
function demoSearch() {
    const value = getInputValue('treeInput');
    if (!isNaN(value)) {
        const found = tree.search(value);
        if (found !== null) {
            setText('treeResult', `Значение ${value} найдено в дереве`);
        }
        else {
            setText('treeResult', `Значение ${value} не найдено в дереве`);
        }
    }
}
function demoDelete() {
    const value = getInputValue('treeInput');
    if (!isNaN(value)) {
        const deleted = tree.delete(value);
        if (deleted) {
            setText('treeResult', "Дерево (pre-order): " + tree.printTree());
        }
        else {
            setText('treeResult', `Ошибка: значение ${value} не найдено в дереве`);
        }
    }
}
function demoUpdate() {
    const oldValue = getInputValue('oldValue');
    const newValue = getInputValue('newValue');
    if (!isNaN(oldValue) && !isNaN(newValue)) {
        const updated = tree.update(oldValue, newValue);
        if (updated) {
            setText('treeResult', "Дерево (pre-order): " + tree.printTree());
        }
        else {
            setText('treeResult', `Ошибка: значение ${oldValue} не найдено в дереве`);
        }
    }
}
function demoHeight() {
    const height = tree.getHeight();
    setText('treeResult', "Высота дерева: " + height);
}
// Задание 6: Паттерны
// Adapter
class OldSystem {
    oldMethod() {
        return "Old system data";
    }
}
class Adapter {
    constructor(oldSystem) {
        this.oldSystem = oldSystem;
    }
    newMethod() {
        return this.oldSystem.oldMethod();
    }
}
function demoAdapter() {
    const oldSystem = new OldSystem();
    const adapter = new Adapter(oldSystem);
    setText('adapterResult', adapter.newMethod());
}
class SumStrategy {
    execute(data) {
        return data.reduce((a, b) => a + b, 0);
    }
}
class MultiplyStrategy {
    execute(data) {
        return data.reduce((a, b) => a * b, 1);
    }
}
class Context {
    constructor(strategy) {
        this.strategy = strategy;
    }
    setStrategy(strategy) {
        this.strategy = strategy;
    }
    executeStrategy(data) {
        return this.strategy.execute(data);
    }
}
function demoSum() {
    const context = new Context(new SumStrategy());
    const result = context.executeStrategy([1, 2, 3, 4]);
    setText('strategyResult', "Сумма [1, 2, 3, 4] = " + result);
}
function demoMultiply() {
    const context = new Context(new MultiplyStrategy());
    const result = context.executeStrategy([1, 2, 3, 4]);
    setText('strategyResult', "Произведение [1, 2, 3, 4] = " + result);
}
class ConcreteObserver {
    constructor(name) {
        this.name = name;
    }
    update(message) {
        console.log(`${this.name} received: ${message}`);
        const observerLog = document.getElementById('observerLog');
        if (observerLog) {
            observerLog.textContent += `${this.name} received: ${message}\n`;
        }
    }
}
class Subject {
    constructor() {
        this.observers = [];
    }
    addObserver(observer) {
        this.observers.push(observer);
    }
    removeObserver(observer) {
        this.observers = this.observers.filter(obs => obs !== observer);
    }
    notify(message) {
        for (const observer of this.observers) {
            observer.update(message);
        }
    }
}
let subject = null;
let observer1 = null;
let observer2 = null;
function demoInitObservers() {
    subject = new Subject();
    observer1 = new ConcreteObserver("Observer 1");
    observer2 = new ConcreteObserver("Observer 2");
    subject.addObserver(observer1);
    subject.addObserver(observer2);
    setText('observerLog', "Наблюдатели созданы\n");
}
function demoNotify() {
    if (subject) {
        setText('observerLog', "");
        subject.notify("Hello!");
    }
}
function demoRemoveFirst() {
    if (subject && observer1) {
        subject.removeObserver(observer1);
        setText('observerLog', "Observer 1 удален\n");
    }
}
function demoNotifyAgain() {
    if (subject) {
        setText('observerLog', "");
        subject.notify("Goodbye!");
    }
}
