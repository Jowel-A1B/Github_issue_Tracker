### 1- Var, Let, Const এর পার্থক্য

## Scope (কোথায় valid)

- `var` → function-scoped (block ignore করে)
- `let` → block-scoped
- `const` → block-scoped

## Reassignment (value পরিবর্তন করা যায় কি না)

- `var` → ✅ হ্যাঁ
- `let` → ✅ হ্যাঁ
- `const` → ❌ না (কিন্তু objects/arrays এর content পরিবর্তন করা যায়)

## Redeclaration (একই scope এ আবার declare করা যায় কি না)

- `var` → ✅ হ্যাঁ
- `let` → ❌ না
- `const` → ❌ না

## Hoisting (উপর তোলা behaviour)

- `var` → hoisted, value undefined থাকে
- `let` → hoisted, কিন্তু temporal dead zone আছে
- `const` → hoisted, কিন্তু temporal dead zone আছে

### 2 Spread Operator (`...`)

The spread operator (`...`) in JavaScript allows you to **expand an iterable** (like an array, object, or string) into **individual elements**. It is commonly used to **copy arrays/objects, merge them, or pass multiple values as function arguments**.

### 3 Difference between `map()`, `filter()`, and `forEach()`

- `map()` → transforms each element and **returns a new array**
- `filter()` → selects elements that meet a condition and **returns a new array**
- `forEach()` → iterates over elements and **returns nothing**

### 4 Arrow Function মূল বৈশিষ্ট্য

🔹 **মূল বৈশিষ্ট্যগুলো:**

- **সংক্ষিপ্ত লেখা যায়** – এক লাইনের কাজ হলে `{}` এবং `return` বাদ দেওয়া যায়।
- **`this` ব্যবহার করে surrounding scope নেয়** – মানে arrow function নিজের `this` তৈরি করে না, বাইরে যেখান থেকে call করা হচ্ছে সেখানে যেটা `this` আছে সেটা use করে।
- **কোনো `arguments` object নেই** – traditional function এর মতো arguments পাওয়া যায় না।

### 3 Template Literals in JavaScript

Template literals হলো ES6-এর একটি string format যা বেশি flexible এবং powerful। মূল বৈশিষ্ট্যগুলো হলো:

- **Backticks ব্যবহার** – Template literals লিখতে হয় backtick `` ` `` দিয়ে, সিঙ্গেল `'` বা ডাবল `"` এর বদলে।
- **`${}` দিয়ে variables বা expressions embed করা যায়** – string-এ variable বা expression সরাসরি include করা যায়।
- **Multiline support** – normal string-এ \n ছাড়া multiline লেখা যায়।
- **Expression evaluation সহজ** – `${}` এর মধ্যে arithmetic বা function calls লেখা যায়।
