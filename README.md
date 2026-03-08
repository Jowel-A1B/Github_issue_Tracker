# 1- Var, Let, Const এর পার্থক্য

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
